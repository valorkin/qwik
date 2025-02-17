## API Report File for "@builder.io/qwik"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

// @alpha (undocumented)
export interface ComponentEntryStrategy {
    // (undocumented)
    type: 'component';
}

// @alpha (undocumented)
export const createOptimizer: () => Promise<Optimizer>;

// @alpha (undocumented)
export interface Diagnostic {
    // (undocumented)
    documentation_url?: string;
    // (undocumented)
    hints?: string[];
    // (undocumented)
    message: string;
    // (undocumented)
    severity: DiagnosticType;
    // (undocumented)
    show_environment: boolean;
}

// @alpha (undocumented)
export type DiagnosticType = 'error' | 'warn' | 'info';

// @alpha (undocumented)
export type EntryStrategy = SingleEntryStrategy | HookEntryStrategy | ComponentEntryStrategy | SmartEntryStrategy | ManualEntryStrategy;

// @alpha (undocumented)
export interface HookAnalysis {
    // (undocumented)
    canonicalFilename: string;
    // (undocumented)
    entry: string | null;
    // (undocumented)
    localDecl: string[];
    // (undocumented)
    localIdents: string[];
    // (undocumented)
    name: string;
    // (undocumented)
    origin: string;
}

// @alpha (undocumented)
export interface HookEntryStrategy {
    // (undocumented)
    type: 'hook';
}

// @alpha (undocumented)
export interface ManualEntryStrategy {
    // (undocumented)
    entries: string[][];
    // (undocumented)
    type: 'manual';
}

// @alpha (undocumented)
export type MinifyMode = 'minify' | 'simplify' | 'none';

// @alpha (undocumented)
export type MinifyOption = boolean | undefined | null;

// @alpha (undocumented)
export interface Optimizer {
    // (undocumented)
    path: Path;
    transformFs(opts: TransformFsOptions): Promise<TransformOutput>;
    transformFsSync(opts: TransformFsOptions): TransformOutput;
    transformModules(opts: TransformModulesOptions): Promise<TransformOutput>;
    transformModulesSync(opts: TransformModulesOptions): TransformOutput;
}

// @alpha (undocumented)
export interface OutputEntryMap {
    // (undocumented)
    mapping: {
        [canonicalName: string]: string;
    };
    // (undocumented)
    version: '1';
}

// @alpha (undocumented)
export interface Path {
    // (undocumented)
    basename(path: string, ext?: string): string;
    // (undocumented)
    readonly delimiter: string;
    // (undocumented)
    dirname(path: string): string;
    // (undocumented)
    extname(path: string): string;
    // (undocumented)
    format(pathObject: Partial<PathObject>): string;
    // (undocumented)
    isAbsolute(path: string): boolean;
    // (undocumented)
    join(...paths: string[]): string;
    // (undocumented)
    normalize(path: string): string;
    // (undocumented)
    parse(path: string): PathObject;
    // (undocumented)
    readonly posix: Path;
    // (undocumented)
    relative(from: string, to: string): string;
    // (undocumented)
    resolve(...pathSegments: string[]): string;
    // (undocumented)
    readonly sep: string;
    // (undocumented)
    readonly win32: null;
}

// @alpha (undocumented)
export interface PathObject {
    // (undocumented)
    base: string;
    // (undocumented)
    dir: string;
    // (undocumented)
    ext: string;
    // (undocumented)
    name: string;
    // (undocumented)
    root: string;
}

// @alpha (undocumented)
export interface QwikPluginOptions {
    // (undocumented)
    entryStrategy?: EntryStrategy;
    // (undocumented)
    minify?: MinifyMode;
    // (undocumented)
    symbolsPath?: string;
    // (undocumented)
    transpile?: boolean;
}

// @alpha (undocumented)
export function qwikRollup(opts?: QwikPluginOptions): any;

// @alpha (undocumented)
export interface SingleEntryStrategy {
    // (undocumented)
    type: 'single';
}

// @alpha (undocumented)
export interface SmartEntryStrategy {
    // (undocumented)
    type: 'smart';
}

// @alpha (undocumented)
export type SourceMapsOption = 'external' | 'inline' | undefined | null;

// Warning: (ae-forgotten-export) The symbol "TransformOptions" needs to be exported by the entry point index.d.ts
//
// @alpha (undocumented)
export interface TransformFsOptions extends TransformOptions {
    // (undocumented)
    rootDir: string;
}

// @alpha (undocumented)
export interface TransformModule {
    // (undocumented)
    code: string;
    // (undocumented)
    isEntry: boolean;
    // (undocumented)
    map: string | null;
    // (undocumented)
    path: string;
}

// @alpha (undocumented)
export interface TransformModuleInput {
    // (undocumented)
    code: string;
    // (undocumented)
    path: string;
}

// @alpha (undocumented)
export interface TransformModulesOptions extends TransformOptions {
    // (undocumented)
    input: TransformModuleInput[];
    // (undocumented)
    rootDir: string;
}

// @alpha (undocumented)
export interface TransformOutput {
    // (undocumented)
    diagnostics: Diagnostic[];
    // (undocumented)
    hooks: HookAnalysis[];
    // (undocumented)
    isJsx: boolean;
    // (undocumented)
    isTypeScript: boolean;
    // (undocumented)
    modules: TransformModule[];
}

// @alpha (undocumented)
export type TranspileOption = boolean | undefined | null;

// @alpha (undocumented)
export const versions: {
    qwik: any;
};

// (No @packageDocumentation comment for this package)

```
