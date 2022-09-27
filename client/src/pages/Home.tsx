import { useState } from "react";
import Divider from "../components/Divider";
import Field from "../components/Field";

export default function Home() {
  const [menu, setMenu] = useState<"signup" | "signin" | null>(null)

  const goBack = () => setMenu(null)
  
  const Buttons = () => {
    return (
      <div className="flex flex-col w-full">
        <button className="w-full mt-3 p-2 bg-blue-light hover:bg-blue-dark font-bold text-lg rounded" onClick={() => setMenu("signin")}>
          Sign In
        </button>
        <button className="w-full mt-3 p-2 bg-blue-main hover:bg-blue-dark font-bold text-lg rounded" onClick={() => setMenu("signup")}>
          Sign Up
        </button>
      </div>
    )
  }

  return (
    <div className="flex w-screen h-screen bg-charcoal-dark text-white">
      <div className="flex w-1/2 h-full bg-charcoal-main items-center justify-center">
        <div className="flex flex-col w-3/5 items-center">
          {menu ? (
<<<<<<< HEAD
            menu === "signin" ? (
              <Login goBack={goBack} />
            ) : (
              <Register goBack={goBack} />
            )
          ) : (
            <Buttons />
          )}
=======
            menu === "signin" ? <Login goBack={goBack}/> : <Register goBack={goBack}/>
          ) : <Buttons />}
>>>>>>> 051c2240369e0210835560a1e2cb2ffe847378fe
        </div>
      </div>
    </div>
  );
}

type Props = {
<<<<<<< HEAD
  goBack: () => void;
};

const Login = ({ goBack }: Props) => {

const Register = ({ goBack }: Props) => {
=======
const Register = ({goBack}: Props) => {
>>>>>>> 051c2240369e0210835560a1e2cb2ffe847378fe
  return (
    <>
      <h1 className="text-4xl font-bold">Sign up for free</h1>
      <form className="w-full">
        <Field
          label="Name"
          placeholder="Enter your first and last name"
          type="email"
        />
        <Field
        <Field
          label="Password"
          placeholder="Validate password"
          type="password"
        <button className="w-full mt-3 p-2 bg-blue-main hover:bg-blue-dark font-bold text-lg rounded">
          Sign Up
        </button>
<<<<<<< HEAD
        <button
          className="w-full mt-3 p-2 bg-blue-light hover:bg-blue-main font-bold text-lg rounded"
          onClick={goBack}
        >
=======
        <button className="w-full mt-3 p-2 bg-blue-light hover:bg-blue-main font-bold text-lg rounded" onClick={goBack}>
>>>>>>> 051c2240369e0210835560a1e2cb2ffe847378fe
          Back
        </button>
      </form>
    </>
  );
};
