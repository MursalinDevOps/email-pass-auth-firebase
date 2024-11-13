import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../../firebase.init";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";


export default function SignUp() {
    const [successMessage, setSuccessMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showPass, setShowPass] = useState(false)

    const handleOnSubmit = (e) => {
        e.preventDefault();

        setErrorMessage('')
        setSuccessMessage(false)

        const email = e.target.email.value;
        const password = e.target.password.value;
        const name = e.target.name.value;
        const photo = e.target.photo.value;
        const terms = e.target.terms.checked;
        // console.log(email, password, name, photo, terms)



        // check this before requesting to the server
        if (password.length < 6) {
            setErrorMessage('Password should be 6 characters or longer!')
            return;
        }

        // Pass type validation
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

        if (!passwordPattern.test(password)) {
            setErrorMessage('Password should contain at least one character of Uppercase, Lowercase, Number and Special symbol')
            return;
        }
        if (!terms) {
            setErrorMessage('Please accept our terms and conditions!');
            return;
        }
        //  Send create user request to the server
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                // const user = userCredentials.user;
                console.log(userCredentials.user)
                setSuccessMessage(true)
                sendEmailVerification(auth.currentUser)
                    .then(() => {
                        console.log('Verification email sent')
                    })
                    const profile = {
                        displayName:name,
                        photoURL:photo
                    }
                    updateProfile(auth.currentUser, profile)
                    .then(()=>{
                        // console.log('user profile updated')
                    })
                    .catch((error)=>{
                        // console.log('user profile update error:',error)
                    })
            })
            .catch((error) => {
                setErrorMessage(error.message)
                setSuccessMessage(false)
            })
    }

    return (
        <div>
            <h2 className="my-10 text-3xl text-center">Sign Up / Register</h2>
            <div className="max-w-xl mx-auto card bg-base-100 shrink-0 shadow-2xl">
                <form onSubmit={handleOnSubmit} className="space-y-5 card-body">
                    <label className="input input-bordered flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70">
                            <path
                                d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                            <path
                                d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                        </svg>
                        <input type="email" name="email" placeholder="Email" required />
                    </label>

                    <label className="input input-bordered flex items-center gap-2">
                        <input type="text" name="name" placeholder="Name" required />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        <input type="text" name="photo" placeholder="Photo URL" required />
                    </label>

                    <label className="input input-bordered flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70">
                            <path
                                fillRule="evenodd"
                                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                clipRule="evenodd" />
                        </svg>
                        <input type={showPass ? 'text' : 'password'} name="password" placeholder="Create a Password" className="relative" required />
                        <button onClick={() => setShowPass(!showPass)} className="btn btn-xs absolute right-12">
                            {
                                !showPass ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>
                            }
                        </button>
                    </label>
                    <div className="flex gap-3">
                        <input
                            name="terms"
                            type="checkbox"
                            className="checkbox border-orange-400 [--chkbg:theme(colors.indigo.600)] [--chkfg:orange] checked:border-indigo-800" />
                        <p>Accept our terms & conditions</p>
                    </div>
                    <button className="btn btn-primary w-full">Register</button>

                    <div className="text-center underline"><Link to='/signIn'>Already have an Account? Sign in.</Link></div>

                </form>
                {
                    errorMessage && <p className="text-center text-red-700 mb-5">{errorMessage}</p>
                }
                {
                    successMessage && <p className="text-center text-green-700 mb-5">Congrats! <br />Your account has been registered successfully.</p>
                }
            </div>
        </div>
    )
}
