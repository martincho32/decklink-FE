import { useContext } from 'react';
import SignUpFormContext from '../context/SingUpFormContext';

const useSignUpFormContext = () => {
    return useContext(SignUpFormContext)
}

export default useSignUpFormContext;