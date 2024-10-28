import { json } from "@remix-run/node";
import { redirect } from "react-router";
import LoginForm from "~/components/LoginForm"
import { createUser, loginUser } from "~/db/query";

export async function action({ request }: { request: Request }) {
  const body = await request.formData();
  const _action = body.get('_action') as string;
  
  // For SignIn and SignUp
  const email = body.get('email') as string;
  const password = body.get('password') as string;
  
  // For SignUp
  if (_action === "SignUp") {
    
    // For SignUp take bio and name 
    const bio = body.get('bio') as string ?? "";
    const name = body.get('name') as string;
    
    // Storing errors in a variable
    const errors: Record<string, string> = {};
    
    // Email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Server Validation Logic
    if (!name) { errors.message = "Name is required"; }
    else if (name.length <= 2) { errors.message = "Name must be atleast 3 characters long"; }
    else if (name.length >= 30) { errors.message = "Name cannot exceed 30 characters"; }

    else if (!email) { errors.message = "Email is required" }
    else if (!emailRegex.test(email)) { errors.message = "Invalid email address" }

    else if (!password) { errors.message = "Password is required"; }
    else if (password.length < 6) { errors.message = "Password must be at least 6 characters long" }
    else if (password.length > 20) { errors.message = "Password cannot exceed 20 characters" }

    else if (bio.length >= 200) { errors.message = "200 characters if enough for your Bio"; }

    // Sending error to client
    if (Object.keys(errors).length > 0) { return json({ errors }, { status: 400 }) }

    // Create New User if no errors
    const result_signup = await createUser(name, email, password, bio);
    console.log("login_result: ", result_signup)
    if (result_signup?.error) {
      return json({ errors: { message: result_signup?.message } }, { status: 400 })
    }

    // Redirect to Posts after 
    return redirect(`/posts`);

  } else if (_action == "Login") {
    const errors: Record<string, string> = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) { errors.message = "Email is required" }
    else if (!emailRegex.test(email)) { errors.message = "Invalid email address" }
    else if (!password) { errors.message = "Password is required" }

    if (Object.keys(errors).length > 0) { return json({ errors }, { status: 400 }) }

    const result_login = await loginUser(email, password);
    console.log("login_result: ", result_login)
    if (result_login?.error) {
      return json({ errors: { message: result_login?.message } }, { status: 400 })
    }
    return redirect(`/posts`)
  } else {
    return json({ errors: { message: "Something went wrong, please try again!" } }, { status: 500 })
  }
}

export default function Login() {

  return (
    <div className="flex gap-4 container mx-auto p-4 md:p-0">
      <LoginForm />
      <div className="hidden w-2/3 text-vanila_text  bg-green_vanila overflow-hidden md:flex flex-col gap-4 justify-center rounded-xl">
        <img src="bird.jpg" className="h-full object-cover scale-x-[-1]" alt="" />
      </div>
    </div>
  );
}