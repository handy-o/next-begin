"use server";
import bcrypt from "bcrypt";
import {z} from "zod";
import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX } from "../../lib/constants"; // 소문자, 대문자, 숫자, 특수문자 일부를 모두 포함하는지 검사
import db from "../../lib/db";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


// 특정 단어 포함 여부 검증
// function checkUsername(username: string) {
//     return !username.includes("potato")
// }
// change arrow function
const checkUsername = (username: string) => !username.includes("potato")



// 비번 === 비번확인 검증
const checkPasswords = ({password, confirm_password}: {password:string, confirm_password:string}) => password === confirm_password

// check if username is taken
const checkUniqueUsername = async (username: string) => {
    const user = await db.user.findUnique({
        where: {
            username: username,
        },
        select: {
            id: true,
        }
    })
    // if(user) {
    //     return false
    // } else {
    //     return true
    // }
    return !Boolean(user)
}

// check if the email is already used
const checkUniqueEmail = async (email: string) => {
    const user = await db.user.findUnique({
        where: {
            email: email
        },
        select: {
            id: true,
        }
    })
    return !Boolean(user)
}

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
    .refine(checkUsername, "No potatoes allowed!")
    .refine(checkUniqueUsername, "This username is already taken"),

    email: z.string().email().toLowerCase().refine(checkUniqueEmail, "There is an account already registrated with that email"),
    password: z.string().min(PASSWORD_MIN_LENGTH)
    // .regex(PASSWORD_REGEX, "A password mush have lowercase, UPPERCASE, a number and special characters.")
    ,
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

     
        // #8.3  log the user in
        const cookieStore = await cookies();
        const cookie = await getIronSession(cookieStore, {
            cookieName: "delicious-carrot", 
            password: process.env.COOKIE_PASSWORD!
        })
        // @ts-ignore
        cookie.id = user.id // db의 user select된 id를 cookie.id에 넣어주고
        await cookie.save() // 저장
        // redirect "/home"
        redirect("/profile");
    }
}