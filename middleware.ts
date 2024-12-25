import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/session";

interface Routes {
    [key:string] : boolean;
}
// array보다 object가 검색이 좀더 빠름
const publicOnlyUrls: Routes = {
    "/": true,
    "/log-in": true,
    "/sms" : true,
    "/create-account" : true
}

export async function middleware(request: NextRequest) {
    const session = await getSession();
    // const exists = publicOnlyUrls["/log-in"]; 
    const exists = publicOnlyUrls[request.nextUrl.pathname]; // object에 값이 있는지 체크하는게 배열검색보다 빠름
    
    if(!session.id) { // 비로그인 상태인데,
        if(!exists) { // publicUrl이 아닌 곳에 접속한 경우 허용하지않고 redirect 필요
            return NextResponse.redirect(new URL("/", request.url))
        } 
    } else { // 로그인이 이미 된 상태인데,
        if(exists) { // 퍼블릭한 페이지로 접속한다면 /profile 이동
            return NextResponse.redirect(new URL("/profile", request.url))
        }
    }
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico|logo.svg).*)"]
}