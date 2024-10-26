import React, { useState } from "react";
import { Form } from "@remix-run/react";
import { Input } from "@nextui-org/input";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

export default function Login() {
    const [isSignup, setIsSignup] = useState(false);
    const toggleSignup = () => setIsSignup(!isSignup);
    const [isVisible, setIsVisible] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <div className="min-h-screen text-vanila_text">
            <div className="mx-1 my-2 p-4 w-4/5 bg-green_vanila rounded-xl">
                <h1 className="text-center">{isSignup ? "SignUp" :  "Login"}</h1>
                <Form method="post">
                    {isSignup  && (
                        <Input label="Name" radius="sm" size="sm" name="name" variant="flat" isRequired className="text-vanila_text"/>
                    )}
                    <Input label="Email" radius="sm" size="sm" name="email" variant="flat" isRequired className="text-vanila_text"/>
                    <Input label="Password" variant="flat" placeholder="Enter your password"
                      endContent={
                        <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                          {isVisible ? (
                            <IoIosEye className="text-2xl text-default-400 pointer-events-none fill-black" />
                          ) : (
                            <IoIosEyeOff className="text-2xl text-default-400 pointer-events-none fill-black" />
                          )}
                        </button>
                      }
                      type={isVisible ? "text" : "password"}
                      className="max-w-xs"
                    />
                </Form>
            </div>
        </div>
    );
}