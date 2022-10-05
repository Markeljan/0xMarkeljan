import Head from "next/head";
import Layout, { siteTitle } from "../components/Layout";
import utilStyles from "../styles/utils.module.css";
import { IoIosRocket, IoLogoTwitter } from "react-icons/io";
import { AiFillInstagram } from "react-icons/ai";
import { useEffect } from "react";

export default function Home({ allPostsData }) {
  useEffect(() => {
    document.body.addEventListener("click", (event) => {
      if (event.target.id === "__next") {
        changeCursor("default");
      }
    });
  }, []);

  function changeCursor(cursorName) {
    if (cursorName === "default") {
      document.body.style.cursor = "default";
    } else {
      document.body.style.cursor = `url(/images/${cursorName}.svg) 64 64, default`;
    }
  }
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hey! I'm Mark, web3 developer and DeFi Maxi .</p>
        <p>
          My journey into crypto initially began in 2017 when my brother and I
          founded SokoMining
          <a
            className={utilStyles.darkButton}
            href="https://instagram.com/sokomining"
            target="_blank"
          >
            <AiFillInstagram />
          </a>
          . It has since been an exilerating ride. In 2020 I experienced DeFi
          Summer firsthand using protocols like{" "}
          <span
            className={utilStyles.aaveText}
            onMouseOver={() => changeCursor("aave")}
          >
            AAVE
          </span>{" "}
          as well as joining the{" "}
          <span
            className={utilStyles.avaxText}
            onMouseOver={() => changeCursor("avax")}
          >
            Avalanche
          </span>{" "}
          and{" "}
          <span
            className={utilStyles.fantomText}
            onMouseOver={() => changeCursor("fantom")}
          >
            Fantom
          </span>{" "}
          ecosystems. Realizing the power and opportunity in decentralized
          finance, I decided to become a web3 #BUIDLer. Currently I am at
          SoverignLabs
          <a
            className={utilStyles.darkButton}
            href="https://sovereignlabs.com"
            target="_blank"
          >
            <IoIosRocket />
          </a>{" "}
          with Alex Biet
          <a
            className={utilStyles.darkButton}
            href="https://twitter.com/alex_biet"
            target="_blank"
          >
            <IoLogoTwitter />
          </a>
          .
        </p>
      </section>
    </Layout>
  );
}
