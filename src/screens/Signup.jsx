import React, { useState } from "react";
import PasswordChecklist from "react-password-checklist";
import { useNavigate } from "react-router-dom";
import { KanbanApi } from "../api/ApiHandler";
const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [renderPasswordChecklist, setRenderPasswordChecklist] = useState(false);
  const [isPasswordValid, setPasswordChecklist] = useState(false);

  const navigate = useNavigate();

  function PasswordChecker() {
    return (
      <div className="style.animate">
        <PasswordChecklist
          rules={["minLength", "number", "capital", "match"]}
          minLength={5}
          iconSize={20}
          value={password || ""}
          valueAgain={passwordCheck || ""}
          messages={{
            minLength: "password must be at least 8 characters.",
            specialChar: "password must contain 1 special character.",
            number: "password must contain at least one number.",
            capital: "password must contain at least one capital letter.",
            match: "passwords must match.",
          }}
          onChange={(isValid) => setPasswordChecklist(isValid)}
        />
      </div>
    );
  }

  function handleFirstNameChange(e) {
    setFirstName(e.target.value);
  }

  function handleLastNameChange(e) {
    setLastName(e.target.value);
  }

  function handleEmailChange(e) {
    const value = e.target.value;
    //validateEmail(value);
    setEmail(e.target.value);
    console.log(email);
  }

  function validateEmail(email) {
    var x = email;
    var atpos = x.indexOf("@");
    var dotpos = x.lastIndexOf(".");
    if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= x.length) {
      alert("Not a valid e-mail address");
      return false;
    }
  }

  function handlePasswordChange(e) {
    e.persist();
    const value = e.target.value;
    setPassword(value);
    console.log(value);
    if (value.length > 0) {
      setRenderPasswordChecklist(true);
    }
  }

  function handlePasswordCheckChange(e) {
    setPasswordCheck(e.target.value);
  }

  function handleSignupAction(e) {
    e.preventDefault();

    if (isPasswordValid) {
      console.log(firstName);
      console.log(lastName);
      console.log(email);
      console.log(password);

      const payload = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      };
      KanbanApi.signup(payload)
        .then((res) => {
          console.log(res);
          // sessionStorage.setItem("accessToken", res.accessToken);

          navigate("/")
        })
        .catch((err) => console.log(err));
      //router.push("/");
    } else {
      console.log("Password does not meet requirements");
    }
  }

  return (
    <>
      <section className="dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 min-h-screen">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img
              className="w-8 h-8 mr-2"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
              alt="logo"
            />
            <h1>Kanban Board</h1>
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                Sign up
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                id="signup-form"
                action="#"
                onSubmit={handleSignupAction}
              >
                <div className="grid grid-rows-1 grid-flow-col gap-1">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" />
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="First Name"
                      value={firstName}
                      onChange={handleFirstNameChange}
                      required
                    ></input>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" />
                    <input
                      type="text"
                      name="last-name"
                      id="last-name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={handleLastNameChange}
                      required
                    ></input>
                  </div>
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                </div>

                <div>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="password"
                    value={password}
                    onInput={handlePasswordChange}
                    required
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="password"
                    name="confirm-password"
                    id="confirm-password"
                    placeholder="confirm password"
                    value={passwordCheck}
                    onInput={handlePasswordCheckChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-400 h-10 rounded-lg"
                >
                  Sign up
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <button
                    className="font-medium text-primary-600 text-blue-500 hover:underline dark:text-primary-500"
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    Sign in
                  </button>
                </p>
                {renderPasswordChecklist ? PasswordChecker() : null}
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
