

// import {z} from "zod";
// import getSession from "../../lib/session";
// import db from "../../lib/db";

// const commentSchema = z.object({
//     comment_txt: z.string({
//         required_error: "comment is required",
//     }),
// })

// export async function uploadComment(_:any, formData: FormData) {
//     const tweetId = Number(formData.get("tweetId"));
//     const data = {
//         comment_txt: formData.get("comment_txt")
//     }
//     console.log('댓글', data);
    
//     const result = commentSchema.safeParse(data);
//     if(!result.success) {
//         return result.error.flatten();
//     } else {
//         const session = await getSession();
//         if(session.id) {
//             await db.comment.create({
//                 data: {
//                     comment_txt: result.data.comment_txt,
//                     payload: result.data.comment_txt,
//                     user :{
//                         connect :{
//                             id: session.id
//                         }
//                     },
//                     tweet: {
//                         connect: {
//                             id: tweetId
//                         }
//                     }
//                 },
//                 select: {
//                     id: true,
//                 },
//             })
//         }
//     }
// }

