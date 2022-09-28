import { useState, useEffect } from 'react';
import Header from './templates/Header';
import Footer from './templates/Footer';
import Content from './templates/Content';
import { Triangle } from 'react-loader-spinner';

import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const App = () => {

  const [localUser, setLocalUser] = useState({});
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLocalUser(user)
        setLoading(false)
      } else {
        setLocalUser({})
        setLoading(false)
      }
    });
  }, [auth])


  const signOutWrapper = () => {
    signOut(auth).then(() => {
      console.log('Sign-out successful.')
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
      console.log('Sign-out unsuccessful! Try again.')
      console.log(error)
    });
  }

  return (
    <div className="flex flex-col min-h-screen max-h-screen font-roboto">
      <Header user={localUser} signOut={signOutWrapper} />
      {loading ? (
        <div className="flex flex-col flex-wrap grow p-3 bg-cadet text-white text-center">
          <Triangle />
        </div>
      ) : (
        <Content user={localUser} />
      )}
      <Footer />
    </div>
  );
}

export default App;
