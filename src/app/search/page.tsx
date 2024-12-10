"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  hot: number;
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/products");
        const data: Product[] = await response.json();
        setProducts(data);

        // Filter products by query
        if (query) {
          const filtered = data.filter((product) =>
            product.name.toLowerCase().includes(query.toLowerCase())
          );
          setFilteredProducts(filtered);
        } else {
          setFilteredProducts(data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query]);

  if (loading) {
    return <p className="text-white">Loading...</p>;
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center text-white py-8">
        <h1 className="text-2xl font-bold">Không tìm thấy sản phẩm</h1>
        <p>Hãy thử từ khóa khác.</p>
        <Link href="/" className="text-blue-500 underline">
          Quay lại Trang chủ
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen py-8 px-4 text-white">
      <h1 className="text-center text-3xl font-bold mb-8">Kết quả tìm kiếm</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Link href={`/pro/${product.id}`} key={product.id}>
            <div className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-full h-70 overflow-hidden rounded-md mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-1">{product.name}</h3>
              <p className="text-gray-400 mb-2">
                Giá: {product.price.toLocaleString()} VND
              </p>
              {product.hot === 1 && (
                <span className="bg-red-500 text-white text-sm font-bold px-2 py-1 rounded">
                  Hot
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
