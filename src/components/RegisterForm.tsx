import React from 'react';
import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { validateEmail, validatePassword, validateMatchingPasswords } from '../api/validateFormInput'

interface RegisterProps {
    activateRegister: React.Dispatch<React.SetStateAction<boolean>>
}

interface ValidationProps {
    email: string;
    password: string;
    passwords: string[];
    setEmailError: React.Dispatch<React.SetStateAction<string>>
    setPasswordError: React.Dispatch<React.SetStateAction<string>>
    setMatchingError: React.Dispatch<React.SetStateAction<string>>
}

const ErrorMessage = (message: string) => {
    return <p className="italic text-orange-peel">{message}</p>
}


const RegisterForm = ({ activateRegister }: RegisterProps) => {

    const auth = getAuth();
    const [registerError, setRegisterError] = useState({ code: '', message: '' })
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [matchingError, setMatchingError] = useState('')

    const handleSubmit = (event: React.FormEvent<HTMLInputElement>) => {

        // Prevent page reload
        event.preventDefault();

        const target = event.target as typeof event.target & {
            email: { value: string };
            password: { value: string };
            passConfirm: { value: string };
        };

        // VALIDATE 

        validateEmail({ email: target.email.value, setEmailError } as ValidationProps)
        validatePassword({ password: target.password.value, setPasswordError } as ValidationProps)
        validateMatchingPasswords({ passwords: [target.password.value, target.passConfirm.value], setMatchingError } as ValidationProps)

        // REGISTER IN FIREBASE

        if (emailError !== '' && passwordError !== '' && matchingError !== '') {
            createUserWithEmailAndPassword(auth, target.email.value, target.password.value)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log(`User: (${user.uid}) has been registered!`)
                    // ...
                })
                .catch((error) => {
                    setRegisterError(error);
                    // ..
                });
        }

    };

    return (
        <div className="form w-full max-w-[800px] mt-8 mb-8 m-auto" onSubmit={handleSubmit}>
            <form>
                <div className="flex flex-col input-container mb-8">
                    <label className="text-white w-full">Email </label>
                    <input className="text-black w-full p-4" type="email" name="email" required />
                    {emailError && (ErrorMessage(emailError))}
                </div>
                <div className="flex flex-col input-container mb-8">
                    <label className="text-white w-full">Password </label>
                    <p className="text-sm italic">Must contain: <strong>upper case, lower case and number</strong>.</p>
                    <input className="text-black w-full p-4" type="password" name="password" required />
                    {passwordError && (ErrorMessage(passwordError))}
                </div>
                <div className="flex flex-col input-container mb-8">
                    <label className="text-white w-full">Confirm Password </label>
                    <input className="text-black w-full p-4" type="password" name="passConfirm" required />
                    {matchingError && (ErrorMessage(matchingError))}
                </div>
                <button type="submit" className="block bg-june-bud pr-8 pl-8 pt-4 pb-4 text-black uppercase">Register</button>
            </form>

            {registerError.code &&
                (
                    <span className="block w-fit pr-8 pl-8 pt-2 pb-2 mb-8 mt-2 bg-orange-peel text-black">{registerError.code}</span>
                )
            }

            <button type="button" className="mt-3 underline w-fit" onClick={() => activateRegister(false)}>Log in</button>
        </div>
    );
}

export default RegisterForm;
