import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import getSession from "./lib/session";

export async function middleware(request: NextRequest) {
    // url 읽기
    // console.log('Hi im middleware')
    // console.log('request.url', request.url)
    // console.log(request.nextUrl.pathname)

    if(request.nextUrl.pathname === "/profile") {
        // return Response.json({ // fetch API의 Response
        //     error: "you are not allowed here!" 
        // }) 

        // return Response.redirect("/") // 으로만 하면 절대경로로 생각하고 에러가 발생
        return Response.redirect(new URL("/", request.url))
    }
    
    // 쿠키 읽기 
    // console.log(request.cookies.getAll());
    // const session = await getSession();
    // console.log(session)
}