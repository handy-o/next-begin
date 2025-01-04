import { notFound } from "next/navigation";
import db from "../../../lib/db";
import Image from "next/image";
import { toLocaleDateStr, toLocaleTimeStr } from "../../../lib/utils";
import Link from "next/link";

async function getTweet(id: number) {
    const tweet = await db.tweet.findUnique({
        where: {
            id
        },
        include: {
            user: {
                select: {
                    username: true,
                    avatar: true
                }
            }
        }
    })
    return tweet
}



export default async function tweetDetail({params} : {
    params: {id: string}
}) {
    console.log('params',  params)
    const id = Number(params.id);
    if(isNaN(id)) notFound();
    const tweet = await getTweet(id);
    if(!tweet) notFound();

    return (
        <main className="mt-16 px-6">
            <div className="flex gap-4 border-b-solid border-b-2 pb-5">
                <div className="flex flex-col gap-3">
                    <div className="flex gap-2 align-middle">
                        <p className="rounded-xl overflow-hidden">
                            <Image src={tweet.user.avatar} alt={tweet.user.username} width={40} height={40}/>
                        </p>
                        <p><b>{tweet.user.username}</b></p>
                    </div>
                    <p>{tweet.contents_txt}</p>
                    <p className="relative size-full">
                        <Image src={tweet.contents_img} alt={"img"} className="object-cover"
                        layout="responsive" width={100} height={100}  />
                    </p>
                    <p className="text-sm text-neutral-600">
                        {toLocaleTimeStr(tweet.updated_at)} {toLocaleDateStr(tweet.updated_at)}
                    </p>
                </div>
            </div>
            <div>
                <Link href="/">목록으로</Link>
            </div>
        </main>
    );
}