import {json} from "@remix-run/node"; 
import { redirect } from "react-router";
import LoginForm from "~/components/LoginForm"
import { createUser, loginUser } from "~/db/query";

export async function action({ request }: { request: Request }) {
  const body = await request.formData();
  const _action = body.get('_action') as string;
  const email = body.get('email') as string;
  const password = body.get('password') as string;
  const bio = body.get('bio') as string ?? "";

  // For SignUp
  if (_action === "SignUp") {
    const name = body.get('name') as string;

    const errors: Record<string, string> = {};
    if (!name) {errors.name = "Name is required";}
    if (!email) {errors.email = "Email is required";}
    if (!password) {errors.password = "Password is required";}
    
    if (Object.keys(errors).length > 0) {
      return json({ errors });
    }

    const newUser = await createUser(name, email, password, bio)
    console.log(newUser); 
    return redirect(`/posts`);

  } else if(_action=="Login") {
    // For Login, head to query for the code logic
    const result_login = await loginUser(email, password);
    console.log("Result Login: ", result_login)
    if ('error' in result_login && result_login.error) {
      return json({ error: result_login.error });
    }
    return redirect(`/posts`)
  }
  
  else {
    console.log("Invalid action")
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