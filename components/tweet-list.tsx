"use client";

import Image from "next/image";
import { InitialTweets } from "../app/page"
import { toLocaleDateStr } from "../lib/utils";
import Link from "next/link";

interface TweetListProps {
    initialTweets: InitialTweets
}

export default function TweetList({initialTweets}: TweetListProps) {
    console.log("initialTweetsssssssss", initialTweets)
    return (
            <div className="p-5 flex flex-col gap-5">
                {initialTweets.map((tweet) => (
                    <Link  key={tweet.id}  href={`/tweet/${tweet.id}`} className="flex gap-5" >
                        <div className="flex gap-4 border-b-solid border-b-2 pb-5">
                            <p className="rounded-xl overflow-hidden">
                                <Image src={tweet.user.avatar} alt={tweet.user.username} width={40} height={40}/>
                            </p>
                            <div className="flex flex-col gap-1">
                                <div className="flex gap-2 align-middle">
                                    <p><b>{tweet.user.username}</b></p>
                                    <p className="text-sm text-neutral-600">{toLocaleDateStr(tweet.updated_at)}</p>
                                </div>
                                
                                <p>{tweet.contents_txt}</p>
                                <p className="relative size-full">
                                    <Image src={tweet.contents_img} alt={"img"} className="object-cover"
                                    layout="responsive" width={100} height={100}  />
                            </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
    )
}