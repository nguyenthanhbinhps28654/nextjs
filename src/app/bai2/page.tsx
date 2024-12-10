'use strict';
import Image from "next/image";
import Button from "../component/button";

export default function Home() {
  const name = "Nguyen Van A";
  const age = 20;
  const lessons = ["Toan", "Ly", "Hoa", "Sinh"];
  const students = [
    { name: "Nguyen Van A", age: 20 },
    { name: "Nguyen Van B", age: 21 },
    { name: "Nguyen Van C", age: 22 },
  ];

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Test</h1>
      
      <div className="flex gap-4 justify-center mb-6">
        <Button content="Lùi về" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"/>
        <Button content="Cút" className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"/>
      </div>

      <section className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h1 className="text-2xl font-semibold mb-4 text-gray-800">Thông tin cá nhân</h1>
        <p className="text-gray-700">Tên: <span className="font-medium">{name}</span></p>
        <p className="text-gray-700">Tuổi: <span className="font-medium">{age}</span></p>
      </section>

      <section className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h1 className="text-2xl font-semibold mb-4 text-gray-800">Môn học</h1>
        <ul className="list-disc pl-5 text-gray-700">
          {lessons.map((lesson, index) => (
            <li key={index} className="mb-1">{lesson}</li>
          ))}
        </ul>
      </section>

      <section className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-4 text-gray-800">Danh sách sinh viên</h1>
        <ul className="list-disc pl-5 text-gray-700">
          {students.map((student, index) => (
            <li key={index} className="mb-1">{student.name} - {student.age}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
