
import { useContext } from 'react';
import { AuthContext } from '../Context';

const useAuth = () => useContext(AuthContext);

export default useAuth;
