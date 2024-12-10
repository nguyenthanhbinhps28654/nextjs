'use client';
import { useState } from 'react';
import Link from 'next/link';
export default function VD() {
  const [name, setName] = useState("");

  const handleClick = () => {
    alert('Hello ' + name);
  };

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border  text-black border-black-400 p-2"
      />
      <button
        onClick={handleClick}
        className="bg-blue-500 text-black px-4 py-2 rounded-full"
      >
        Click me
      </button>
      <li><Link href="/bai3/34">Bài 3.4</Link></li>
    </div>
  );
}