export type Address = {
  street: string;
  city: string;
  state: string;
  zipcode: string;
};

export type Addresses = {
  [key: string]: Address;
};

export type Args = {
  username: string;
};

export type AddArgs = {
  username: string;
  input: Address;
};