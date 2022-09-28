// @ts-ignore
import validator from "validator";

interface ValidationProps {
    email: string;
    password: string;
    passwords: string[];
    setEmailError: React.Dispatch<React.SetStateAction<string>>
    setPasswordError: React.Dispatch<React.SetStateAction<string>>
    setMatchingError: React.Dispatch<React.SetStateAction<string>>
}

const validateEmail = ({ email, setEmailError }: ValidationProps) => {
    // Should validate that input is indeed email and accepted length etc.
    if (validator.isEmail(email)) {
        console.log('✅ email is valid');
    } else {
        setEmailError('Please enter valid email')
    }
}
const validatePassword = ({ password, setPasswordError }: ValidationProps) => {
    // Should validate that new password is accepted length and contains all required chars.
    let hasUpperCase = false;
    let hasLowerCase = false;
    let hasDigit = false;
    if (password && password.length > 4) {
        for (const char of password) {
            if (char.toUpperCase() === char &&
                char !== char.toLowerCase()) {
                console.log('✅ letter is uppercase');
                hasUpperCase = true;
            }
            if (char.toUpperCase() !== char &&
                char === char.toLowerCase()) {
                console.log('✅ letter is lowercase');
                hasLowerCase = true;
            }
            if (/[0-9]/.test(char)) {
                console.log('✅ char is digit');
                hasDigit = true;
            }
        }
    }
    hasUpperCase && hasLowerCase && hasDigit ? console.log('✅ password is valid') : setPasswordError('Your password must contain upper case, lower case and numeral characters.')
}
const validateMatchingPasswords = ({ passwords, setMatchingError }: ValidationProps) => {
    // Should validate that new passwords are matching.
    if (passwords[0] !== passwords[1]) {
        setMatchingError('Passwords are not identical')
    } else {
        console.log('✅ passwords are matching');
    }
}

export { validateEmail, validatePassword, validateMatchingPasswords };