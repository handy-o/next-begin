import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface SessionContent {
    id?:number  // 로그인한 사용자에게만 id가 있기 때문에  ? 
}

export default async function getSession() {
    //console.log(cookies()); // 콘솔에서 쿠키 확인 가능
    return getIronSession<SessionContent>(await cookies(), {
        cookieName: "delicious-carrot", 
        password: process.env.COOKIE_PASSWORD!
    })
}