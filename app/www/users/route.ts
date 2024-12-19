import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    console.log(request);
    // localhost:3000/www/users 접속 시 json 반환
    // GET을 써주면 된다. (GET과 POST 구분할 필요 없이 )
    return Response.json({
        ok: true,
    })
}

export async function POST(request: NextRequest) {
    const data = await request.json();
    console.log("log the user in!!!");
    return Response.json(data);
  }