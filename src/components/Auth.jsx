import { useState } from 'react';
import { auth, googleProvider } from '../config/Firebase';
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';

const Auth = () => {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [loggedIn, setLoggedIn] = useState(false)

    const signIn = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            setLoggedIn(true)
        } catch (error) {
            alert(error);
        } finally {
            setEmail("");
            setPassword("");

        }
    };

    const signInGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            setLoggedIn(true)
        } catch (error) {
            alert(error);
        }
    };

    const logOut = async () => {
        try {
            await signOut(auth);
            setLoggedIn(false)
        } catch (error) {
            alert(error);
        }
    };

    return (
        <>
            <div className="flex justify-center">
                <input className="border border-black" placeholder="Email..." value={email} onChange={(e) => setEmail(e.target.value)} />
                <input className="border border-black" type='password' placeholder="Password..." value={password} onChange={(e) => setPassword(e.target.value)} />
                <button onClick={signIn} className="border border-black px-3 py-1 bg-gray-200">Sign In</button>
                <button onClick={signInGoogle} className="border border-black px-3 py-1 bg-blue-500">Sign With Google</button>
                <button onClick={logOut} className="border border-black px-3 py-1 bg-red-500">Log Out</button>
            </div>
            <div className='flex gap-5 items-center flex-col'>
                {loggedIn ? (
                    <>
                        <h1 className='text-3xl pt-5'>{auth.currentUser.email}</h1>
                        <div>
                            <img src={auth.currentUser.photoURL} />
                        </div>
                    </>
                ) : ('')}
            </div>
        </>
    );
};

export default Auth;
