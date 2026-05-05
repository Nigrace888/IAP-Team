import { useEffect, useRef, useState } from "react";
import InputField from "./components/InputField";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthContext.jsx";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
const handleLogin = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    console.log("1. Response status:", res.status);

    const data = await res.json();
    console.log("2. Full response data:", data);
    console.log("3. data.user:", data.user);
    console.log("4. data.token:", data.token);

    if (res.ok) {
      if (data.user && data.token) {
        console.log("5. About to call login() with:", data.user, data.token);
        login(data.user, data.token);
        console.log("6. Login function called successfully");
        console.log("7. About to navigate to /dashboard");
        navigate("/dashboard");
        console.log("8. Navigation called");
      } else {
        console.log("ERROR: Missing user or token in response");
        setError("Invalid response from server");
      }
      navigate("/dashboard");
    } else {
      setError(data.message || "Login failed");
    }
  } catch (err) {
    console.error("Login error:", err);
    setError("Network error");
  }
};




  const emailRef = useRef(null);

 useEffect(() => {
  emailRef.current.focus();
}, []);  // ✅ Empty dependency array

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen bg-zinc-500">
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
