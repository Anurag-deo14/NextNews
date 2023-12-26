// context/AuthUserContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase.js';

const AuthUserContext = createContext();

const AuthUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const value = {
    user,
  };

  return <AuthUserContext.Provider value={value}>{children}</AuthUserContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthUserContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthUserProvider');
  }
  return context;
};

export { AuthUserProvider, useAuth };
