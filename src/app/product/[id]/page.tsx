// app/product/[id]/page.tsx
import React from 'react';

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

// Hàm fetch sản phẩm theo ID
async function getProductById(id: string): Promise<Product> {
  const res = await fetch(`http://localhost:3000/product/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch product');
  }

  return res.json();
}

export async function generateStaticParams() {
  const res = await fetch('http://localhost:3000/product', {
    cache: 'no-store',
  });

  const products: Product[] = await res.json();

  return products.map((product) => ({
    id: product._id,
  }));
}

export default async function ProductDetail({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id);

  return (
    <div className="container mx-auto py-10 px-4 lg:px-0">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-6">
        {/* Hình ảnh sản phẩm */}
        <div className="md:w-1/2 flex flex-col items-center">
          <img 
            src={product.HinhAnh} 
            alt={product.name} 
            className="w-full h-auto object-cover rounded-lg"
          />
          <div className="flex mt-4 space-x-2">
            {/* Thêm hình ảnh nhỏ hoặc bộ sưu tập hình ảnh ở đây */}
            <img src={product.HinhAnh} alt={product.name} className="w-16 h-16 object-cover border rounded" />
            <img src={product.HinhAnh} alt={product.name} className="w-16 h-16 object-cover border rounded" />
          </div>
        </div>

        {/* Thông tin chi tiết sản phẩm */}
        <div className="md:w-1/2">
          <p className="text-sm text-red-600 font-medium">Sustainable Materials</p>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
          <p className="text-lg text-gray-500 mb-4">{product.category.categoryName}</p>
          <p className="text-2xl font-semibold text-blue-600 mb-6">{product.price.toLocaleString()} VND</p>
          
          <div className="flex items-center mb-4">
            <span className="text-gray-500 mr-4">Select Size</span>
            <div className="flex space-x-2">
              {["S", "M", "L", "XL", "2XL"].map((size) => (
                <button key={size} className="border rounded px-4 py-1 text-gray-700 hover:bg-gray-100">
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button className="w-full bg-black text-white py-3 rounded-lg text-lg font-semibold hover:bg-gray-800 transition">
            Add to Bag
          </button>

          <button className="w-full border border-gray-400 text-gray-800 py-3 rounded-lg text-lg font-semibold mt-3 hover:bg-gray-100 transition">
            Favourite ♡
          </button>

          <div className="mt-6 bg-gray-100 p-4 rounded-lg text-gray-600 text-sm">
            This product is made from 100% recycled polyester fibres.
          </div>
        </div>
      </div>
    </div>
  );
}
