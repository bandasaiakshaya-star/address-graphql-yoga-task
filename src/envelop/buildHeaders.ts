import type { Plugin } from '@envelop/core';
import { v4 as uuid } from 'uuid';
import { GraphQLError } from 'graphql';
import { ContextType } from '../types';

export const buildHeaders = (): Plugin<ContextType> => ({
  onContextBuilding({ context, extendContext }) {
    const requestId = uuid();
    const client = (context as any)?.request?.headers?.get('client') || '';
    if (!client) throw new GraphQLError('Missing required header "client"');
    extendContext({ requestId: requestId });
  },
});
