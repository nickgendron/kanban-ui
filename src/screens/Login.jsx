import { useSelector } from "react-redux";
import React, { useState } from "react";
import { KanbanApi } from "../api/ApiHandler";
import { kanbanApi } from "../api/ApiInstance";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthenticated } from "../state/UserState/userStateSlice";
import axios from "axios";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleLoginAction(e) {
    e.preventDefault();

    console.log(email);
    console.log(password);
    const payload = {
      email: email,
      password: password,
    };
    console.log(payload);
    KanbanApi.login(payload)
      .then((res) => {
        console.log(res);

        
        dispatch(setAuthenticated(true));
        navigate("/");
      })
      .catch((err) => console.log(err));
    // axios
    //   .post("http://localhost:5093/api/user/login", payload)
    //   .then((response) => {
    //     // Handle the successful response
    //     console.log("Response:", response.data);
    //   })
    //   .catch((error) => {
    //     // Handle errors
    //     console.error("Error:", error);
    //   });
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }
  const count = useSelector((state) => state.counter.value);
  // 

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 dark:bg-gray-900">
      <a
        href="#"
        className="flex items-center mb-6 text-2xl font-semibold text-gray-900 "
      >
        <img
          className="w-8 h-8 mr-2"
          src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
          alt="logo"
        />
        <h1 className="text-black dark:text-white">Kanban Board</h1>
      </a>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 bg-whitemd:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
            Sign in
          </h1>
          <form
            className="space-y-4 md:space-y-6"
            action="#"
            onSubmit={handleLoginAction}
          >
            <div>
              {/* <label className="block mb-2 text-sm font-medium text-gray-900 ">
                Your email
              </label> */}
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="email"
                value={email}
                required
                onChange={handleEmailChange}
              ></input>
            </div>
            <div>
              {/* <label className="block mb-2 text-sm font-medium text-gray-900 ">
                Password
              </label> */}
              <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
                value={password}
                onChange={handlePasswordChange}
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            </div>
            <div className="flex">
              <a
                href="#"
                className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500 text-center"
              >
                Forgot password?
              </a>
            </div>
            <button type="submit" className="w-full bg-red-400 h-10 rounded-lg text-black">
              Sign in
            </button>
            <p className="text-sm font-light">
              Don’t have an account yet?{" "}
              <button
                // href="/auth/signup"
                onClick={() => {
                  navigate("/signup");
                }}
                className="font-medium text-primary-600 text-blue-500 hover:underline dark:text-primary-500"
              >
                Sign up
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
