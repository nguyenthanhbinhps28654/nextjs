'use client';
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const SignupForm = () => {
  // Schema để xác thực dữ liệu đầu vào
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
    password: Yup.string()
      .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
      .required('Vui lòng nhập mật khẩu'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Mật khẩu không khớp')
      .required('Vui lòng nhập lại mật khẩu'),
  });

  // Hàm xử lý submit
  const handleSubmit = async (values: { email: string; password: string; confirmPassword: string }) => {
    const { email, password } = values;
    console.log('User registered:', { email, password });
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form className="container mx-auto max-w-sm">
          <label htmlFor="email" className="block">Email:</label>
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

          <button type="submit" className="bg-blue-500 text-white p-2 block mt-4 w-full">
            Đăng ký
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SignupForm;
