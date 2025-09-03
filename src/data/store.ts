import { promises as fs } from "fs";
import path from 'path';
import { Address, Addresses } from "../schema/address/types";
const DB_PATH = path.join(__dirname, '../../data/addresses.json');
export const readAddresses = async (): Promise<Addresses> => JSON.parse(await fs.readFile(DB_PATH, 'utf-8'));
export const insertAddress = async (username: string, address: Address) => {
    const addresses = await readAddresses();
    if (addresses[username]) throw new Error(`Address already exists for username: ${username}`);
    addresses[username] = address;
    await fs.writeFile(DB_PATH, JSON.stringify(addresses, null, 2), 'utf-8');
    return address;
};