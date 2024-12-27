import Image from "next/image";
import Link from "next/link";
import { formatToTimeAgo, formatToWon } from "../lib/utils";

interface ListProductProps{
    title: string;
    price: number;
    created_at: Date;
    photo: string;
    id: number;
}
export default function ListProduct({
    title,
    price,
    created_at,
    photo,
    id
} : ListProductProps) {
    return (
        <Link href={`/products/${id}`} className="flex gap-5">
            <div className="relative size-28 rounded-md overflow-hidden">
                {/* <Image width={200} height={200} src={photo} alt={title}/>  */}
                <Image fill src={photo} alt={title} quality={100} className="object-cover"/> 
                {/* <img> 보다 <Image> 컴포넌트를 권장 */}
            </div>
            <div className="flex flex-col gap-1 *:text-white">
                <span className="text-lg">{title}</span>
                <span className="text-sm text-neutral-500">{formatToTimeAgo(created_at.toString())}</span>
                <span className="text-lg font-semibold">{formatToWon(price)}</span>
            </div>
        </Link>
    )
}