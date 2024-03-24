import { createContext } from 'react';

type userData = {
    code?: string;
    name?: string;
    email?: string;
}

const UserContext = createContext<{
    userData: userData;
    setUserData: (userData: userData) => void;
}>({ userData: {}, setUserData: () => { } });

export default UserContext;