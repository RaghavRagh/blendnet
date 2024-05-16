import { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedExpiryTime = localStorage.getItem('expiryTime');

    if (storedToken && storedExpiryTime) {
      // const expiryTime = parseInt(storedExpiryTime, 10);
      const currentTime = Date.now() /1000;
      if (parseInt(storedExpiryTime) > currentTime) {
        setIsAuthenticated(true);
        setToken(storedToken);
      } else {
        // Token expired
        localStorage.removeItem('token');
        localStorage.removeItem('expiryTime');
      }
      // if (new Date().getTime() < expiryTime) {
      //   setToken(storedToken);
      //   setIsAuthenticated(true);
      // } else {
      //   localStorage.removeItem('token');
      //   localStorage.removeItem('expiryTime');
      // }
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
