import { atomWithStorage } from 'jotai/utils';

export type User = {
  id: string;
  username: string;
};

export const userAtom = atomWithStorage<User | null>('user', null);
