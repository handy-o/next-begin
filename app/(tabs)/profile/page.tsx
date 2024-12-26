import { notFound, redirect } from "next/navigation";
import getSession from "../../../lib/session";
import db from "../../../lib/db";

async function getUser() {
    const session = await getSession();
    if (session.id) {
        const user = await db.user.findUnique({
            where: {
                id: session.id
            }
        })
        if(user) {
            return user;
        }
    }
    notFound(); // next/navigation에서 불러올 수 있음
}

export default async function Profile() {
    // 유저 정보 가져오기
    const user = await getUser();
    const logOut = async () => {
        "use server"; // inline server action
        const session = await getSession();
        await session.destroy();
        redirect("/")
    }
    return (
        <div>
             <h1>Welcome! {user?.username}  to your profile</h1>
             
             <form action={logOut}>
                <button>Log Out</button>
                {/* 또는 인풋 사용해서 만들 수 있지만 button을 사용해서 만드는게 더 좋은 방법이다. */}
                {/* <input type="submit" value="Log out" /> */}
             </form>
        </div>
    )
}