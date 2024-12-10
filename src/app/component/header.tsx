// component/header.tsx
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation'; 
import { useState, useEffect } from 'react';
import { MagnifyingGlassIcon, UserIcon, ShoppingCartIcon } from '@heroicons/react/24/solid';
import { useSelector } from 'react-redux';
import Avatar from 'react-avatar';

export default function Header() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [user, setUser] = useState<any>(null);

  // Lấy danh sách các sản phẩm trong giỏ hàng từ Redux store
  const cartItems = useSelector((state: any) => state.cart?.items || []); // Tránh undefined

  // Tính toán tổng số sản phẩm trong giỏ hàng
  const cartCount = cartItems.reduce((acc: any, item: any) => acc + item.quantity, 0);

  // Kiểm tra thông tin người dùng trong localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <header className="bg-[#334155] text-white py-4">
      <nav className="container mx-auto flex justify-between items-center">
        <ul className="flex space-x-3">
          <li>
            <Link href="/">Trang chủ</Link>
          </li>
          <li>
            <Link href="/bai2">Bài 2</Link>
          </li>
          <li>
            <Link href="/bai3">Bài 3</Link>
          </li>
          <li>
            <Link href="/bai5">Bài 5</Link>
          </li>
        </ul>
        <div className="flex items-center space-x-3">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-full bg-indigo-700 text-white"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </form>

          {user ? (
            <Link href="/info">
              {/* Hiển thị avatar nếu người dùng đã đăng nhập */}
              <Avatar
                name={`${user.firstName} ${user.lastName}`}
                src={user.avatar || ''}
                size="40"
                round={true}
              />
            </Link>
          ) : (
            <Link href="/login">
              <UserIcon className="h-6 w-6 text-white" />
            </Link>
          )}

          <Link href="/giohang" className="relative">
            <ShoppingCartIcon className="h-6 w-6 text-white" />
            {/* Hiển thị số lượng sản phẩm trong giỏ */}
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
              {cartCount > 0 ? cartCount : ''}
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
