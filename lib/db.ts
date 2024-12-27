import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
    const users = await db.user.findMany();
    // console.log('users', users);
  }
  main();
async function test2() {
    // const token = await db.sMSToken.create({
    //     data: {
    //         token: "123123",
    //         user: {
    //             connect: {
    //                 id: 1
    //             }
    //         }
    //     }
    // })
    const token = await db.sMSToken.findUnique({
        where: {
           id: 1
        },
        include : {
          user: true  
        }
    })
    //console.log('findUnique', token)
}
//test2()


async function test(){
    // 생성
    const user = await db.user.create({
        data: { 
            username: "lala",
            phone: "123123123",
        }
    })
    console.log(user)

    // 찾기
    const users = await db.user.findMany({
        where: { 
            username: {
                contains : "la"
            },
        }
    })
    console.log(user)
}
// test();

export default db;