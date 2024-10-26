import { Form, useNavigation } from "@remix-run/react";
import React, { useState } from "react";
import { Input, Textarea } from "@nextui-org/input";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

export default function LoginForm() {
  const navigation = useNavigation()

  const [isSignup, setIsSignup] = useState(false);
  const toggleSignup = () => setIsSignup(!isSignup);

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const [bioValue, setBioValue] = useState("");
  const handleChangeBio = (newValue: string) => {
    if (newValue.length <= 200) {
      setBioValue(newValue);
    }
  };

  const [nameValue, setNameValue] = useState("");
  const [nameError, setNameError] = useState("");
  const handleChangeName = (newValue: string) => {
    if (newValue.length <= 30) {
      setNameValue(newValue);
      // setNameError(newValue.length <= 0 ? "Please enter your name" : "");
      setNameError(newValue.length <= 2 ? "Name too short!" : "");
    }
  };

  const [emailValue, setEmailValue] = useState("");
  const [emailError, setEmailError] = useState("");
  const handleChangeEmail = (newValue: string) => {
    setEmailValue(newValue);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(!emailRegex.test(newValue) ? "Invalid email address" : "");
  };

  const [passwordValue, setPasswordValue] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const handleChangePassword = (newValue: string) => {
    setPasswordValue(newValue);
    setPasswordError(newValue === "" ? "Password is required" : "");
  };

  const handleSubmit = (e: React.FormEvent) => {
    if (!nameValue) setNameError("Name is required");
    if (!emailValue) setEmailError("Email is required");
    if (!passwordValue) setPasswordError("Password is required");

    // Submit form
    if (!nameError && !emailError && !passwordError) {
      console.log("Form submitted");
    } else {
      console.log(e, isRouteErrorResponse(error));
    }
  };

  return (
    <div className="md:w-1/3 w-full text-vanila_text p-4 md:p-8  bg-vanila flex flex-col gap-4 justify-center rounded-xl">
      <h1 className="mx-1 text-2xl font-bold font-raleway border-vanila_text rounded-full px-2">{isSignup ? "SignUp" : "Login"}</h1>
      <Form method="post" onSubmit={handleSubmit}>
        {isSignup && (
          <div>
            <Input label="Name" radius="sm" size="sm" name="name" variant="flat" placeholder="John Doe" isRequired
              color={nameError ? "danger" : "default"}
              value={nameValue}
              onValueChange={handleChangeName}
              className="text-vanila_text"
            />
            {nameError && <p className="text-red-vanila text-xs m-1 font-bold">{nameError}</p>}

          </div>

        )}

        <Input label="Email" type="email" radius="sm" size="sm" name="email" variant="flat" placeholder="john.doe@example.com"
          color={emailError ? "danger" : "default"}
          value={emailValue}
          onValueChange={handleChangeEmail}
          isRequired
          className="text-vanila_text my-2"
        />
        {emailError && <p className="text-red-vanila text-xs m-1 font-bold">{emailError}</p>}


        <Input label="Password" variant="flat" placeholder="Enter your password" radius="sm" size="sm" name="password"
          value={passwordValue}
          onValueChange={handleChangePassword}
          isRequired
          endContent={
            <button type="button" className="focus:outline-none" onClick={toggleVisibility}>
              {isVisible ? (
                <IoIosEye className="text-xl text-default-400 pointer-events-none fill-black" />
              ) : (
                <IoIosEyeOff className="text-xl text-default-400 pointer-events-none fill-black" />
              )}
            </button>
          }
          type={isVisible ? "text" : "password"}
          className="text-vanila_text"
        />
        {passwordError && <p className="text-red-vanila text-xs m-1 font-bold">{passwordError}</p>}
        {isSignup && (
          <>
            <Textarea label="Biography" placeholder="Tell us something about yourself" radius="sm" size="sm" name="bio" variant="flat" className="text-vanila_text my-2"
              maxRows={3}
              onValueChange={handleChangeBio}
              value={bioValue}
            />
            <p className="text-xs font-semibold p-1">Total Characters: {bioValue.length}/200</p>
          </>
        )}

        <p className="text-sm p-1 my-2">
          {isSignup ? "Already have an account? " : "Don't have an account? "}
          <button type="button" className="font-semibold hover:underline" onClick={toggleSignup}>
            {isSignup ? "Login" : "SignUp"}
          </button>
        </p>

        <div className="text-center my-2">
          <button
            value={isSignup ? "SignUp" : "Login"}
            name="_action"
            type="submit"
            disabled={navigation.state === 'submitting'}
            // onClick={handleSubmit}
            className="border-2 border-vanila_text rounded-full px-10 py-1 font-semibold hover:bg-vanila_text hover:text-vanila duration-200">
            Submit
          </button>
        </div>
      </Form>
    </div>
  );
}