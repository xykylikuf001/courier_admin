import Link from "@/components/Link";
import styles from './page.module.css'

export default function Home() {
    return (
        <main className={styles.main}>
            <div className={styles.description}>
                <p>
                    Hello this is your admin panel!
                </p>
            </div>

            <div className={styles.center}>
                Hello
            </div>

            <div className={styles.grid}>
                <Link
                    href="/auth/sign-in/"
                    className={styles.card}
                    noLinkStyle={true}
                >
                    <h2>
                        Sign-In <span>-&gt;</span>
                    </h2>
                    <p>Sign-in with your credentials.</p>
                </Link>

                <Link
                    href="/dashboard/"
                    className={styles.card}
                    noLinkStyle={true}
                >
                    <h2>
                        Dashboard <span>-&gt;</span>
                    </h2>
                    <p>See your dashboard!</p>
                </Link>
            </div>
        </main>
    )
}
