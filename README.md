# 12/20(금) 과제

### 목표
1. Zod 를 활용하여 server action의 form 을 검증
2. 검증이 성공적이면 성공 메시지를 아닐 경우 에러를 유저에게 표기
3. 검증 제약 조건
    - 오직 "@zod.com" 이메일만 허용 된다.
    - 유저명은 5 글자 이상이어야 한다.
    - 비밀번호는 10 글자 이상이어야 하며, 반드시 1개 이상의 숫자를 포함해야 한다.


### 특이사항
1. input에 입력한 값들이 사라집니다.
    - 원인: NextJs 15버전 이상에서의 form 동작 방식에 의해 초기화된다고 보았습니다.
    - 생각한 방안: if(!result.success) 로 return해 주는 값에 'data'를 추가하여 state로 받아온 값을 defaultValue에 넣어주었습니다. 

2. useFormState가 useActionState 로 변경되었습니다.
    - 8~9일차에서도 useFormState를 못쓰고 useActionState로 사용했습니다.
    - import { useFormState } from "react-dom";
    - import { useActionState } from "react";

--------

### 강의
- #6.0 ~ #6.9


