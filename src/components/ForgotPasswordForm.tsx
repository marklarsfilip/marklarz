import { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

import { validateEmail } from '../api/validateFormInput'

interface ForgotPasswordProps {
    resetPassword: React.Dispatch<React.SetStateAction<boolean>>
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

const ForgotPasswordForm = ({ resetPassword }: ForgotPasswordProps) => {

    const [resetEmailSent, setResetEmailSent] = useState(false);
    const [emailMessage, setEmailMessage] = useState('');
    const [emailError, setEmailError] = useState('')
    const [forgotPassError, setForgotPassError] = useState({ code: '', message: '' })

    const auth = getAuth();
    const initPasswordReset = (event: React.FormEvent<HTMLInputElement>) => {

        event.preventDefault();

        const target = event.target as typeof event.target & {
            email: { value: string };
        };

        validateEmail({ email: target.email.value, setEmailError } as ValidationProps)


        if (emailError !== '') {
            sendPasswordResetEmail(auth, target.email.value)
                .then(() => {
                    setEmailMessage('Password reset email sent!')
                    console.log('Password reset email sent!');
                    setResetEmailSent(true)
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setEmailMessage(`Password reset could not be sent: ${errorCode} - ${errorMessage}`)
                    setForgotPassError(error)
                });
        }
    }

    return (
        <>
            <div className="form w-full max-w-[800px] mt-8 mb-8 m-auto" onSubmit={initPasswordReset}>
                {resetEmailSent ? (
                    <div>{emailMessage}</div>
                ) : (<form>
                    <div className="flex flex-col input-container mb-8">
                        <label className="text-white w-full">Email </label>
                        <input className="text-black w-full p-4" type="email" name="email" required />
                        {emailError && (ErrorMessage(emailError))}
                    </div>
                    {forgotPassError.code &&
                        (
                            <span className="block w-fit pr-8 pl-8 pt-2 pb-2 mb-8 mt-2 bg-orange-peel text-black">{forgotPassError.code}</span>
                        )
                    }
                    <button type="submit" className="block bg-june-bud pr-8 pl-8 pt-4 pb-4 text-black uppercase">Reset password</button>
                </form >
                )}
                <button type="button" className="mt-3 underline w-fit" onClick={() => resetPassword(false)}>Back to Log in</button>
            </div>
        </>
    );
}

export default ForgotPasswordForm;
