"use client";

import FormButton from "@/components/button";
import FormInput from "@/components/input";
import SocialLogin from "@/components/social-login";
import { useActionState } from "react";
import { login } from "./actions";
import { PASSWORD_MIN_LENGTH } from "../../lib/constants";

export default function LogIn() {
  const [state, action] = useActionState(login, null);

  // 기존 백엔드 작업
  // const onClick = async () => {
  //   const response = await fetch("/www/users", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       username: "noco",
  //       password: "1234"
  //     })
  //   })
  //   console.log(await response.json())
  // }

  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Log in with email and password.</h2>
      </div>
      <form action={action} className="flex flex-col gap-3">
        <FormInput
          name="email"
          type="email"
          placeholder="email"
          errors={state?.fieldErrors.email ?? []}
        />
        <FormInput
          name="password"
          type="password"
          placeholder="Password"
          required
          errors={state?.fieldErrors.password ?? []}
          minLength={PASSWORD_MIN_LENGTH}
        />
        <FormButton text="Log in" />
      </form>
      <SocialLogin />
    </div>
  );
}