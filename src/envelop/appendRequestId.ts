import type { Plugin } from '@envelop/core';
import type { ExecutionResult } from 'graphql';
import { ContextType } from '../types';

/**
 * Append requestId into GraphQL response: extensions.metadata.requestId
 * Works across Envelop versions by mutating the result instead of calling
 * setResultAndStopExecution (which may be undefined on some versions).
 */
export const appendRequestId = (): Plugin<ContextType> => ({
  onExecute() {
    return {
      onExecuteDone({ result, args }) {
        // Context is on args.contextValue in Envelop
        const ctx = (args as any)?.contextValue as ContextType | undefined;
        if (!ctx?.requestId) return;

        // Skip async-iterable responses (subscriptions/streams)
        const isAsyncIterable =
          result != null &&
          typeof (result as any)[Symbol.asyncIterator] === 'function';
        if (isAsyncIterable) return;

        // Mutate the result in place to add extensions.metadata.requestId
        const r = result as ExecutionResult & { extensions?: Record<string, any> };
        const currentExtensions = r.extensions ?? {};
        const currentMetadata =
          (currentExtensions as any).metadata ?? {};

        r.extensions = {
          ...currentExtensions,
          metadata: {
            ...currentMetadata,
            requestId: ctx.requestId,
          },
        };
      },
    };
  },
});
