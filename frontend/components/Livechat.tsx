import Title from "./Title";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
  Postbox,
  DispatchConnection,
  PostboxTarget,
} from "@usedispatch/client";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Connection, PublicKey } from "@solana/web3.js";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function Livechat() {
  const [message, setMessage] = useState<string>("");
  const dispatchConnection = new Connection("https://rpc.helius.xyz/?api-key=cc778adb-f9ab-45da-ba44-b4096f663c16")
  const wallet = useWallet();
  const { publicKey } = useWallet();
  const targetKey = new PublicKey(
    "Bmgzy9uhBVfeACPbaAHmHBMSmKnQZD3ecXD3VF5p5Qt5"
  );
  const target: PostboxTarget = { key: targetKey, str: "SolanaPlace chat" };
  const [posts, setPosts] = useState([]);
  const [fetchingPosts, setFetchingPosts] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const fetchPosts = async () => {
    if (publicKey) {
      setFetchingPosts(true);
      const dispatchConn = new DispatchConnection(dispatchConnection, wallet, {
        cluster: "mainnet-beta",
      });
      const postbox = new Postbox(dispatchConn, target);
      const topics = await postbox.fetchPosts();
      console.log(topics);
      setPosts(topics);
      setFetchingPosts(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [wallet]);

  const checkIfConnected = async () => {
    if (publicKey) {
      setIsConnected(true);
    } else {
      setIsConnected(false);
    }
  };

  useEffect(() => {
    checkIfConnected();
  }, [wallet]);

  const setRef = useCallback(node => {
    if (node) {
      node.scrollIntoView({ smooth: true })
    }
  }, [])
  
  const sendPost = async () => {
    if (publicKey) {
      const dispatchConn = new DispatchConnection(dispatchConnection, wallet, {
        cluster: "mainnet-beta",
      });
      const postbox = new Postbox(dispatchConn, target);
      if (message != "") {
        console.log("posting");
        const post = await postbox.createPost({ body: message });
        console.log(post);
        const topics = await postbox.fetchPosts();
        setPosts(topics);
        setMessage("");
      }
      // const initialize = await postbox.initialize()
      // console.log(initialize)
    }
  };
  return (
    <div className="flex flex-col items-stretch gap-8 px-4 pt-16 mx-auto w-[90%]">
      <main className="flex flex-col gap-2">
        <Title />

        <div className="flex items-center">
          <WalletMultiButton className="!bg-gray-900 hover:scale-105" />
        </div>
        <div className="flex">
          <Link href="/">
            <div className="text-xl uppercase font-bold mr-4 hover:cursor-pointer">
              Home
            </div>
          </Link>
          <Link href="/rules">
            <div className="text-xl uppercase font-bold hover:cursor-pointer">
              How to play
            </div>
          </Link>
        </div>

        <div className="flex justify-center">
          <h1 className="text-3xl font-bold">Live Chat</h1>
        </div>
        <div className="flex justify-center font-bold uppercase items-center">
          Powered By
          <a
            href="https://www.dispatch.forum/"
            target="_blank"
            rel="noreferrer"
          >
            <svg
              width="141"
              height="28"
              viewBox="0 0 141 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mx-4"
            >
              <path
                d="M6.16935 21.4695C4.44432 21.4883 3.02868 20.907 1.92241 19.7258C0.834887 18.5445 0.291128 16.7632 0.291128 14.3819C0.291128 12.6756 0.534882 11.2787 1.02239 10.1912C1.52865 9.1037 2.22241 8.30681 3.10368 7.80055C4.00369 7.27554 5.02558 7.01304 6.16935 7.01304C7.23812 7.01304 8.12876 7.23804 8.84128 7.68805C9.57254 8.11931 10.1819 8.69119 10.6694 9.4037H10.8101V3.04734H8.27877V1.19106H13.7632V21.1602H10.8101V18.7695H10.6694C10.2757 19.5945 9.70379 20.2508 8.95378 20.7383C8.22251 21.2258 7.29437 21.4695 6.16935 21.4695ZM10.8101 15.3944V11.1756C10.3038 10.4818 9.75067 9.95684 9.15066 9.60058C8.5694 9.22558 7.89438 9.03807 7.12562 9.03807C6.0006 9.03807 5.10996 9.3662 4.4537 10.0225C3.81619 10.66 3.49743 11.56 3.49743 12.7225V15.8163C3.49743 16.9413 3.81619 17.832 4.4537 18.4882C5.09121 19.1257 5.98185 19.4445 7.12562 19.4445C8.34439 19.4445 9.26316 19.0507 9.88192 18.2632C10.5007 17.4757 10.8101 16.5195 10.8101 15.3944ZM21.6522 7.32242V21.1602H18.7272V9.20683H16.1959V7.32242H21.6522ZM20.1897 3.89111C19.6834 3.89111 19.2522 3.72236 18.8959 3.38485C18.5397 3.02859 18.3615 2.57859 18.3615 2.03483C18.3615 1.50982 18.5397 1.07856 18.8959 0.741056C19.2522 0.384798 19.6834 0.20667 20.1897 0.20667C20.6959 0.20667 21.1272 0.384798 21.4835 0.741056C21.8585 1.07856 22.046 1.50982 22.046 2.03483C22.046 2.57859 21.8585 3.02859 21.4835 3.38485C21.1272 3.72236 20.6959 3.89111 20.1897 3.89111ZM31.1604 20.0914C32.2104 20.0914 33.0448 19.8758 33.6636 19.4445C34.3011 19.0132 34.6198 18.4226 34.6198 17.6726C34.6198 17.1101 34.4229 16.6788 34.0292 16.3788C33.6542 16.0601 33.0354 15.7976 32.1729 15.5913L29.6135 15.0007C28.2447 14.7007 27.2509 14.2225 26.6322 13.5663C26.0134 12.8913 25.704 12.0569 25.704 11.0631C25.704 9.84434 26.1728 8.85057 27.1103 8.08181C28.0478 7.29429 29.4354 6.90054 31.2729 6.90054C32.7542 6.90054 33.9073 7.06929 34.7323 7.40679C35.5761 7.7443 36.1667 8.16618 36.5042 8.67244C36.8417 9.1787 37.0105 9.67558 37.0105 10.1631C37.0105 10.5193 36.8886 10.8194 36.6449 11.0631C36.4198 11.3069 36.0636 11.4287 35.5761 11.4287C35.2573 11.4287 34.9854 11.3537 34.7604 11.2037C34.5354 11.035 34.4229 10.7912 34.4229 10.4725V10.1912C34.4229 9.68496 34.1886 9.27245 33.7198 8.9537C33.251 8.61619 32.501 8.44744 31.4698 8.44744C30.476 8.44744 29.7166 8.65369 29.1916 9.0662C28.6853 9.45996 28.4322 9.98496 28.4322 10.6412C28.4322 11.6162 29.1635 12.2631 30.626 12.5819L33.0167 13.1163C34.6104 13.4725 35.7355 13.9975 36.3917 14.6913C37.048 15.3663 37.3761 16.2288 37.3761 17.2788C37.3761 18.5164 36.8699 19.557 35.8573 20.4008C34.8636 21.2258 33.3448 21.6383 31.301 21.6383C29.8197 21.6383 28.6291 21.4695 27.7291 21.132C26.8291 20.7758 26.1728 20.3258 25.7603 19.782C25.3665 19.2195 25.1697 18.6289 25.1697 18.0101C25.1697 17.6913 25.2822 17.4101 25.5072 17.1663C25.7509 16.9038 26.1165 16.7726 26.6041 16.7726C26.9041 16.7726 27.1759 16.857 27.4197 17.0257C27.6822 17.1757 27.8135 17.4195 27.8135 17.757V18.0382C27.8135 18.657 28.076 19.1539 28.601 19.5289C29.126 19.9039 29.9791 20.0914 31.1604 20.0914ZM54.3305 14.3819C54.3305 16.782 53.7774 18.5632 52.6711 19.7258C51.5648 20.8883 50.1492 21.4695 48.4242 21.4695C47.2804 21.4695 46.3522 21.2352 45.6397 20.7664C44.9272 20.2976 44.3647 19.6789 43.9522 18.9101H43.8116L43.7835 26.8696H40.8584V9.20683H38.3271V7.32242H43.7835V9.51621H43.9241C44.4116 8.80369 45.0116 8.21306 45.7241 7.7443C46.4554 7.27554 47.3554 7.04116 48.4242 7.04116C50.1679 7.04116 51.5836 7.65055 52.6711 8.86932C53.7774 10.0693 54.3305 11.9069 54.3305 14.3819ZM43.7835 15.4226C43.7835 16.5476 44.0928 17.5038 44.7116 18.2914C45.3304 19.0601 46.2491 19.4445 47.4679 19.4445C48.5929 19.4445 49.4742 19.1164 50.1117 18.4601C50.7679 17.8038 51.0961 16.8945 51.0961 15.7319V12.7506C51.0961 11.6256 50.7679 10.735 50.1117 10.0787C49.4742 9.4037 48.6023 9.0662 47.496 9.0662C46.7085 9.0662 46.0241 9.2537 45.4429 9.62871C44.8616 10.0037 44.3085 10.5287 43.7835 11.2037V15.4226ZM66.2663 19.332H66.0975C65.6475 19.9883 65.0381 20.5226 64.2693 20.9352C63.5193 21.3477 62.6006 21.5539 61.5131 21.5539C59.9193 21.5539 58.6911 21.1789 57.8286 20.4289C56.9661 19.6601 56.5348 18.6382 56.5348 17.3632C56.5348 16.0319 56.9942 15.0101 57.913 14.2975C58.8318 13.5663 60.1162 13.2006 61.7662 13.2006C62.5162 13.2006 63.2287 13.2756 63.9037 13.4256C64.5787 13.5569 65.235 13.7444 65.8725 13.9882V11.6537C65.8725 10.6412 65.6194 9.87246 65.1131 9.34745C64.6069 8.82244 63.7818 8.55994 62.6381 8.55994C61.8131 8.55994 61.1662 8.72869 60.6974 9.0662C60.2474 9.38495 60.0224 9.82559 60.0224 10.3881V10.7256C60.0224 11.5131 59.563 11.9069 58.6443 11.9069C57.7442 11.9069 57.2942 11.4287 57.2942 10.4725C57.2942 9.49746 57.7536 8.66307 58.6724 7.9693C59.5911 7.25679 60.9318 6.90054 62.6943 6.90054C64.7944 6.90054 66.3413 7.34117 67.335 8.22243C68.3288 9.1037 68.8257 10.4162 68.8257 12.16V17.4195C68.8257 18.1507 68.9288 18.657 69.1351 18.9382C69.3413 19.2195 69.6319 19.3414 70.0069 19.3039L71.3007 19.1914V20.8227L67.4194 21.3852C66.8569 20.8602 66.4725 20.1758 66.2663 19.332ZM59.5724 17.8413C59.5724 18.4226 59.7974 18.9007 60.2474 19.2757C60.6974 19.6508 61.3724 19.8383 62.2724 19.8383C63.285 19.8383 64.1381 19.5664 64.8319 19.0226C65.5256 18.4601 65.8725 17.6445 65.8725 16.5757V15.3101C65.3287 15.0663 64.7662 14.8788 64.185 14.7475C63.6037 14.6163 63.0037 14.5507 62.3849 14.5507C61.4474 14.5507 60.7443 14.7288 60.2755 15.0851C59.8068 15.4413 59.5724 15.9476 59.5724 16.6038V17.8413ZM77.2003 21.5539C75.9815 21.5539 75.0533 21.2352 74.4158 20.5976C73.7783 19.9414 73.4596 19.0414 73.4596 17.8976V9.20683H70.9283V7.32242H72.1939C72.7939 7.32242 73.2627 7.22867 73.6002 7.04116C73.9377 6.83491 74.1815 6.41303 74.3315 5.77552C74.4815 5.11926 74.5846 4.13486 74.6408 2.82234H76.3846V7.32242H80.2097V9.20683H76.3846V17.6445C76.3846 18.207 76.5252 18.6664 76.8065 19.0226C77.1065 19.3789 77.519 19.557 78.044 19.557C78.7565 19.557 79.4128 19.3883 80.0128 19.0507L80.4347 20.457C80.0034 20.8133 79.5159 21.0852 78.9722 21.2727C78.4472 21.4602 77.8565 21.5539 77.2003 21.5539ZM88.5377 6.90054C89.9252 6.90054 91.0315 7.12554 91.8565 7.57555C92.7003 8.02556 93.3096 8.59744 93.6847 9.2912C94.0597 9.96621 94.2472 10.6412 94.2472 11.3162C94.2472 11.785 94.1159 12.16 93.8534 12.4413C93.6097 12.7225 93.2253 12.8631 92.7003 12.8631C92.344 12.8631 92.044 12.76 91.8002 12.5538C91.5752 12.3475 91.4627 12.0287 91.4627 11.5975V10.9225C91.4627 10.285 91.2377 9.75058 90.7877 9.31933C90.3565 8.88807 89.644 8.67244 88.6502 8.67244C87.5627 8.67244 86.6533 8.98182 85.922 9.60058C85.1908 10.2193 84.8251 11.0256 84.8251 12.0194V16.2663C84.8251 17.3351 85.1908 18.1976 85.922 18.8539C86.672 19.4914 87.572 19.8101 88.6221 19.8101C89.5783 19.8101 90.3658 19.5945 90.9846 19.1632C91.6034 18.7132 92.1284 18.0289 92.5596 17.1101L94.219 17.7288C93.694 19.0414 92.944 20.0164 91.969 20.6539C91.0127 21.2727 89.8596 21.582 88.5096 21.582C87.122 21.582 85.9126 21.2914 84.8814 20.7101C83.8501 20.1289 83.0438 19.2945 82.4626 18.207C81.9001 17.1007 81.6188 15.7882 81.6188 14.2694C81.6188 12.7506 81.9001 11.4381 82.4626 10.3318C83.0438 9.22558 83.8501 8.38181 84.8814 7.80055C85.9314 7.20054 87.1502 6.90054 88.5377 6.90054ZM97.5919 21.1602V3.04734H95.0887V1.19106H100.545V9.43183H100.686C101.248 8.70057 101.923 8.11931 102.711 7.68805C103.517 7.23804 104.426 7.01304 105.439 7.01304C106.489 7.01304 107.351 7.23804 108.026 7.68805C108.701 8.11931 109.198 8.70994 109.517 9.45996C109.855 10.1912 110.023 11.0162 110.023 11.935V19.2757H112.527V21.1602H107.07V12.3006C107.07 11.1944 106.855 10.3975 106.423 9.90996C105.992 9.4037 105.289 9.15057 104.314 9.15057C103.564 9.15057 102.879 9.3287 102.261 9.68496C101.661 10.0225 101.089 10.5006 100.545 11.1194V21.1602H97.5919Z"
                fill="#2E008B"
              ></path>
              <circle
                cx="128.885"
                cy="12.6439"
                r="12.1156"
                fill="#2E008B"
              ></circle>
              <path
                d="M125.423 24.2577C123.509 23.6883 121.794 22.6589 120.405 21.2979H125.423V24.2577Z"
                fill="#7173B9"
              ></path>
              <path
                d="M125.423 21.298H132.342C133.298 21.298 134.073 20.5235 134.073 19.5672C134.073 18.611 133.298 17.8364 132.342 17.8364H127.154C126.197 17.8364 125.423 18.611 125.423 19.5672V21.298Z"
                fill="#397BAD"
              ></path>
              <path
                d="M117.935 17.8361C117.424 16.7601 117.066 15.5967 116.892 14.3745H125.423V16.1053C125.423 17.0616 124.648 17.8361 123.692 17.8361H117.935Z"
                fill="#FEA39A"
              ></path>
              <path
                d="M127.154 10.9131H135.808C136.764 10.9131 137.538 11.6876 137.538 12.6439C137.538 13.6002 136.764 14.3747 135.808 14.3747H125.423V12.6439C125.423 11.6876 126.197 10.9131 127.154 10.9131Z"
                fill="#FB7616"
              ></path>
              <path
                d="M116.892 10.9133C117.066 9.69106 117.424 8.52771 117.935 7.45166H125.423V9.18246C125.423 10.1387 124.648 10.9133 123.692 10.9133H116.892Z"
                fill="#F8D55D"
              ></path>
              <path
                d="M125.423 7.45134H132.342C133.298 7.45134 134.073 6.67681 134.073 5.72054C134.073 4.76428 133.298 3.98975 132.342 3.98975H127.154C126.197 3.98975 125.423 4.76428 125.423 5.72054V7.45134Z"
                fill="#FFB549"
              ></path>
            </svg>
          </a>
        </div>
        {isConnected && !fetchingPosts && (
          <div className="rounded-lg mx-auto mt-2 border-2 border-black h-[650px] w-[300px] sm:w-[590px] overflow-auto shadow-xl">
            {posts.map((e, index) => {
              const lastPost = posts.length - 1 === index
              const message = e.data.body;
              const _poster = e.poster.toBase58();
              let poster;
              poster = _poster.slice(0, 4) + "..." + _poster.slice(-4);
              if (publicKey) {
                if (publicKey.toBase58() == _poster) {
                  poster = "You";
                }
              }
              const time = e.data.ts.toGMTString();

              return (
                publicKey &&
                (wallet.publicKey.toBase58() == _poster ? (
                  <div className="flex justify-end" key={index} ref={lastPost ? setRef : null}>
                    <div className="mx-4 my-4 ">
                      <div className="text-xs ml-2 text-right">{time}</div>
                      <div className="text-white rounded-xl bg-[#122345] w-[250px] px-2 py-2">
                        <div>{message}</div>
                        <div className="text-xs mt-2 text-[#cecece] text-right">
                          From {poster}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="mx-4 my-4" key={index} ref={lastPost ? setRef : null}>
                    <div className="text-xs ml-2">{time}</div>
                    <div className="text-white rounded-xl bg-black w-[250px] px-2 py-2">
                      <div>{message}</div>
                      <div className="text-xs mt-2 text-[#cecece]">
                        From {poster}
                      </div>
                    </div>
                  </div>
                ))
              );
            })}
          </div>
        )}
        {!isConnected && (
          <div className="rounded-lg mx-auto mt-2 border-2 border-black h-[650px] w-[300px] sm:w-[590px] overflow-auto shadow-xl">
            <div className="flex justify-center h-[640px] items-center">
              <div className="font-bold text-lg">Connect your wallet!</div>
            </div>
          </div>
        )}

        {isConnected && fetchingPosts && (
          <div className="rounded-lg mx-auto mt-2 border-2 border-black h-[650px] w-[300px] sm:w-[590px] overflow-auto shadow-xl">
            <div className="flex justify-center h-[640px] items-center">
              <div className="font-bold text-lg">
                <svg
                  role="status"
                  className="inline mr-3 w-4 h-4 text-black animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
                Fetching messages
              </div>
            </div>
          </div>
        )}

        {isConnected ? (
          <div className="flex justify-center my-2">
            <div className="border-2 rounded-lg border-black w-[270px] sm:w-[510px] h-[40px] flex ">
              <input
                className="rounded-lg w-[270px] sm:w-[510px] pl-2"
                type="text"
                value={message}
                placeholder="Type your message"
                onChange={(e) => setMessage(e.target.value)}
              ></input>
            </div>
            <button
              className="bg-black text-white uppercase font-bold px-4 rounded-xl ml-2"
              onClick={sendPost}
            >
              Send
            </button>
          </div>
        ) : (
          <div className="flex justify-center my-2">
            <div className="border-2 rounded-lg border-black w-[270px] sm:w-[510px] h-[40px] flex hover:cursor-not-allowed items-center">
              <div className="rounded-lg w-[270px] sm:w-[510px] pl-2">
                Type your message
              </div>
            </div>
            <button className="bg-black text-white uppercase font-bold px-4 rounded-xl ml-2 hover:cursor-not-allowed">
              Send
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
