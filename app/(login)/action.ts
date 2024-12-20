"use server";

import {z} from "zod";

// 이메일은 "@zod.com"만 허용
const checkEmail = (email: string) => email.includes('@zod.com');

// 비밀번호는 반드시 1개 이상의 숫자 포함
const passwordRegex = new RegExp(
  /^(?=.*[0-9]).+$/
);

const formSchema = z.object({
  email: z.string().refine(checkEmail ,"Only @zod.com emails are allowed"),
  username: z.string()
              .min(5, "Username should be at least 5 characters long"),
  password: z.string()
              .min(10, "Password should be at least 10 characters long.")
              .regex(passwordRegex, "Password should contain at least one number (0123456789).")
  })
export async function handleForm(prevState: any, formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  // console.log('email', formData.get("email"),'username', formData.get("username"), 'password')

  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password")
  }

  const result = formSchema.safeParse(data);

  if(!result.success) {
    return {
      data: data, // To maintain form tag text initialization in NextJS15 version => defaultValue
      errors: result.error.flatten()
    }
  } else {
    return {
        data: result.data,
        success: "Welcome back!"
    }
  }
}