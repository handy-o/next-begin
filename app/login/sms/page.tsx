"use client";

import Input from "../../components/input";
import Button from "../../components/button";
import SocialLogin from "@/components/social-login";
import { useActionState } from "react";
import { smsVerification } from "./actions";

const initialState = {
  token: false,
  error: undefined,
}

export default function SMSLogin() {
  // const [state, dispatch] = useActionState(smsVerification, null); // null == initial state == prevState
  const [state, dispatch] = useActionState(smsVerification, initialState); // null을 수정
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">SMS Login!</h1>
        <h2 className="text-xl">Verify your phone number.</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        
        <Input 
          name="phone"
          type="text" 
          placeholder="Phone number"
          required
          errors={state.error?.formErrors}
          />
          {
            state.token ? (<Input 
              name="token"
              type="number" 
              placeholder="Verification code"
              required
              min={100000}
              max={999999}
              />) : null
          }
        
        
        <Button text={state?.token ? 'Verify' : "Send Verification SMS"} />
      </form>
      <SocialLogin/>
    </div>
  );
}