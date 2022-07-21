export interface IHashProvider {
  generateHash(payload: string): Promise<string>;
  compareHah(payload: string, hashed: string): Promise<boolean>;
}
