import type { Path, TransformOutput } from '.';
import pathBrowserify from 'path-browserify';
import { QWIK_BINDING_MAP } from './qwik-binding-map';

export async function getSystem() {
  const sys: InternalSystem = {} as any;
  sys.path = pathBrowserify;

  if (globalThis.IS_ESM) {
    sys.dynamicImport = (path: string) => import(path);
  }

  if (
    typeof process !== 'undefined' &&
    process.versions &&
    process.versions.node &&
    typeof global !== 'undefined'
  ) {
    // NodeJS
    sys.isNode = true;
    sys.arch = process.arch;
    sys.platform = process.platform;
  }

  if (globalThis.IS_CJS && sys.isNode) {
    // using this api object as a way to ensure bundlers
    // do not try to inline or rewrite require()
    sys.dynamicImport = (path) => require(path);
  }

  if (sys.isNode) {
    sys.fs = await sys.dynamicImport('fs');
    sys.path = await sys.dynamicImport('path');
  }

  sys.binding = await loadPlatformBinding(sys);

  return sys;
}

async function loadPlatformBinding(sys: InternalSystem) {
  if (sys.isNode) {
    // NodeJS
    const platform = (QWIK_BINDING_MAP as any)[sys.platform!];
    if (platform) {
      const triples = platform[sys.arch!];
      if (triples) {
        for (const triple of triples) {
          // NodeJS - Native Binding
          try {
            const platformBindingPath = sys.path.join('bindings', triple.platformArchABI);
            const mod = await sys.dynamicImport('./' + platformBindingPath);
            return mod;
          } catch (e) {
            console.warn(e);
          }
        }
      }
    }
  }

  if (globalThis.IS_CJS) {
    // CJS WASM
    const cjsWasmPath = sys.path.join('bindings', 'qwik.wasm.cjs');
    const mod = await sys.dynamicImport('./' + cjsWasmPath);
    return new Promise<Buffer>((resolve, reject) => {
      sys.fs.readFile(
        sys.path.join(__dirname, 'bindings', 'qwik_wasm_bg.wasm'),
        undefined,
        (err, data) => {
          if (err != null) {
            reject(err);
          } else {
            resolve(data);
          }
        }
      );
    })
      .then((data) => WebAssembly.compile(data))
      .then((module) => mod.default(module))
      .then(() => mod);
  }

  if (globalThis.IS_ESM) {
    // ESM WASM
    const mjsWasmPath = sys.path.join('bindings', 'qwik.wasm.mjs');
    const module = await sys.dynamicImport('./' + mjsWasmPath);
    await module.default();
    return module;
  }

  throw new Error(`Platform not supported`);
}

export interface InternalSystem {
  isNode?: boolean;
  arch?: string;
  platform?: string;
  dynamicImport: (path: string) => Promise<any>;
  fs: typeof import('fs');
  path: Path;
  binding: PlatformBinding;
}

export interface PlatformBinding {
  transform_fs?: (opts: any) => TransformOutput;
  transform_modules: (opts: any) => TransformOutput;
}

declare const globalThis: { IS_CJS: boolean; IS_ESM: boolean };
declare const global: { [key: string]: any };
