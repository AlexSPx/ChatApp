import Divider from "../components/Divider";
import Field from "../components/Field";

export default function Home() {
  return (
    <div className="flex w-screen h-screen bg-charcoal-dark text-white">
      <div className="flex w-1/2 h-full bg-charcoal-main items-center justify-center">
        <div className="flex flex-col w-3/5 items-center">
          {/* <Register /> */}
          <Login />
        </div>
      </div>
    </div>
  );
}

const Login = () => {
  return (
    <>
      <h1 className="text-4xl font-bold">Sign In to your account</h1>
      <Divider style="mt-2">
        <p className="text-lg font-thin">Sign In</p>
      </Divider>

      <form className="w-full">
        <Field label="Email" placeholder="Eg. bob@mail.com" type="email" />
        <Field label="Password" placeholder="Enter password" type="password" />
        <button className="w-full mt-3 p-2 bg-blue-main hover:bg-blue-dark font-bold text-lg rounded">
          Sign In
        </button>
      </form>
    </>
  );
};

const Register = () => {
  return (
    <>
      <h1 className="text-4xl font-bold">Sign up for free</h1>
      <Divider style="mt-2">
        <p className="text-lg font-thin">Sign Up</p>
      </Divider>

      <form className="w-full">
        <Field
          label="Name"
          placeholder="Enter your first and last name"
          type="email"
        />
        <Field
          label="Username"
          placeholder="Enter a unique username"
          type="email"
        />
        <Field label="Email" placeholder="Eg. bob@mail.com" type="email" />
        <Field label="Password" placeholder="Enter password" type="password" />
        <Field
          label="Password"
          placeholder="Validate password"
          type="password"
        />
      </form>
    </>
  );
};
