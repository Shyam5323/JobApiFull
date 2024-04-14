"use client";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Link from "next/link";

const App = () => {
  // const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const jobToken = localStorage.getItem("jobToken");
    if (jobToken) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [loggedIn]);

  function handleLogOut() {
    localStorage.removeItem("jobToken");
    setLoggedIn(false);
  }

  return (
    <div>
      {loggedIn && (
        <div className="flex justify-center align-middle items-center flex-col mt-24 gap-10">
          <div className="flex font-semibold text-6xl">Authentiated </div>
          <button className="btn btn-primary w-52" onClick={handleLogOut}>
            Log Out
          </button>
          <Link href="/dashboard">
            <button className="btn btn-secondary w-52">
              Access the dashboard
            </button>
          </Link>
        </div>
      )}
      {!loggedIn && (
        <div className="flex justify-center align-middle items-center flex-col mt-24">
          <h1 className="flex font-semibold text-6xl">Not Authentiated</h1>
          <Link href="/auth/login">
            <button className="btn btn-primary w-52">Log In</button>{" "}
          </Link>
        </div>
      )}
    </div>
  );
};

export default App;
