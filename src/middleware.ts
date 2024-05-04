// // middleware.ts
// import { NextRequest, NextResponse } from 'next/server';

// export function middleware(req: NextRequest) {
//   const token = req.cookies.get('token')?.value;

//   if (token) {
//     // Token exists, allow the request
//     return NextResponse.next();
//   } else {
//     // Token doesn't exist, redirect to the login page
//     return NextResponse.rewrite(new URL('/Login', req.url));
//   }
//   // return NextResponse.redirect(new URL('/Login', req.url))
  
//   // if (token) {
//   //   // Có token, cho phép truy cập trang chủ
//   //   if (req.nextUrl.pathname === '/') {
//   //     return NextResponse.next();
//   //   }

//   //   // Nếu không phải trang chủ, chuyển hướng đến trang chủ
//   //   return NextResponse.redirect(new URL('/', req.url));
//   // }

//   // // Không có token, chuyển hướng đến trang đăng nhập
//   // if (req.nextUrl.pathname === '/Login') {
//   //   return NextResponse.next();
//   // }

//   // return NextResponse.redirect(new URL('/Login', req.url));
// }


// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - api (API routes)
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      */
//     '/((?!api|_next/static|_next/image|favicon.ico).*)',
//   ],
// };

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  const url =request.nextUrl.clone()
  let isLogin = request.cookies.get("logged")
  console.log(isLogin);
  if(isLogin){
    if (request.nextUrl.pathname.startsWith('/Login')) {
      return NextResponse.redirect(new URL('/', request.url))
    }
    else if(request.nextUrl.pathname.startsWith('/Register')){
      return NextResponse.redirect(new URL('/', request.url))
    }
  }else{
    if (request.nextUrl.pathname.startsWith('/Login')) {
      return NextResponse.rewrite(new URL('/Login', request.url))
    }
    else if (request.nextUrl.pathname.startsWith('/Register')){
      return NextResponse.rewrite(new URL('/Register', request.url))
    }
  }
 
 

}

// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// export function middleware(request: NextRequest) {
//   const url = request.nextUrl.clone()
//   let isLogin = request.cookies.get("logged")
//   console.log(isLogin);
//   if (isLogin) {
//     if (request.nextUrl.pathname.startsWith('/Login')) {
//       return NextResponse.redirect(new URL('/', request.url))
//     } else if (request.nextUrl.pathname.startsWith('/Register')) {
//       return NextResponse.redirect(new URL('/', request.url))
//     }
//   } else {
//     if (request.nextUrl.pathname.startsWith('/Login')) {
//       return NextResponse.redirect(new URL('/Login', request.url))
//     } else if (request.nextUrl.pathname.startsWith('/Register')) {
//       return NextResponse.redirect(new URL('/Register', request.url))
//     }
//   }
// }