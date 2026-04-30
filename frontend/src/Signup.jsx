import { useState, useRef, useEffect, useContext } from "react";
import InputField from "./components/InputField";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const nameRef = useRef(null);

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  const handleSignup = async () => {
    try {
      const res = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      console.log("Response status:", res.status);

      const data = await res.json();
      console.log("Response data:", data);

      if (res.ok) {
        if (data.user) {
          login(data.user); // auto-login after signup
        }
        navigate("/dashboard");
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError("Network error, could not connect to server");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen bg-zinc-500">
      <h1 className="text-2xl py-2 text-white font-bold">Signup Form</h1>

      <div className="w-64 h-auto space-y-4 bg-white rounded-xl shadow-lg shadow-zinc-900 p-4">
        <InputField
          ref={nameRef}
          label="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your Name"
        />

        <InputField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your Email"
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
          type="button"
          onClick={handleSignup}
          className="h-10 w-full bg-zinc-500 font-bold text-white mt-4 py-2 rounded-lg"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default Signup;
