import { createContext } from "react";

const UserLoginContext = createContext({
  loggedIn: false,
  setLoggedIn: () => {},
});

export default UserLoginContext;
