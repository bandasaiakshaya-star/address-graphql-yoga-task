import { getAddress, addAddress } from "./address/address";
import { AddArgs, Address, Args } from "./address/types";

export const resolvers = {
  Query: {
    address: (_: any, args: Args, context: any): Promise<Address> => getAddress(_, args, context)
  },

  Mutation: {
    addAddress: (_: any, args: AddArgs, context: any): Promise<Address> => addAddress(_, args, context)
  }
};
