import * as addressTable from '../../../data/addresses.json';
import { readAddresses, insertAddress } from '../../data/store';
import { Addresses, Address, Args, AddArgs } from './types';
import { GraphQLError } from 'graphql';

export const getAddress = async (_: any, args: Args, context: any): Promise<Address> => {
  context.logger.info('getAddress', { step: 'enter' });
  const addresses: Addresses = await readAddresses();
  const address = addresses[args.username];
  if (address) {
    context.logger.info('getAddress', 'Returning address');
    return address;
  }
  context.logger.error('getAddress', 'No address found');
  throw new GraphQLError('No address found in getAddress resolver');
};

export const addAddress = async (_: any, args: AddArgs, context: any): Promise<Address> => {
  try {
    return await insertAddress(args.username, args.input);
  } catch(e : any) {
    throw new GraphQLError(e?.message || 'Unable to create address');
  }
};
