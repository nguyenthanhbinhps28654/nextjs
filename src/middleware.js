import { NextResponse } from 'next/server';

export async function middleware(request) {
  // Lấy thông tin người dùng từ cookies (giả định cookies chứa thông tin người dùng đã đăng nhập)
  const user = request.cookies.get('user')?.value;

  // Kiểm tra xem người dùng có tồn tại trong cookies và có phải là admin không
  if (!user) {
    // Nếu người dùng không đăng nhập, chuyển hướng về trang đăng nhập và logout
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('user'); // Xóa cookie user để logout
    return response;
  }

  // Giả định user có thông tin role trong cookie, nếu không có role là admin sẽ bị chặn
  const userData = JSON.parse(user);
  if (userData.role !== 'admin') {
    // Nếu không phải là admin, chuyển về trang home
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Nếu người dùng hợp lệ (đã đăng nhập và là admin), cho phép tiếp tục truy cập
  return NextResponse.next();
}

export const config = {
  matcher: ['/cms', '/cms/product'], // Áp dụng middleware cho các đường dẫn cần bảo vệ
};
