import React, { useRef, useState } from "react";
import { auth } from "../Resources/firebase";
import "./styles/SignupScreen.css";

function SignupScreen() {
	const emailRef = useRef(null);
	const passwordRef = useRef(null);
	const [showName, setShowName] = useState(false);

	const showSignUp = () => {
		setShowName(true);
	};
	const register = (e) => {
		e.preventDefault();
		auth
			.createUserWithEmailAndPassword(
				emailRef.current.value,
				passwordRef.current.value
			)
			.then((authUser) => {
				console.log(authUser);
			})
			.catch((error) => {
				alert(error.message);
			});
	};

	const signIn = (e) => {
		e.preventDefault();
		auth
			.signInWithEmailAndPassword(
				emailRef.current.value,
				passwordRef.current.value
			)
			.then((authUser) => {
				console.log(authUser);
			})
			.catch((error) => {
				alert(error.message);
			});
	};
	return (
		<div className="signupScreen">
			<form>
				{showName === true ? <h1>Sign Up</h1> : <h1>Sign In</h1>}
				{showName === true ? <input type="name" placeholder="Full Name" /> : ""}
				<input ref={emailRef} placeholder="Email" type="email" />
				<input ref={passwordRef} placeholder="Password" type="password" />
				{showName === true ? (
					<button type="submit" onClick={register}>
						Sign Up
					</button>
				) : (
					<button type="submit" onClick={signIn}>
						Sign In
					</button>
				)}
				{showName === true ? (
					<h4>
						<span className="signupScreen_gray">Already have a Account ?</span>
						<span
							className="signupScreen_link"
							onClick={(e) => setShowName(false)}>
							{" "}
							Sign In now.
						</span>
					</h4>
				) : (
					<h4>
						<span className="signupScreen_gray">New to Netflix?</span>
						<span className="signupScreen_link" onClick={showSignUp}>
							{" "}
							Sign up now.
						</span>
					</h4>
				)}
			</form>
		</div>
	);
}

export default SignupScreen;
