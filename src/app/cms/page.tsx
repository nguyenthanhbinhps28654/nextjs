'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import Avatar from 'react-avatar'; // Thêm react-avatar để thay thế hình ảnh mặc định
import Link from 'next/link';
const API_URL = 'http://localhost:5000/users';

export default function CMSUser() {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);  // Trạng thái người dùng hiện tại
  const router = useRouter();

  // Fetch dữ liệu người dùng
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(API_URL);
        setUsers(response.data);
        
        // Giả sử bạn có API để lấy user hiện tại (admin đang đăng nhập)
        const loggedInUser = response.data.find(user => user.role === 'admin'); // Giả sử lấy admin đầu tiên
        setCurrentUser(loggedInUser);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };
    fetchUsers();
  }, []);

  // Form validation schema
  const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters'),
    avatar: Yup.string().url('Invalid avatar URL'),
    role: Yup.string().required('Role is required'),
  });

  // Formik setup cho Add / Edit tài khoản
  const formik = useFormik({
    initialValues: {
      firstName: editUser ? editUser.firstName : '',
      lastName: editUser ? editUser.lastName : '',
      email: editUser ? editUser.email : '',
      password: editUser ? '' : '', // Không hiển thị mật khẩu khi chỉnh sửa
      avatar: editUser ? editUser.avatar : '',
      role: editUser ? editUser.role : 'user', // Mặc định là user
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      if (editUser) {
        // Nếu có thay đổi mật khẩu, hash lại mật khẩu
        if (values.password !== '') {
          const hashedPassword = await bcrypt.hash(values.password, 10);
          values.password = hashedPassword;
        } else {
          // Nếu không thay đổi mật khẩu, giữ nguyên mật khẩu cũ
          values.password = editUser.password;
        }

        // Cập nhật tài khoản
        await axios.put(`${API_URL}/${editUser.id}`, values);
      } else {
        // Tạo tài khoản mới
        const hashedPassword = await bcrypt.hash(values.password, 10);
        values.password = hashedPassword;

        // Thêm tài khoản mới
        await axios.post(API_URL, values);
      }

      router.refresh();
      setEditUser(null); // Reset sau khi submit
    },
  });

  // Handle edit tài khoản
  const handleEdit = (user) => {
    setEditUser(user);
    formik.setValues({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: '', // Không hiển thị mật khẩu ban đầu
      avatar: user.avatar,
      role: user.role,
    });
  };

  // Handle delete tài khoản
  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    setUsers(users.filter((user) => user.id !== id)); // Loại bỏ user khỏi state
  };
  

  // Cancel edit mode
  const handleCancelEdit = () => {
    setEditUser(null);
    formik.resetForm();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">CMS Dashboard - User Management</h1>
      <Link href="/cms/product">
              <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-6 rounded">
                CMS Product
              </button>
            </Link>

      {/* User Form for Add / Edit */}
      <form onSubmit={formik.handleSubmit} className="space-y-4 mb-6">
        <div>
          <label htmlFor="firstName" className="block">First Name</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.firstName}
            className="p-2 border border-gray-300 rounded w-full text-black"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.lastName}
            className="p-2 border border-gray-300 rounded w-full text-black"
          />
        </div>
        <div>
          <label htmlFor="email" className="block">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            className="p-2 border border-gray-300 rounded w-full text-black"
          />
        </div>
        <div>
          <label htmlFor="password" className="block">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            className="p-2 border border-gray-300 rounded w-full"
            placeholder="Vì lý do bảo mật, mật khẩu sẽ không hiển thị. Để trống nếu không muốn thay đổi mật khẩu."
          />
        </div>
        <div>
          <label htmlFor="avatar" className="block">Avatar URL</label>
          <input
            id="avatar"
            name="avatar"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.avatar}
            className="p-2 border border-gray-300 rounded w-full text-black"
            placeholder="Có thể để trống. Hệ thống sẽ tạo avatar tự động."
          />
        </div>
        <div>
          <label htmlFor="role" className="block">Role</label>
          <select
            id="role"
            name="role"
            onChange={formik.handleChange}
            value={formik.values.role}
            className="p-2 border border-gray-300 rounded w-full text-black"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="flex items-center space-x-4">
          {editUser ? (
            <>
              <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                Save
              </button>
              <button type="button" onClick={handleCancelEdit} className="bg-red-500 text-white py-2 px-4 rounded">
                Cancel
              </button>
            </>
          ) : (
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
              Add User
            </button>
          )}
        </div>
      </form>

      {/* User List Table */}
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">First Name</th>
            <th className="border px-4 py-2">Last Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Avatar</th>
            <th className="border px-4 py-2">Role</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border px-4 py-2">{user.firstName}</td>
              <td className="border px-4 py-2">{user.lastName}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">
                {user.avatar ? (
                  <img src={user.avatar} alt="Avatar" className="w-16 h-16 object-cover rounded-full" />
                ) : (
                  <Avatar name={user.firstName + ' ' + user.lastName} size="50" round={true} />
                )}
              </td>
              <td className="border px-4 py-2">{user.role}</td>
              <td className="border px-4 py-2">
                <button onClick={() => handleEdit(user)} className="bg-yellow-500 text-white px-4 py-2 rounded mr-2">
                  Edit
                </button>
                {currentUser && currentUser.id !== user.id && (
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded ml-2"
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
