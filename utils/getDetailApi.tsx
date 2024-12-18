import { API_URL } from "../app/constants";

export const getDetail = async function(id:string) {
    const res = await fetch(`${API_URL}/person/${id}`);
    return res.json();
}
