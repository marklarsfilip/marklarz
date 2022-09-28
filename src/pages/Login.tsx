import { useState } from 'react';

import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'
import ForgotPasswordForm from '../components/ForgotPasswordForm'

const Login = () => {

    const [registerActivated, activateRegister] = useState(false);
    const [passwordReset, resetPassword] = useState(false);

    return (
        <div className="flex flex-col flex-wrap grow p-3 bg-cadet text-white" >
            {registerActivated && !passwordReset && <RegisterForm activateRegister={activateRegister} />}
            {!registerActivated && !passwordReset && <LoginForm activateRegister={activateRegister} resetPassword={resetPassword} />}
            {passwordReset && <ForgotPasswordForm resetPassword={resetPassword} />}
        </div >)
}

export default Login;
