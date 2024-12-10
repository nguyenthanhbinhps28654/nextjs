"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  hot: number;
  idcate: number;
}

const categoryNames: { [key: number]: string } = {
  1: "Danh mục 1",
  2: "Danh mục 2",
  // Bạn có thể thêm các danh mục khác ở đây nếu cần
};

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const groupProductsByCategory = () => {
    return products.reduce((acc: { [key: number]: Product[] }, product) => {
      const category = product.idcate;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(product);
      return acc;
    }, {});
  };

  if (loading) {
    return <p className="text-white">Loading...</p>;
  }

  const groupedProducts = groupProductsByCategory();

  return (
    <div className="bg-gray-900 min-h-screen py-8 px-4 text-white">
      <h1 className="text-center text-3xl font-bold mb-8">Danh Sách Sản Phẩm Theo Danh Mục</h1>
      {Object.keys(groupedProducts).map((categoryId) => (
        <div key={categoryId} className="mb-8">
          <h2 className="text-2xl font-bold mb-4">
            {categoryNames[parseInt(categoryId)] || `Danh mục ${categoryId}`}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {groupedProducts[parseInt(categoryId)].map((product) => (
              <div key={product.id} className="bg-gray-800  p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <Link href={`/pro/${product.id}`} key={product.id}><img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-md mb-4" /></Link>
                <h3 className="text-xl font-semibold mb-1">{product.name}</h3>
                <p className="text-gray-400 mb-2">Giá: {product.price.toLocaleString()} VND</p>
                {product.hot === 1 && (
                  <span className="bg-red-500 text-white text-sm font-bold px-2 py-1 rounded">Hot</span>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsPage;
