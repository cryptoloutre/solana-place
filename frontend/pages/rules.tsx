import type { NextPage } from "next";
import Head from "next/head";
import Rules from "../components/Rules";

const Home: NextPage = (props) => {
  return (
    <div className=" flex flex-col h-screen justify-between">
      <Head>
        <title>SolanaPlace</title>
        <meta name="description" content="SolanaPlace is the first on-chain pixel war on Solana" />
      </Head>
      <Rules />
    </div>
  );
};

export default Home;