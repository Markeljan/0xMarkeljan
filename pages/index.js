import Head from "next/head";
import Layout, { siteTitle } from "../components/Layout";
import utilStyles from "../styles/utils.module.css";
import { IoIosRocket, IoLogoTwitter } from "react-icons/io";
import { AiFillInstagram } from "react-icons/ai";
import { useEffect } from "react";
import changeCursor from "../components/changeCursor";

export default function Home({}) {
  useEffect(() => {
    document.body.style.cursor = `url(/images/avatar.svg) 32 32, default`;
  }, []);
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hey! I'm Mark, web3 developer and DeFi Maxi .</p>
        <p>
          My journey into crypto initially began in 2017 when my brother and I founded SokoMining
          <a
            className={utilStyles.darkButton}
            href="https://instagram.com/sokomining"
            target="_blank"
          >
            <AiFillInstagram />
          </a>
          . It has since been an exilerating ride. In 2020 I experienced DeFi Summer firsthand using
          protocols like <span className={utilStyles.aaveText}>AAVE</span> as well as joining the{" "}
          <span className={utilStyles.avaxText}>Avalanche</span> and{" "}
          <span className={utilStyles.fantomText}>Fantom</span> ecosystems. Realizing the power and
          opportunity in decentralized finance, I decided to become a web3 #BUIDLer. Currently I am
          at SovereignLabs
          <a className={utilStyles.darkButton} href="https://sovereignlabs.com" target="_blank">
            <IoIosRocket />
          </a>{" "}
          with Alex Biet
          <a className={utilStyles.darkButton} href="https://twitter.com/alex_biet" target="_blank">
            <IoLogoTwitter />
          </a>
          .
        </p>
        <p>For more info please take a look at my Resume PDF above.</p>
      </section>
    </Layout>
  );
}
