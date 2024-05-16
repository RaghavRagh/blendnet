import { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedExpiryTime = localStorage.getItem('expiryTime');

    if (storedToken && storedExpiryTime) {
      const expiryTime = parseInt(storedExpiryTime, 10);
      if (new Date().getTime() < expiryTime) {
        console.log("new Date() ",new Date().getTime());
        console.log(expiryTime);
        setToken(storedToken);
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('expiryTime');
      }
    }
  }, []);

  const logIn = (newToken, expiryTime) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('expiryTime', expiryTime);
    setToken(newToken);
    setIsAuthenticated(true);
  };

  const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expiryTime');
    setToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
