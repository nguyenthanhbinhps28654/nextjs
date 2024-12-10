'use client';
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Link from 'next/link';
import bcrypt from 'bcryptjs';

const SignupForm = () => {
  // Schema xác thực dữ liệu
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('Vui lòng nhập tên'),
    lastName: Yup.string().required('Vui lòng nhập họ'),
    email: Yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
    password: Yup.string()
      .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
      .required('Vui lòng nhập mật khẩu'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Mật khẩu không khớp')
      .required('Vui lòng nhập lại mật khẩu'),
    avatar: Yup.string().url('Link không hợp lệ').notRequired(), // Không bắt buộc, nhưng nếu có phải là URL hợp lệ
  });

  // Hàm xử lý submit
  const handleSubmit = async (values: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    avatar?: string;
  }) => {
    const { firstName, lastName, email, password, avatar } = values;

    try {
      // Hash mật khẩu bằng bcrypt
      const hashedPassword = await bcrypt.hash(password, 10);

      // Gửi yêu cầu POST tới JSON Server
      const response = await axios.post('http://localhost:5000/users', {
        firstName,
        lastName,
        email,
        avatar: avatar || '', // Nếu không có link, mặc định là chuỗi rỗng
        password: hashedPassword,
        role: 'user', // Role mặc định là user
      });

      if (response.status === 201) {
        alert('Đăng ký thành công!');
      }
    } catch (error) {
      console.error('Lỗi khi đăng ký:', error);
      alert('Đăng ký thất bại. Vui lòng thử lại.');
    }
  };

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        avatar: '', // Giá trị mặc định
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form className="container mx-auto max-w-sm">
          <label htmlFor="firstName" className="block">Tên:</label>
          <Field
            name="firstName"
            type="text"
            className="p-2 border border-gray-300 w-full text-black"
            id="firstName"
          />
          <ErrorMessage name="firstName" component="div" className="text-red-500" />

          <label htmlFor="lastName" className="block mt-4">Họ:</label>
          <Field
            name="lastName"
            type="text"
            className="p-2 border border-gray-300 w-full text-black"
            id="lastName"
          />
          <ErrorMessage name="lastName" component="div" className="text-red-500" />

          <label htmlFor="email" className="block mt-4">Email:</label>
          <Field
            name="email"
            type="email"
            className="p-2 border border-gray-300 w-full text-black"
            id="email"
          />
          <ErrorMessage name="email" component="div" className="text-red-500" />

          <label htmlFor="password" className="block mt-4">Mật khẩu:</label>
          <Field
            name="password"
            type="password"
            className="p-2 border border-gray-300 w-full text-black"
            id="password"
          />
          <ErrorMessage name="password" component="div" className="text-red-500" />

          <label htmlFor="confirmPassword" className="block mt-4">Nhập lại mật khẩu:</label>
          <Field
            name="confirmPassword"
            type="password"
            className="p-2 border border-gray-300 w-full text-black"
            id="confirmPassword"
          />
          <ErrorMessage name="confirmPassword" component="div" className="text-red-500" />

          <label htmlFor="avatar" className="block mt-4">Link ảnh đại diện (tùy chọn):</label>
          <Field
            name="avatar"
            type="text"
            className="p-2 border border-gray-300 w-full text-black"
            id="avatar"
            placeholder="Có thể để trống. Hệ thống sẽ tạo avatar tự động."
          />
          <ErrorMessage name="avatar" component="div" className="text-red-500" />

          <button type="submit" className="bg-blue-500 text-white p-2 block mt-4 w-full">
            Đăng ký
          </button>
          <Link href="/login">Đăng nhập</Link>
        </Form>
      )}
    </Formik>
  );
};

export default SignupForm;
