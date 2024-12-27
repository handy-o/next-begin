"use client";

import { InitialProducts } from "@/(tabs)/products/page";
import ListProduct from "./list-product";
import { useState } from "react";
import { getMoreProducts } from "@/(tabs)/products/actions";

interface ProductListProps {
    initialProducts: InitialProducts
}
export default function ProductList( {initialProducts}: ProductListProps) {
    // 첫 로드 시 '/product' 에서 제공한 InitialProducts로 products가 초기화 됨
    const [products, setProducts] = useState(initialProducts);
    const [isLoading, setIsLoading] = useState(false)
    const [page, setPage] = useState(0);
    const [isLastPage, setIsLastPage] = useState(false);
    const onLoadMoreClick = async() => {
        setIsLoading(true);
        const newProducts = await getMoreProducts(page+1);  // 받고
        if(newProducts.length !== 0) { // 새상품이 더 있을 때에만
            setPage((prev) => prev + 1); 
            setProducts(prev => [...prev, ...newProducts]); // 머지 (모두 array로 받기 때문에 ...로 펼침)
        } else {
            setIsLastPage(true);
        }
        setIsLoading(false)
    }
    return (
         <div className="p-5 flex flex-col gap-5">
            {products.map((product) => (
                <ListProduct key={product.id} {...product} />
            ))}
            {/* 유저가 클릭하면 상품 데이터 추가 */}
            {isLastPage ? null : (
                <button 
                    onClick={onLoadMoreClick} 
                    disabled={isLoading}
                    className="text-sm font-semibold bg-orange-500 w-fit mx-auto px-3 py-2 rounded-md hover:opacity-90 active:scale-95">
                    {isLoading ? "로딩 중" : "Load more"}
                </button>
            )}
        </div>
    )
}