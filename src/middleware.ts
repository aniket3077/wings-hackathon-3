import axios from "axios";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {USERID} from "@/app/login/page"

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
//   const userid = async () => {
//     const res = await axios.get(`${process.env.DOMAIN}/api/users/me`);
//     console.log(res.data.data._id);
//     return res.data.data._id;
//     //   return "";
//   };
  const isPublicPath =
    path === "/login" || path === "/createacc" || path === "/verifyemail";

  const token = request.cookies.get("token")?.value || "";
  if (isPublicPath && token) {
    // console.log(USERID +"Hl")
    return NextResponse.redirect(new URL(`/profile`, request.nextUrl));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/profile", "/login", "/createacc", "/verifyemail"],
};
