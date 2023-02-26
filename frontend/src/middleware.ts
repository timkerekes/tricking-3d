import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import type { NextRequest } from "next/server";
export async function middleware(request: NextRequest) {
  // Assume a "Cookie:nextjs=fast" header to be present on the incoming request
  // Getting cookies from the request using the `RequestCookies` API
  // const cookie = request.cookies.get("jwt")?.value;
  // console.log("cooki", cookie); // => 'fast'
  // // let secret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET);
  // // let decoded = await jwtVerify(cookie, secret, { algorithms: ["HS256"] });
  // console.log(cookie ? "loggedIn" : "NotLoggedIn");
  //   // Setting cookies on the response using the `ResponseCookies` API
  //   const response = NextResponse.next()
  //   response.cookies.set('vercel', 'fast')
  //   response.cookies.set({
  //     name: 'vercel',
  //     value: 'fast',
  //     path: '/test',
  //   })
  //   const cookie = response.cookies.get('vercel')
  //   console.log(cookie) // => { name: 'vercel', value: 'fast', Path: '/test' }
  //   // The outgoing response will have a `Set-Cookie:vercel=fast;path=/test` header.

  return NextResponse.next();
}
