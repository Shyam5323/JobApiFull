"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://jobapi-qfqj.onrender.com/api/v1/auth/login",
        {
          email,
          password,
        }
      );
      const token = response.data.token;
      localStorage.setItem("jobToken", token);

      setEmail("");
      setPassword("");
      setError(null);
      router.push("/");
    } catch (error) {
      console.error("Login failed:", error.response.data);
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-semibold mb-4">Login</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Email:</label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1">Password:</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              required
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>
        <div className="flex p-5 m-5 justify-center items-center">
          <p>Create new account?</p>
          <Link href="/auth/register">
            <button className="btn btn-outline btn-primary">Register</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
