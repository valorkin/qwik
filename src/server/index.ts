export type {
  CreateRenderToStringOptions,
  DocumentOptions,
  GlobalOptions,
  QwikDocument,
  QwikGlobal,
  RenderToDocumentOptions,
  RenderToStringOptions,
  RenderToStringResult,
} from './types';
export { createDocument, createGlobal, renderToDocument, renderToString } from './document';
export { createServerRenderer } from './create-server-renderer';
export { createTimer } from './utils';
export { getImports } from './prefetch';
export { getQwikLoaderScript, getQwikPrefetchScript } from './scripts';
export { QwikLoader, QwikPrefetch } from './components';
export { serializeDocument } from './serialize';
export { setServerPlatform } from './platform';

/**
 * @alpha
 */
export const versions = {
  qwik: (globalThis as any).QWIK_VERSION,
  domino: (globalThis as any).DOMINO_VERSION,
};
