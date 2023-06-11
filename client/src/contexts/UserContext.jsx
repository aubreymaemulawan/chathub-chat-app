import { createContext, useState, useContext } from "react";
import { App, Credentials } from "realm-web";
import { APP_ID } from "../realms/constants";

// Creating a Realm App Instance
const app = new App(APP_ID);

// Creating a user context to manage and access all the user related functions
// across different components and pages.
export const UserContext = createContext();

export function useAuth() {
  return useContext(UserContext);
}

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  // Function for Login
  const emailPasswordLogin = async (email, password) => {
    const credentials = Credentials.emailPassword(email, password);
    const authenticatedUser = await app.logIn(credentials);
    setUser(authenticatedUser);
    return authenticatedUser;
  };

  // Function to Register
  const emailPasswordSignup = async (email, password) => {
    try {
      await app.emailPasswordAuth.registerUser(email, password);
      return emailPasswordLogin(email, password);
    } catch (error) {
      throw error;
    }
  };

  // Function to Fetch the User
  const fetchUser = async () => {
    if (!app.currentUser) return false;
    try {
      await app.currentUser.refreshCustomData();
      setUser(app.currentUser);
      return app.currentUser;
    } catch (error) {
      throw error;
    }
  };

  // Function to logout User
  const logOutUser = async () => {
    if (!app.currentUser) return false;
    try {
      await app.currentUser.logOut();
      setUser(null);
      return true;
    } catch (error) {
      throw error;
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        fetchUser,
        emailPasswordLogin,
        emailPasswordSignup,
        logOutUser,
        error,
        setError,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
