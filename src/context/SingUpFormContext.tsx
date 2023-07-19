import { createContext, useState, useEffect } from 'react';
import SignUp from "../models/signup"

const SignUpFormContext = createContext({})

export const SignUpFormProvider: React.FC = (props) => {
    const pageTitle = {
        0: "Create Account 1",
        1: "Create Account 2",
    }

    const [page, setPage] = useState(0)

    const [signUpFormData, setSignUpFormData] = useState<SignUp>(
        {
            email: "",
            password: "",
            confirmPassword: "",
            companyName: "",
            companyWebUrl: "",
            companyLinkedInUrl: ""
        }
    )

    const {
        companyName,
        companyWebUrl,
        companyLinkedInUrl,
        ...requiredInputs
    } = signUpFormData

    const canSubmit = [...Object.values(requiredInputs)].every(Boolean) && page === Object.keys(title).length - 1

    return (
        <SignUpFormContext.Provider value={{pageTitle, page, setPage, signUpFormData, setSignUpFormData, canSubmit}}>
            { props.children }
        </SignUpFormContext.Provider>
    )
}

export default SignUpFormContext;