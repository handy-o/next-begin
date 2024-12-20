"use server";
// SMS login 의 두 스텝
// 1. 유저에게 전화번호 input만 보여주고, token을 보냄
// 2. 그 다음 인증번호 input을 보여주고, 거기서 token을 인증
// 드디어 prevState를 사용!
// + npm i validator 설치



// 각각 검사할거라 object로 묶지 않아도 됨
import {z} from "zod"
import validator from "validator"  // typescript에서 type이 지정되지 않은 라이브러리 사용 시 누군가 다 적어놓은 npm i --save-dev @types/validator 를 추가로 실행

const phoneSchema = z.string().trim().refine(validator.isMobilePhone);
const tokenSchema = z.coerce.number().min(100000).max(999999)
// coerce(강제) => 유저가 입력한  string을 number로 변환 시도 (문자 쓰면 에러남)

export async function smsVerification(prevState: any, formData: FormData) {
    tokenSchema.parse(formData.get("token"))
    
}