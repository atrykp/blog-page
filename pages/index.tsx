import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>YourBlog</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome in Your Blog page</h1>

        <Link href="./about">check about me page</Link>
      </main>

      <footer className={styles.footer}>
        <p>welcome</p>
      </footer>
    </div>
  );
};

export default Home;
