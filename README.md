# 12/23(월) 과제

### npm 설치

1. npm install prisma - 프리즈마 설치
2. npx prisma init - prisma > schema.prisma 파일 생성
3. npx prisma migrate dev - npx prisma generate도 같이 실행되어 create Client
4. npx prisma studio - 시각화

---

### 강의

- #7.0 ~ #7.6

### 특이사항 기록

#### 1. lib > db.ts

1-1. 에러 안남 db.tweet

```
const newTweet = await db.tweet.create({
    data: {
        token: "123124",
        user: {
        connect: {
            id: 2,
        },
        },
    },
});
```

1-2. 에러남 db.like

```
const newTweet = await db.like.create({
    data: {
        token: "123124",
        user: {
        connect: {
            id: 2,
        },
        },
    },
});
```

#### 원인! like 모델에는 userId와 tweetId가 필수로 들어가야한다.

```
const newTweet = await db.like.create({
    data: {
        token: "123124",
        user: {
            connect: {
                id: 2,
            },
        },
        tweet: {             // 해결!
            connect: {
                id: 2
            },
        },
    },
});
```

#### 2. `.env`

gitignore에 포함되어서 보이지 않음
하지만 학습용이니 필요한 부분만 적자면,,
`DATABASE_URL="file:./database.db"`
