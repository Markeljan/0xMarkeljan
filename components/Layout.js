import Head from "next/head";
import Image from "next/image";
import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import { IoLogoGithub, IoLogoTwitter } from "react-icons/io";
import { MdPictureAsPdf } from "react-icons/md";

const name = "0xMarkeljan";
export const siteTitle = "Markeljan Portfolio Site";

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <Image
              priority
              src="/images/avatar.png"
              className={utilStyles.borderCircle}
              height={144}
              width={144}
              alt=""
            />
            <h1 className={utilStyles.heading2XlThin}>
              0x<span className={utilStyles.heading2Xl}>Mark</span>eljan{" "}
              <a
                className={utilStyles.darkButton}
                href="https://github.com/Markeljan"
                target="_blank"
              >
                <IoLogoGithub />
              </a>
              <a
                className={utilStyles.darkButton}
                href="https://twitter.com/0xMarkeljan"
                target="_blank"
              >
                <IoLogoTwitter />
              </a>
              <a
                className={utilStyles.darkButton}
                href="/0xMarkeljanResume.pdf"
                target="_blank"
              >
                <MdPictureAsPdf />
              </a>
            </h1>
          </>
        ) : (
          <>
            <Link href="/">
              <a>
                <Image
                  priority
                  src="/images/avatar.png"
                  className={utilStyles.borderCircle}
                  height={108}
                  width={108}
                  alt=""
                />
              </a>
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/">
                <a className={utilStyles.colorInherit}>{name}</a>
              </Link>
            </h2>
          </>
        )}
        <p className={utilStyles.subHead}>
          <a
            className={utilStyles.darkButton}
            href="https://deOracle.xyz"
            target={"_blank"}
          >
            deOracle
          </a>
          {" | "}
          <a
            className={utilStyles.darkButton}
            href="https://wallet.sh"
            target={"_blank"}
          >
            Smart Wallet
          </a>
          {" | "}
          <a
            className={utilStyles.darkButton}
            href="https://astarcreators.com"
            target={"_blank"}
          >
            Astar Creators
          </a>{" "}
          {" | "}
          <a
            className={utilStyles.darkButton}
            href="https://devpost.com/software/dex-arbitrage"
            target={"_blank"}
          >
            NFT Word Wall
          </a>
        </p>
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  );
}
