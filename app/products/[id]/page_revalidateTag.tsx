import { notFound } from "next/navigation";
import db from "../../../lib/db";
import getSession from "../../../lib/session";
import Image from "next/image";
import { UserIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { formatToWon } from "../../../lib/utils";
import { unstable_cache as nextCache, revalidatePath, revalidateTag } from "next/cache";


async function getIsOwner(userId:number) {
    // const session = await getSession();
    // if(session.id){
    //     return session.id === userId; // 제품을 업로드한 유저와 같다면 true
    // }
    return false;
}

async function getProduct(id: number) {
    // fetch("https://api.com", {
    //     next: {
    //         revalidate:60,
    //         tags: ["hello"]
    //     }
    // })
    const product = await db.product.findUnique({
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
    // await new Promise(res => setTimeout(res, 1000))
    return product
}

const getCachedProduct = nextCache(getProduct, ["product-detail"], {
    tags: ["product-detail", "xxxx"],
});

async function getProductTitle(id: number) {
    //console.log("title");
    const product = await db.product.findUnique({
        where: {
            id,
        },
        select: {
            title: true,
        },
    });
    return product;
}

const getCachedProductTitle = nextCache(getProductTitle, ["product-title"], {
    tags: ["product-title", "xxxx"],
});

export async function generateMetadata({ params }: { params: { id: string } }) {
    const product = await getCachedProductTitle(Number(params.id));
    return {
      title: product?.title,
    };
}

export default async function ProductDetail({params} : {
    params: {id: string}
}) {
    const id = Number(params.id)
    if(isNaN(id)) notFound();
    const product = await getProduct(id);
    if(!product) notFound();

    const isOwner = await getIsOwner(product.userId);
    const revalidate = async () => {
        "use server";
        revalidateTag("xxxx");
    };
    return (
        <div className="pb-40">
            <div className="relative aspect-square">
                <Image fill src={product.photo} alt={product.title} className="object-cover"/>
            </div>
            <div className="p-5 flex items-center gap-3 border-b border-neutral-700">
                <div className="size-10 overflow-hidden rounded-full" >
                    {product.user.avatar !== null 
                        ? (
                        <Image src={product.user.avatar} width={40} height={40} alt={product.user.username}/>
                    )   : ( 
                        <UserIcon />
                    )}
                </div>
                <div>
                    <h3>{product.user.username}</h3>
                </div>
            </div>
            <div className="p-5">
                <h1 className="text-2xl font-semibold">{product.title}</h1>
                <p>{product.description}</p>
            </div>
            <div className="fixed w-full bottom-0 left-0 p-5 pb-10 bg-neutral-800 flex justify-between items-center">
                <span className="font-semibold text-xl">{formatToWon(product.price)}원</span>
                { isOwner 
                    ? <button className="bg-red-500 px-5 py-2.5 rounded-md text-white font-semibold">Delete product</button> 
                    : null 
                }
                <Link className="bg-orange-500 px-5 py-2.5 rounded-md text-white font-semibold" href={``}>채팅하기</Link>
            </div>
        </div>
    );
}
export async function generateStaticParams() {
    const products = await db.product.findMany({
      select: {
        id: true,
      },
    });
    return products.map((product) => ({ id: product.id + "" }));
  }