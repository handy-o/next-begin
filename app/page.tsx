"use client";

import { useActionState } from "react";
import { handleForm } from "./(login)/action";
import FormInput from "../components/form-input";
import FormButton from "../components/form-btn";

import { FireIcon } from "@heroicons/react/24/solid";
import { EnvelopeIcon } from "@heroicons/react/24/solid";
import { UserIcon } from "@heroicons/react/24/solid";
import { KeyIcon } from "@heroicons/react/24/solid";




export default function Home() {
   const [state, action] = useActionState(handleForm, null);
    return (
        <main className="w-80 *:box-border p-2 m-auto mt-6">
            <h1 className="text-center mb-8"><FireIcon className="m-auto h-10 w-10 text-red-500" /></h1>

            <section>
                <form action={action} className="flex flex-col gap-4 text-sm">
                    <div className="relative">
                        <EnvelopeIcon className="absolute left-4 top-[9px] h-4 w-4 text-gray-500" />
                        <FormInput name="email" type="text" placeholder="Email" required errors={[]} />
                    </div>
                    <div className="relative">
                        <UserIcon  className="absolute left-4 top-[9px] h-4 w-4 text-gray-500" />
                        <FormInput name="username" type="text" placeholder="Username" required errors={[]} />
                    </div>
                    <div className="relative">
                        <KeyIcon   className="absolute left-4 top-[9px] h-4 w-4 text-gray-500" />
                        <FormInput name="password" type="text" placeholder="Password" required errors={state?.errors ?? []} />
                    </div>
        
                    <FormButton text="Log in"/>

                    {
                       state?.success ? <p className="bg-green-400 rounded-md px-4 py-2 font-bold text-gray-800">{state?.success} </p> : null
                    }
                </form>

            </section>
        </main>
    ) 
}