// "use client";

// import { useActionState } from "react";
// import { uploadComment } from "./actions";

// export default function AddComment( ) {
//     const [state, action] = useActionState(uploadComment, null);
//     // const [state, action] = useActionState(
//     //     (formData: FormData) => uploadComment(tweetId, formData),
//     //     null
//     // );
//     return (
//         <form action={action}>
//             <textarea name="comment_txt"
//             className="w-full border border-1 border-solid border-gray-300 rounded-md focus:outline focus:outline-1 focus:outline-offset-2 focus:outline-gray-400 p-1 text-sm"/>        
//             <button>댓글추가</button>
//         </form>
//     )
// }