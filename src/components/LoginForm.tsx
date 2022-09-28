import React from 'react';
import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

interface LoginProps {
    activateRegister: React.Dispatch<React.SetStateAction<boolean>>
    resetPassword: React.Dispatch<React.SetStateAction<boolean>>
}



const LoginForm = ({ activateRegister, resetPassword }: LoginProps) => {

    const auth = getAuth();
    const [loginError, setLoginError] = useState({ code: '', message: '' })

    const handleSubmit = (event: React.FormEvent<HTMLInputElement>) => {

        const target = event.target as typeof event.target & {
            email: { value: string };
            password: { value: string };
        };

        // Prevent page reload
        event.preventDefault();

        signInWithEmailAndPassword(auth, target.email.value, target.password.value)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(`User: (${user.uid}) has been signed in!`)
            })
            .catch((error) => {
                console.log(JSON.stringify(error))
                setLoginError(error)
            });

    };

    return (
        <>
            <div className="form w-full max-w-[800px] mt-8 mb-8 m-auto" onSubmit={handleSubmit}>
                <form>
                    <div className="flex flex-col input-container mb-8">
                        <label className="text-white w-full">Email </label>
                        <input className="text-black w-full p-4 bg-lavender-blush" type="text" name="email" required />
                    </div>
                    <div className="flex flex-col input-container mb-8">
                        <label className="text-white w-full">Password </label>
                        <input className="text-black w-full p-4 bg-lavender-blush" type="password" name="password" required />
                    </div>
                    {loginError.code &&
                        (
                            <span className="block w-fit pr-8 pl-8 pt-2 pb-2 mb-8 mt-2 bg-orange-peel text-black">
                                {loginError.code}
                            </span>
                        )
                    }
                    <button type="submit" className="block bg-june-bud pr-8 pl-8 pt-4 pb-4 text-black uppercase">Log in</button>
                </form>
                <button type="button" className="mt-3 underline w-fit" onClick={() => activateRegister(true)}>Sign up</button>
                <button type="button" className="ml-6 mt-3 underline w-fit" onClick={() => resetPassword(true)}>Forgot password?</button>
            </div>
        </>
    );
}

export default LoginForm;
