// app/page.tsx
import React from 'react';
import Link from 'next/link';

type Product = {
  _id: string;
  name: string;
  price: number;
  mota: string;
  HinhAnh: string;
  category: {
    categoryId: string;
    categoryName: string;
  };
};

// Tạo function để fetch data
async function getProducts(): Promise<Product[]> {
  const res = await fetch('http://localhost:3000/product', {
    cache: 'no-store', // Tương đương với getServerSideProps
  });

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  return res.json();
}

// Đánh dấu component là async
export default async function Home() {
  // Fetch data trực tiếp trong component
  const products = await getProducts();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-5">Danh sách sản phẩm</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <Link href={`/product/${product._id}`} key={product._id}>
            <div className="border p-4 rounded shadow cursor-pointer">
              <img 
                src={product.HinhAnh} 
                alt={product.name} 
                className="w-full h-48 object-cover rounded"
              />
              <h2 className="text-xl font-bold mt-2">{product.name}</h2>
              <p className="text-gray-500">{product.mota}</p>
              <p className="text-blue-600 font-semibold">{product.price} VND</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
