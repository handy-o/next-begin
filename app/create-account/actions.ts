"use server";
import {z} from "zod";


// 특정 단어 포함 여부 검증
// function checkUsername(username: string) {
//     return !username.includes("potato")
// }
// change arrow function
const checkUsername = (username: string) => !username.includes("potato")


// 비번 === 비번확인 검증
const checkPasswords = ({password, confirm_password}: {password:string, confirm_password:string}) => password === confirm_password

// 조건 스키마
const formSchema = z.object({
    username: z.string({
        invalid_type_error: "Username must be a string!",
        required_error: "Where is my Username?"
    }).min(3,"Way too short").max(10, "That's too long!")
    // .refine((username) => false, "custom error"),
    // .refine((username) => username.includes("potato") ? false : true, "No potatoes allowed!"),
    // .refine((username) => !username.includes("potato"), "No potatoes allowed!"),
    .refine(checkUsername, "No potatoes allowed!"),
    email: z.string().email(),
    password: z.string().min(10),
    confirm_password: z.string().min(10)
})
// .refine(checkPasswords, "Both passwords should be the same!") //z.object 모두 검증

// 하지만 이렇게 작성하면 form에 나타나지 않음
// 어디에 에러를 표시할까?
// 정답은..! zod가 특정 필드에 적용되는게 아닌, 전체에 적용했기 때문에 form 전체에 대한 에러라 생각한다. 
// => 정확하게 알려주어야 함!!!
// 그렇게 하려면,  refine의 메세지를 object로 만들어서 path를 지정해줌

.refine(checkPasswords, {
    message : "Both passwords should be the same!",
    path: ["confirm_password"]
})

export async function createAccount(prevState:any, formData: FormData) {
    const data = {
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
        confirm_password: formData.get("confirm_password"),
    }
    // console.log('data', data)

    // parse method에 데이터 넣어 Zod가 Schema를 보고 형태에 맞는지 검사
    // 1. parse - error throw 하여 try catch로 감싸주어야함
    // try{
    //     formSchema.parse(data); 
    // } catch (e) {
    //     console.log(e)
    // }
    //2. safeParse - error throw 하지 않음
    const result = formSchema.safeParse(data);
    if(!result.success) {
        console.log('result.error.flatten', result.error.flatten())
        return result.error.flatten();
    }
}