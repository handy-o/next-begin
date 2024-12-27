"use client";

import { InitialProducts } from "@/(tabs)/products/page";
import ListProduct from "./list-product";
import { useEffect, useRef, useState } from "react";
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
    const trigger = useRef<HTMLSpanElement>(null); 

    useEffect(()=> {
        // page가 변경되면 실행될 함수
        // trigger 감지 - user가 trigger를 보면 trigger를 observe하다가 trigger 관찰을 중단, page를 증가시키면 다시 이 코드가 실행
        // observer 생성
        // * entries는 observe 할 수 있는 많은 item들의 배열
        const observer = new IntersectionObserver(
            async (
                entries: IntersectionObserverEntry[],
                observer: IntersectionObserver
              )  => {
                const element = entries[0];
                if(element.isIntersecting && trigger.current){
                    observer.unobserve(trigger.current)
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
                console.log('entries', entries[0].isIntersecting)
            },
            {
                threshold: 1.0, // 얼만큼 보여야 true로 할지 0.5 절반만 보여도 true, (0~1)
                rootMargin: "0px 0px -100px 0px", // IntersectionObserver가 보고 있는 container에 margin 설정
            }
        )
        if(trigger.current) {
            observer.observe(trigger.current) // 다시 트리거링
        }
        // cleanup function (unmount)
        return () => {
            observer.disconnect();
        }
    }, [page])

    return (
         <div className="p-5 flex flex-col gap-5">
            {products.map((product) => (
                <ListProduct key={product.id} {...product} />
            ))}

            {/* 무한 스크롤링으로 변경 */}
            {!isLastPage ?
            <span 
                ref={trigger}
                style={{marginTop: `${page + 1 * 300}vh`}} // 데이터가 적어서 임시로 설정
                className="mb-96 text-sm font-semibold bg-orange-500 w-fit mx-auto px-3 py-2 rounded-md hover:opacity-90 active:scale-95">
                {isLoading ? "로딩 중" : "Load more"}
            </span>
            : null  }
        </div>
    )
}