// pages/info.tsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Avatar from 'react-avatar'; // Dùng để tạo avatar từ tên

export default function Info() {
  const [user, setUser] = useState<{
    email: string;
    id: string;
    role: string;
    avatar?: string;
    firstName?: string;
    lastName?: string;
  } | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Lấy thông tin tài khoản từ localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      router.push('/login'); // Nếu không có thông tin tài khoản, chuyển về login
    }
  }, [router]);

  const handleLogout = () => {
    // Xóa thông tin tài khoản khỏi localStorage và chuyển hướng về trang login
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (!user) {
    return null; // Chờ khi tải xong dữ liệu người dùng
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white dark:bg-gray-900">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          User Information
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="space-y-6 text-center">
          {/* Hiển thị avatar */}
          {user.avatar && user.avatar.trim() !== '' ? (
            <img
              src={user.avatar}
              alt="User Avatar"
              className="mx-auto h-20 w-20 rounded-full object-cover"
            />
          ) : (
            <Avatar
              name={`${user.firstName || ''} ${user.lastName || ''}`.trim()}
              size="80"
              round={true}
              className="mx-auto"
            />
          )}

          {/* Thông tin người dùng */}
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>User ID:</strong> {user.id}</p>
          <p><strong>Role:</strong> {user.role}</p>

          {/* Nút CMS nếu role là admin */}
          {user.role === 'admin' && (
            <div>
              <button
                onClick={() => router.push('/cms')}
                className="mt-4 w-full justify-center rounded-md bg-green-600 text-white px-3 py-1.5 text-sm font-semibold shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                CMS
              </button>
            </div>
          )}

          {/* Nút Logout */}
          <div>
            <button
              onClick={handleLogout}
              className="mt-4 w-full justify-center rounded-md bg-indigo-600 text-white px-3 py-1.5 text-sm font-semibold shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
