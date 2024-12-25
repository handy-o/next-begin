# 12/24~25(화~수) 과제

### npm 설치

1. npm install bcrypt - bcrypt 설치
2. npm install @types/bcrypt - bcrypt types
3. npm install iron-session - iron-session 설치

### 관련 링크

1. https://www.youtube.com/watch?v=67UwxR3ts2E - 해시함수
2. https://www.youtube.com/watch?v=tosLBcAX1vk - 세션vs토큰vs쿠키
3. https://1password.com/password-generator - 비번생성

---

### 강의

- #8.0 ~ #8.13

### 특이사항 기록

#### 1. await cookies()

##### 원인! 비동기 실행에서 Next의 cookies()는 읽을 수 있는 요소로 리턴되어야하는데, await 없이는 Promise가 반환되어서 타입에 맞지 않음

1-1. 에러남 cookies()

```
const cookie = await getIronSession(cookies(), { ~~ } )
```

1-2. 에러 안남 await cookies()

```
const cookie = await getIronSession(await cookies(), { ~~ } )
```

#### 2. 테스트계정

- username : abcde (5글자 이상)
- email : abcde@zod.com (@zod만 허용)
- password : 123qweasd1 (10글자 이상)
