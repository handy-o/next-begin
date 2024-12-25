"use server";
import bcrypt from "bcrypt";
import {z} from "zod";
import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX } from "../../lib/constants"; // 소문자, 대문자, 숫자, 특수문자 일부를 모두 포함하는지 검사
import db from "../../lib/db";
import { redirect } from "next/navigation";
import getSession from "../../lib/session";


// 특정 단어 포함 여부 검증
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
    .refine(checkUsername, "No potatoes allowed!"),

    email: z.string().email().toLowerCase(),
    password: z.string().min(PASSWORD_MIN_LENGTH)
    // .regex(PASSWORD_REGEX, "A password mush have lowercase, UPPERCASE, a number and special characters.")
    ,
    confirm_password: z.string().min(PASSWORD_MIN_LENGTH)
})
.superRefine(async ({username}, ctx) => {
    const user = await db.user.findUnique({
        where: {
            username
        },
        select: {
            id: true
        }
    })
    if(user) {
        ctx.addIssue({
            // issue에는 code가 필요하다
            code: 'custom',
            message: "This username is already exist" ,
            // 이 에러메세지는 formErrors로 이동했음 
            // 왜냐하면 zod는 왜 원인인지 모름
            // => 화면에 보여지는 작업 해줘야함 path로 알려줌
            path: ["username"],
            fatal: true // fatal과 NEVER이 있으면 다른 refine이 있어도, 멈추고 더 실행되지않음
        })
        return z.NEVER;
    }
})
.superRefine(async ({email}, ctx) => {
    const user = await db.user.findUnique({
        where: {
            email
        },
        select: {
            id: true
        }
    })
    if(user) {
        ctx.addIssue({
            code: 'custom',
            message: "This email is already exist" ,
            path: ["email"],
            fatal: true 
        })
        return z.NEVER;
    }
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
    //console.log('data', data)

    const result = await formSchema.safeParseAsync(data);
    console.log('result', result)
    if(!result.success) {
        console.log('result.error.flatten', result.error.flatten())
        return result.error.flatten();
    } else {
        // #8.2  hash password
        const hashedPassword = await bcrypt.hash(result.data.password, 12);
        // save the user to db
        const user = await db.user.create({
            data : {
                username: result.data.username,
                email: result.data.email,
                password: hashedPassword
            },
            select :{ // 필요한 것만 db에서 받아오기 
                id: true
            }
        })

     
        const session = await getSession()
        session.id = user.id // id?여서 에러 안남
        await session.save() // 저장
        // redirect "/home"
        redirect("/profile");
    }
}