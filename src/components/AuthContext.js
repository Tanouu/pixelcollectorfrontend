import { createContext } from 'react';

const AuthContext = createContext({
    authToken: '',
    setAuthToken: () => {},
    isLoggedIn: false,
    setIsLoggedIn: () => {},
});

export default AuthContext;