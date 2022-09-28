import { useMemo, useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import image from '../assets/default-avatar.webp'


const UserInformation = () => {

    const auth = getAuth();

    const [activeUser, setActiveUser] = useState({
        displayName: '',
        email: '',
        photoURL: '',
        emailVerified: false,
        uid: '',
    });
    const [updateMode, setUpdateMode] = useState(false);

    const toggleUpdateMode = () => {
        setUpdateMode(!updateMode);
    }

    useMemo(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const displayName = user.displayName || '';
                const email = user.email || '';
                const photoURL = user.photoURL || '';
                const emailVerified = user.emailVerified || false;
                const uid = user.uid || '';

                setActiveUser({
                    displayName,
                    email,
                    photoURL,
                    emailVerified,
                    uid,
                })
            } else {
                console.log('no user found')
            }
        });
    }, [auth])

    return (
        <div className="flex flex-col flex-wrap grow p-3 bg-cadet text-white" >
            {updateMode ? (
                <form>
                    <label>
                        Email
                        <input type="text" placeholder={activeUser.email} />
                    </label>
                </form>
            ) : (
                <>Hello {activeUser.displayName || ''}
                    <img src={activeUser.photoURL || image} width="100px" height="100px" alt="profile avatar" />
                    <span> Email: <strong>{activeUser.email || '-'}</strong> </span>
                </>
            )}
            <button className="border p-2" type="button" onClick={toggleUpdateMode}>{!updateMode ? (<>Edit</>) : (<>Save</>)}</button>
        </div >)
}

export default UserInformation;
