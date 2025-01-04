"use client";

import Button from "../../../components/button";
import Input from "../../../components/input";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { getUploadUrl, uploadProduct } from "./actions";
import { useFormState } from "react-dom";

export default function AddProduct() {
    const [preview, setPreview] = useState("");
    const [uploadUrl, setUploadUrl] = useState("");
    const [imageId, setImageId] = useState("");
    const onImageChange = async (event:React.ChangeEvent<HTMLInputElement>) => {   
        const {
            target: {files},
        } = event;
        if(!files) return;
        const file = files[0];
        const urll = URL.createObjectURL(file); // URL을 생성하는 브라우저 API -> URL은 이 파일이 업로드된 메모리를 참조        
        setPreview(urll);
        
        const {success, result} = await getUploadUrl();
        if(success) {
            const {id, uploadUrl} = result; 
            setUploadUrl(uploadUrl);
            setImageId(id);
        }
    }
    const interceptAction = async (_:any, formData:FormData) => {
        // upload image to cloudflare
        const file = formData.get("photo");
        if(!file) return 
        const cloudflareForm = new FormData();
        cloudflareForm.append("file", file!);
        const response = await fetch(uploadUrl, {
            method: "post",
            body: cloudflareForm
        })
        if(response.status !== 200) {
            return;
        }

        // replate 'photo' in formData (copy 'my delivery URL' in cloudflare site)
        const photoUrl = `https://imagedelivery.net/lsdkmfdslfk-adlkfjsd/${imageId}`;
        formData.set('photo', photoUrl)

        // call upload product
        return uploadProduct(_, formData)
    }
    const [state, action] = useFormState(interceptAction, null);
    return (
        <div>
            <form action={action} className="p-5 flex flex-col gap-5">
                <label
                htmlFor="photo"
                className="border-2 aspect-square flex items-center justify-center flex-col text-neutral-300 border-neutral-300 rounded-md border-dashed cursor-pointer bg-center bg-cover"
                style={{
                    backgroundImage: `url(${preview})`
                }}
                >
                {preview === "" ? (
                    <>
                    <PhotoIcon className="w-20" />
                    <div className="text-neutral-400 text-sm">
                        사진을 추가해주세요.  
                        {/* 혹 사진에 오류가 있을 경우 */}
                        {state?.fieldErrors.photo} 
                    </div>
                    </>
                ) : null}
                </label>
                <input
                onChange={onImageChange}
                type="file"
                id="photo"
                name="photo"
                accept="image/*"
                className="hidden"
                />
                <Input name="title" required placeholder="제목" type="text" errors={state?.fieldErrors.title}/>
                <Input name="price" type="number" required placeholder="가격" errors={state?.fieldErrors.price}/>
                <Input
                name="description"
                type="text"
                required
                placeholder="자세한 설명"
                errors={state?.fieldErrors.description}/>
                <Button text="작성 완료" />
            </form>
        </div>
    )
}