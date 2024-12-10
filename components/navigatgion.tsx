"use client";
import Link from "next/link";
import { usePathname } from "next/navigation"; 
//url 정보를 알려주는 hook = usePathname 는 "use client"; 필요


import styles from "../styles/navigation.module.css";

export default function Navigation() {
    const path = usePathname();
    return (
        <nav className={styles.nav}>
            <ul>
                <li><Link href="/">Home</Link>{path === "/" ? "🏝️": "" }</li>
                <li><Link href="/about-us">About Us {path === "/about-us" ? "🦑": "" }</Link></li>
            </ul>
        </nav>
    )
}