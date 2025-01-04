"use server";

import bcrypt from "bcrypt"
import {z} from "zod";
import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX } from "../../../lib/constants";
import db from "../../../lib/db"
import getSession from "../../../lib/session";
import { redirect } from "next/navigation";

const checkEmailExists = async (email:string) => {
  const user = await db.user.findUnique({
    where: {
      email: email
    },
    select: {
      id: true
    }
  })
  return Boolean(user)
}

const formSchema = z.object({
  email: z.string().email().toLowerCase()
        .refine(checkEmailExists, "이 이메일을 사용하는 계정이 존재하지 않습니다."),
  password: z.string()
  // .min(PASSWORD_MIN_LENGTH)
  // .regex(PASSWORD_REGEX)
})

export async function login(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password")
  }
  const result = await formSchema.spa(data); // safeParseAsync
  if(!result.success) {
    return result.error.flatten();
  } else {
    const user = await db.user.findUnique({
      where: {
        email: result.data.email
      },
      select: {
        id: true,
        password: true
      }
    })
    const ok = await bcrypt.compare(result.data.password, user!.password ?? ""); // user가 password를 가지지 않는다면, 빈 문자와 비교
    //console.log('ok', ok)
    if(ok) {
      // 세션 가져오기
      const session = await getSession();
      session.id = user!.id;
      await session.save();
      redirect("/profile")
    } else {
      return {
        fieldErrors : {  // zod인 척 에러 보내기
          password: ["Wrong Password"],
          email: []
        }
      }
    }
    // 사용자가 찾아졌을 때만, 비밀번호의 해시값을 확인 if the user is found, check password hash
    // redirect "profile"
  }
}