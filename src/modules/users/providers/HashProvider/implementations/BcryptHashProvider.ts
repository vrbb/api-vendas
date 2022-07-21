import { IHashProvider } from './../models/IHashProvider';
import { hash, compare } from 'bcryptjs';

export default class BcryptHashProvider implements IHashProvider {
  generateHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }
  compareHah(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}
