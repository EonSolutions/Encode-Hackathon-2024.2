import { createContext } from 'react';

type User = { walletId: string; } | null;

const UserContext = createContext<User>(null);

export default UserContext;
export type { User };