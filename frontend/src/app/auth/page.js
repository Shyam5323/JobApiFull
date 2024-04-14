// pages/index.js (Home component)

import Link from "next/link";

export default function Auth() {
  return (
    <main>
      <h1>Auth</h1>
      <Link href="/login">Login</Link>
    </main>
  );
}
