import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Restore session on refresh
  useEffect(() => {

    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {

      try {

        const parsedUser = JSON.parse(storedUser);

        // Ensure consistent schema
        const normalizedUser = {
          id: parsedUser.id || parsedUser._id || null,
          name: parsedUser.name || "User",
          email: parsedUser.email || "",
          role: parsedUser.role || "student",
          profileImage: parsedUser.profileImage || "",
        };

        setUser(normalizedUser);
        setToken(storedToken);

      } catch {
        localStorage.clear();
      }
    }

  }, []);




  // LOGIN
  const login = (userData, tokenValue) => {

    const normalizedUser = {
      id: userData.id || userData._id,
      name: userData.name,
      email: userData.email,
      role: userData.role,
      profileImage: userData.profileImage || "",
    };

    setUser(normalizedUser);
    setToken(tokenValue);

    localStorage.setItem("user", JSON.stringify(normalizedUser));
    localStorage.setItem("token", tokenValue);
  };




  // UPDATE USER (CRITICAL FIX)
  const updateUser = (partialUser) => {

    setUser((prevUser) => {

      if (!prevUser) return prevUser;

      const updatedUser = {

        id: prevUser.id,
        email: prevUser.email,
        role: prevUser.role,

        // overwrite allowed fields
        name: partialUser.name ?? prevUser.name,
        profileImage: partialUser.profileImage ?? prevUser.profileImage,

      };

      // update localStorage
      localStorage.setItem("user", JSON.stringify(updatedUser));

      return updatedUser;
    });

  };




  // LOGOUT
  const logout = () => {

    setUser(null);
    setToken(null);

    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };




  return (

    <AuthContext.Provider
      value={{
        user,
        token,
        role: user?.role,
        isAuthenticated: !!user,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>

  );

};

export const useAuth = () => useContext(AuthContext);