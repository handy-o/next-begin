
import { Prisma } from "@prisma/client";
import ProductList from "../../../components/product-list";
import db from "../../../lib/db"
async function getInitialProducts() {
    const products = await db.product.findMany({
        select: {
            title: true,
            price: true,
            created_at: true,
            photo: true,
            id: true
        },
        take:1, // 하나의 항목만 가져옴
        orderBy: {
            created_at: "desc", // "asc" 오름차순 | "desc" 내림차순
        }
    })
    return products
}

export type InitialProducts = Prisma.PromiseReturnType<typeof getInitialProducts>;

export default async function Products() {
    const initialProducts = await getInitialProducts();
    return (
        <ProductList initialProducts={initialProducts}/>
    )
}