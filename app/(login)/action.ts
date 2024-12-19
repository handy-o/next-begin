"use server";

export async function handleForm(prevState: any, formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  console.log('email', formData.get("email"),'username', formData.get("username"), 'password')

  if(formData.get("password") !== "1234") {
    return {
        errors: ["wrong password!"],
        prevEmail : formData.get("email"),
        prevUsername : formData.get("username"),
        prevPassword : formData.get("password")
      };
  } else {
    return {
        success: "Welcome back!"
    }
  }
}