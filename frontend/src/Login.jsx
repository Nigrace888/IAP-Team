import { useEffect, useRef, useState } from "react";
import InputField from "./components/InputField";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    if (!email.includes("@")) {
      setError("Invalid email format");
      return;
    }

    setError("");

    console.log("Login Data:", { email, password });
    alert("Login successful!");
  };

  const emailRef = useRef(null);

  useEffect(() => {
    emailRef.current.focus();
  }, [emailRef]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full bg-zinc-500">
      <h1 className="text-2xl py-2 text-white font-bold">Login Form</h1>
      <div className="w-64 h-auto space-y-4 bg-white rounded-xl shadow-lg shadow-zinc-900 p-4">
        <InputField
          ref={emailRef}
          label="Username / Email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your Email or Username"
        />

        <InputField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your Password"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          onClick={handleLogin}
          className="h-10 w-full bg-zinc-500 font-bold text-white mt-4 py-2 rounded-lg"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
