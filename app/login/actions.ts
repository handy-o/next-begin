"use server";

export async function handleForm(prevState: any, formData: FormData) {
  console.log(prevState);
  // if(preveState === null) { 
	//   //send msg
	//   return { 
	// 	  msg: true
	//   }
  // } 
  // if( msg === true) {
	//   // check token
	//   return {
	// 	  ok: redirect
	//   }
  // }

  await new Promise((resolve) => setTimeout(resolve, 5000));
  return {
    errors: ["wrong password", "password too short"],
  };
}