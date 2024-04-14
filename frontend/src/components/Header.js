"use client";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("jobToken");

    router.push("/");
  };

  return (
    <header>
      <nav>
        <ul>
          <li>
            <button
              className="btn btn-active btn-neutral m-5 mr-auto "
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
