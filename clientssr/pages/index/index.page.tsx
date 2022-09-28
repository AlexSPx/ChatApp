import React, { useState } from "react";
import Divider from "../../components/Divider";
import Field from "../../components/Field";
import useQuery from "../../queries";

export { Page };

function Page() {
  const [menu, setMenu] = useState<"signup" | "signin" | null>(null);

  const goBack = () => setMenu(null);

  const Buttons = () => {
    return (
      <div className="flex flex-col w-full">
        <button
          className="w-full mt-3 p-2 bg-blue-light hover:bg-blue-dark font-bold text-lg rounded"
          onClick={() => setMenu("signin")}
        >
          Sign In
        </button>
        <button
          className="w-full mt-3 p-2 bg-blue-main hover:bg-blue-dark font-bold text-lg rounded"
          onClick={() => setMenu("signup")}
        >
          Sign Up
        </button>
      </div>
    );
  };

  return (
    <div className="flex w-screen h-screen bg-charcoal-dark text-white">
      <div className="flex w-1/2 h-full bg-charcoal-main items-center justify-center">
        <div className="flex flex-col w-3/5 items-center">
          {menu ? (
            menu === "signin" ? (
              <Login goBack={goBack} />
            ) : (
              <Register goBack={goBack} />
            )
          ) : (
            <Buttons />
          )}
        </div>
      </div>
    </div>
  );
}

type Props = {
  goBack: () => void;
};

const Login = ({ goBack }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loginQuery } = useQuery();

  const handleLogin = async () => {
    if (!email || !password) return;

    const userData = {
      email,
      password,
    };

    await loginQuery(userData);
  };

  return (
    <>
      <h1 className="text-4xl font-bold">Sign In to your account</h1>
      <Divider style="mt-2">
        <p className="text-lg font-thin">Sign In</p>
      </Divider>

      <div className="w-full">
        <Field
          label="Email"
          placeholder="Eg. bob@mail.com"
          type="email"
          data={email}
          setData={setEmail}
        />
        <Field
          label="Password"
          placeholder="Enter password"
          type="password"
          data={password}
          setData={setPassword}
        />
        <button
          className="w-full mt-3 p-2 bg-blue-main hover:bg-blue-dark font-bold text-lg rounded"
          onClick={handleLogin}
        >
          Sign In
        </button>
        <button
          className="w-full mt-3 p-2 bg-blue-light hover:bg-blue-main font-bold text-lg rounded"
          onClick={goBack}
        >
          Back
        </button>
      </div>
    </>
  );
};

const Register = ({ goBack }: Props) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validatePassword, setValidatePassword] = useState("");

  const { registerQuery } = useQuery();

  const handleRegister = async () => {
    if (!name || !username || !email || !password || !validatePassword) return;
    if (password !== validatePassword) return;

    const userData = {
      name,
      username,
      email,
      password,
    };

    const user = await registerQuery(userData);
  };

  return (
    <>
      <h1 className="text-4xl font-bold">Sign up for free</h1>
      <Divider style="mt-2">
        <p className="text-lg font-thin">Sign Up</p>
      </Divider>

      <div className="w-full">
        <Field
          label="Name"
          placeholder="Enter your first and last name"
          type="text"
          data={name}
          setData={setName}
        />
        <Field
          label="Username"
          placeholder="Enter a unique username"
          type="text"
          data={username}
          setData={setUsername}
        />
        <Field
          label="Email"
          placeholder="Eg. bob@mail.com"
          type="email"
          data={email}
          setData={setEmail}
        />
        <Field
          label="Password"
          placeholder="Enter password"
          type="password"
          data={password}
          setData={setPassword}
        />
        <Field
          label="Validate Password"
          placeholder="Validate password"
          type="password"
          data={validatePassword}
          setData={setValidatePassword}
        />
        <button
          className="w-full mt-3 p-2 bg-blue-main hover:bg-blue-dark font-bold text-lg rounded"
          onClick={handleRegister}
        >
          Sign Up
        </button>
        <button
          className="w-full mt-3 p-2 bg-blue-light hover:bg-blue-main font-bold text-lg rounded"
          onClick={goBack}
        >
          Back
        </button>
      </div>
    </>
  );
};
