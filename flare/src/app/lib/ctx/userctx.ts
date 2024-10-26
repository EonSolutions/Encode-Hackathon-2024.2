import { createContext, useContext } from 'react';

type User = {
  walletId: string;
  login: (walletId: string) => void;
  logout: () => void;
};

const UserContext = createContext<User>({
  walletId: "",
  login: () => {},
  logout: () => {},
});

const useUser = () => useContext(UserContext);

export default UserContext;
export { useUser };
export type { User };