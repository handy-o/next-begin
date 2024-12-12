import { API_URL } from "../../page";
import { Suspense } from "react";
import { numToBillion } from "../../../utils/numToBillion";
import styles from "../../../styles/person_detail.module.css";

// fetch data
interface IParams {
    params : {id: string}
}
export async function getDetail(id: string) {
    const res = await fetch(`${API_URL}/person/${id}`);
    return res.json();
}

// dynamic metadata
export async function generateMetadata({params: {id}} : IParams) {
    const gotDetail = await getDetail(id)
    return {
        title: gotDetail.id + ' | Billions',
    }
}

// cont
export default async function BillionDetail({params: {id}} : IParams) {
    const gotDetail = await getDetail(id);

    return (
        <div className={styles.person_detail}>
            <Suspense fallback={<h4>Loading detail..</h4>}>
                <img src={gotDetail.squareImage} alt={gotDetail.name}  />
                <h3> {gotDetail.name} </h3>
                <ul>
                    <li>Networth: {numToBillion(gotDetail.netWorth)} Billion </li>
                    <li>Country: {gotDetail.country}</li>
                    <li>Industry: {gotDetail.industries[0]} </li>
                </ul>

                <p>
                    {gotDetail.bio.map( (item, idx) => { 
                        return ( 
                            <span key={idx}>{item}</span>
                        )
                    })}
                </p>
            </Suspense>
        </div>
    )
}