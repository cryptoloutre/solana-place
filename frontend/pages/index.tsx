import ColorSelector from "../components/ColorSelector";
import Title from "../components/Title";
import { Color, colors } from "../lib/colors";
import { useMemo, useState } from "react";
import Canvas from "../components/Canvas";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import {
  AnchorWallet,
  useAnchorWallet,
  useConnection,
} from "@solana/wallet-adapter-react";
import { AnchorProvider, BN, Program } from "@project-serum/anchor";
import { SolPlace, IDL } from "../idl/sol_place";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import PlayerPixelCounter from "../components/PlayerPixelCounter";
import Powered from "../components/Powered";
import Footer from "../components/Footer";
import Greeting from "../components/Greeting";

export default function Home() {
  const [selectedColor, setSelectedColor] = useState<Color>(colors[0]);

  const { connection } = useConnection();

  const anchorWallet: AnchorWallet | undefined = useAnchorWallet();

  const anchorProvider: AnchorProvider | undefined = useMemo(() => {
    if (anchorWallet) {
      return new AnchorProvider(connection, anchorWallet, {
        commitment: "confirmed",
      });
    } else {
      return undefined;
    }
  }, [connection, anchorWallet]);

  const programId = new PublicKey(
    "Bmgzy9uhBVfeACPbaAHmHBMSmKnQZD3ecXD3VF5p5Qt5"
  );

  const anchorProgram: Program<SolPlace> | undefined = useMemo(() => {
    if (anchorProvider) {
      return new Program(IDL, programId, anchorProvider);
    } else {
      return undefined;
    }
  }, [anchorProvider]);

  return (
    <div className="flex flex-col items-stretch gap-8 px-4 pt-16 mx-auto max-w-max">
      <main className="flex flex-col gap-4">
        <Title />

        <div className="basis-1/4 flex items-center">
          <WalletMultiButton className="!bg-gray-900 hover:scale-105" />
          <PlayerPixelCounter program={anchorProgram} />
        </div>

        <ColorSelector
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />

        <Canvas program={anchorProgram} selectedColor={selectedColor} />

        <Powered />
        <Footer />
        <Greeting />
      </main>
    </div>
  );
}
