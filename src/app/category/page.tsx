// app/categories/page.tsx
import React from 'react';

type Category = {
  _id: string;
  name: string;
  description?: string; // optional vì description không bắt buộc
};

// Function để fetch categories
async function getCategories(): Promise<Category[]> {
  const res = await fetch('http://localhost:3000/category', {
    cache: 'no-store' // Để luôn lấy dữ liệu mới nhất
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch categories');
  }
  
  return res.json();
}

export default async function Categories() {
  const categories = await getCategories();
  
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Danh sách danh mục</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div 
            key={category._id} 
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="p-6">
              {/* Card Header */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {category.name}
                </h2>
                <span className="px-3 py-1 text-sm text-blue-600 bg-blue-100 rounded-full">
                  Danh mục
                </span>
              </div>
              
              {/* Description */}
              <p className="text-gray-600">
                {category.description || 'Không có mô tả'}
              </p>
              
              {/* Action Buttons */}
              <div className="mt-6 flex gap-3">
                <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors">
                  Xem chi tiết
                </button>
                <button className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors">
                  Sửa
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Add Category Button */}
      <div className="mt-8">
        <button className="px-6 py-3 text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors flex items-center gap-2">
          <span className="text-xl">+</span>
          Thêm danh mục mới
        </button>
      </div>
      
      {/* No Categories Message */}
      {categories.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500 text-lg">
            Chưa có danh mục nào. Hãy thêm danh mục mới!
          </p>
        </div>
      )}
    </div>
  );
}

// Thêm file loading.tsx cho trạng thái loading