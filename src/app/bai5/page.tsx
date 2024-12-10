'use client';
import Link from "next/link";
import { useState } from 'react';

export default function ViduForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`Email: ${email}, Password: ${password}`);
  };

  return (
    <form onSubmit={handleSubmit} className="container mx-auto max-w-sm">
      <label htmlFor="email" className="block">
        Email:
      </label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-2 mb-6 border border-gray-300 text-black"
        aria-label="Email"
      />
      <label htmlFor="password" className="block text-black">
        Password:
      </label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-2 mb-6 border border-gray-300 text-black"
        aria-label="Password"
      />
      <button type="submit" className="bg-blue-500 text-black p-2 block">
        Submit
      </button>
      <li>
            <Link href="/bai5/bai52">Bài 52</Link>
          </li>
    </form>


  );
}
