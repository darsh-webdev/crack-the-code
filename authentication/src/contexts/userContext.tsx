import { createContext, useState, type ReactNode } from "react";

interface UserContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

// Create the context<
const UserContext = createContext<UserContextType>({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

// Create a provider component
const UserProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  return (
    <UserContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
