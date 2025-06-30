import React, { useState } from 'react'
import assets from '../assets/assets'

const LogIn = () => {
  const [currentState,setCurrentState] = useState('Sign Up');
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);
  const onSubmitHandler = (event) => {
    event.preventDefault();
    if(currentState === 'Sign Up' && !isDataSubmitted){
      setIsDataSubmitted(true)
      return;
    }
  }

  return (
    <div
      className=" min-h-screen bg-cover bg-center flex items-center
      justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl"
    >
      {/* ------ left -------- */}
      <img
        src={assets.logo_big}
        alt="logo"
        className="
      w-[ min(30vh,250px)]  sm: size-56 "
      />

      {/* ------ right -------- */}
      <form onSubmit={onSubmitHandler}
        className=" border-2 bg-white/8 text-white border-gray-500
          flex p-6 flex-col rounded-lg gap-6 shadow-lg"
      >
        <h2 className=" font-medium text-2xl  flex justify-between items-center">
          {currentState}
          {isDataSubmitted && (
            <img onClick={()=> setIsDataSubmitted(false)}
              src={assets.arrow_icon}
              alt="arrow"
              className="w-5 cursor-pointer"
            />
          )}
        </h2>
        {currentState === "Sign Up" && !isDataSubmitted && (
          <input
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
            type="text"
            className="p-2 border border-gray-500 rounded-md
            focus:outline-none"
            placeholder="Full Name"
            required
          />
        )}
        {!isDataSubmitted && (
          <>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email Address"
              required
              className="p-2 border border-gray-500 rounded-md focus:outline-none 
               focus:ring-2 focus:ring-indigo-500"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
              required
              className="p-2 border border-gray-500 rounded-md focus:outline-none 
               focus:ring-2 focus:ring-indigo-500"
            />
          </>
        )}
        {currentState === "Sign Up" && isDataSubmitted && (
          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            rows={4}
            className="p-2 border border-gray-500 rounded-md
               focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Provide a short bio..."
            required
          ></textarea>
        )}
        <button
          type="submit"
          className=" bg-gradient-to-r from-purple-400 to-violet-600 text-white
                  border-none text-sm font-light py-3 rounded-md cursor-pointer"
        >
          {currentState === "Sign Up" ? "Create Account" : "Login Now"}
        </button>
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <input type="checkbox" />
          <p>Agree to the terms of use & privacy policy.</p>
        </div>

        <div className="flex flex-col gap-2">
          {currentState === "Sign Up" ? (
            <p className="text-sm text-gray-300">
              Already have an account?{" "}
              <span
                className="font-medium text-violet-500 cursor-pointer"
                onClick={() => {
                  setCurrentState("Login");
                  setIsDataSubmitted(false);
                }}
              >
                Login here
              </span>
            </p>
          ) : (
            <p className="text-sm text-gray-300">
              Create an account
              <span
                className="font-medium text-violet-500 cursor-pointer"
                onClick={() => {
                  setCurrentState("Sign Up");
                }}
              >
                Click here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
}

export default LogIn
