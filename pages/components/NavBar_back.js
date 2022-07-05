import Link from 'next/link'
import { Router, useRouter } from 'next/router'
import styles from "./NavBar.module.css"

export default function NavBar() {
    const router = useRouter();
    // console.log(Router);
    return (
        <nav className={styles.nav}>
            <Link href="/">
                <a style={{ color: router.pathname === '/' ? "red" : "black" }}>Home</a>
            </Link>

            <Link href="/about">
                <a className={router.pathname === '/about' ? styles.active : ""}>About</a>
            </Link>

            <Link href="/about">
                <a className={
                    `${styles.link} ${router.pathname === '/about' ? styles.active : ""} `
                }>About</a>
            </Link>
            <Link href="/about">
                <a className={
                    [styles.link, router.pathname === '/about' ? styles.active : ""].join(" ")
                }>About</a>
            </Link>
            <style jsx>{`
                nav {
                    background: lightgreen;
                }
                .active {
                    color: purple;
                   
                }
            `}</style>

            <Link href="/">
                <a className={router.pathname === '/' ? "active" : ""}>HomeActive</a>
            </Link>
        </nav>
    )

}