import type { User } from '@prisma/client';
import { md5 } from 'hash-wasm';

export const hashPassword = async (password: string) => {
  const passwordHash = await md5(password);
  return passwordHash;
};

export const removePassword = (user: User) => {
  const { passwordHash, ...rest } = user;
  return rest;
};
