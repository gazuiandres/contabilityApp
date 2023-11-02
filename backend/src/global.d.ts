export interface UserToken {
  sub: string;
  roles: string[];
}

export interface IEncryptManager {
  encrypt(data: string | number): string;
  decrypt(data: string, type: string): string | number;
}
