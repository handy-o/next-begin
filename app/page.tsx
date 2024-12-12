
import Link from "next/link";
import styles from "../styles/home.module.css";
import { numToBillion } from "../utils/numToBillion";
import { API_URL } from "./constants";


async function getBillions() {
    const res = await fetch(API_URL);
    const json = await res.json();
    return json;
}


export default async function Home() {
    const billions = await getBillions();
    return (
        <div className={styles.home}>
            {/* <h1>I'm Home</h1> */}
            {/* {JSON.stringify(billions)} */}
            <ul>
                {billions.map((billion) =>{
                    return ( 
                        <li key={billion.id}>
                            <Link href={`/person/${billion.id}`}>
                                <img src={billion.squareImage} alt="" />
                                <dl>
                                    <dt>{billion.name}</dt>
                                    <dd>
                                        {numToBillion(billion.netWorth)} Bilion
                                        | {billion.industries}
                                        </dd>
                                </dl>
                            </Link>
                        </li>
                    )
                })}
                
            </ul>
        </div>
    ) 
}