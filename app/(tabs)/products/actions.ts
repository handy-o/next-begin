"use server";

import db from "../../../lib/db";

export async function getMoreProducts(page:number) {
    const products = await db.product.findMany({
        select: {
            title: true,
            price: true,
            created_at: true,
            photo: true,
            id: true
        },
        skip: page * 1, // 첫번째꺼 뛰어넘어서 두번째꺼부터 가져오기
        take:1, // 하나의 항목만 가져옴

        // 25개씩 부른다고 하면, 아래처럼 설정
        // skip: page * 25,
        // take: 25 
        
        orderBy: {
            created_at: "desc", // "asc" 오름차순 | "desc" 내림차순
        }
    })
    return products
}