"use server";
import {z} from "zod";
import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX } from "../../lib/constants"; // 소문자, 대문자, 숫자, 특수문자 일부를 모두 포함하는지 검사


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
    })
    .min(3,"Way too short")
    .max(10, "That's too long!")
    .toLowerCase()
    .trim()
    // .transform(username => `바꿀문자 ${username}`)
    .refine(checkUsername, "No potatoes allowed!"),
    email: z.string().email().toLowerCase(),
    password: z.string().min(PASSWORD_MIN_LENGTH).regex(PASSWORD_REGEX, "A password mush have lowercase, UPPERCASE, a number and special characters."),
    confirm_password: z.string().min(PASSWORD_MIN_LENGTH)
})
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

    const result = formSchema.safeParse(data);
    if(!result.success) {
        console.log('result.error.flatten', result.error.flatten())
        return result.error.flatten();
    } else {
        console.log(result.data)
    }
}