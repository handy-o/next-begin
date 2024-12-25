import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import getSession from "./lib/session";
import db from "./lib/db";

export async function middleware(request: NextRequest) { // 이름은 꼭 middleware
    const pathname = request.nextUrl.pathname;
    if(pathname === "/") {
        // set cookie
        const response = NextResponse.next(); // request 가로채서 
        response.cookies.set("middleware-cookie", "hello!") // 정보를 추가하여 수정한 뒤에
        return response; // 그 request를 user에게 제공
    }
    if(pathname  === "/profile") {
        return Response.redirect(new URL("/", request.url))
    }

    // await db.user.findMany({}); // Edge runtime 이슈로 실행되지 않고 서버 에러 발생

}


// 이름은 꼭 config 
export const config = {
    matcher: ["/", "/profile", "/create-account", "/user/:path*"]
    // matcher: ["/((?!api|_next/static|_next/image|favicon.ico|logo.svg).*)"]
}