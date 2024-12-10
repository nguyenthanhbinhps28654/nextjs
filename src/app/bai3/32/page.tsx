'use client';
import { useState } from 'react';
import Link from 'next/link';
export default function VD() {
  const [selected, setSelected] = useState("Toán");
  const lessons = ["Toán", "Lý", "Hóa", "Sinh"];

  return (
    <div className="container mx-auto">
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="border border-gray-400 text-black p-2"
      >
        {lessons.map((lesson, index) => (
          <option key={index} value={lesson}>
            {lesson}
          </option>
        ))}
      </select>
      <h1>Bạn đã chọn môn: {selected}</h1>
      <li><Link href="/bai3/33">Bài 3.3</Link></li>
    </div>
  );
}