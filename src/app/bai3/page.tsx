// page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
export default function Counter() {
  // Khởi tạo biến đếm với giá trị ban đầu là 0
  const [count, setCount] = useState(0);

  // Hàm tăng giá trị đếm
  const increment = () => {
    setCount(count + 1);
  };

  // Hàm giảm giá trị đếm
  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={increment} className="bg-blue-500 text-white px-4 py-2 rounded-full">
        Tăng
      </button>
      <button onClick={decrement} className="bg-red-500 text-white px-4 py-2 rounded-full">
        Giảm
      </button>
      <li><Link href="/bai3/32">Bài 3.2</Link></li>
    </div>
  );
}
