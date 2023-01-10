import { Program } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";
import { useEffect, useState } from "react";
import { SolPlace } from "../idl/sol_place";

interface Props {
  program?: Program<SolPlace>;
}

interface PixelPlayedChangedEvent {
  pixel_played: number;
}

export default function PlayerPixelCounter({ program }: Props) {
  const [countPixelPlayed, setCountPixelPlayed] = useState<number>(0);

  const getPlayerAddress = () => {
    const [playerPublicKey] = PublicKey.findProgramAddressSync(
      [Buffer.from("player"), program.provider.publicKey.toBuffer()],
      program.programId
    );
    return playerPublicKey;
  };
  const fetchPlayerInfo = async () => {
    if (program) {
      const playerAddress = getPlayerAddress();
      const playerInfo = await program.account.player.fetch(playerAddress);
      setCountPixelPlayed(playerInfo.pixelPlayedCount);
    } else {
      setCountPixelPlayed(0);
    }
  };

  useEffect(() => {
    fetchPlayerInfo();
  }, [program]);

  // Listen to PixelPlayed events
  useEffect(() => {
    if (!program) return;

    const listener = program.addEventListener(
      "PixelPlayedChanged",
      async (event, _slot, _sig) => {
        const e = event as PixelPlayedChangedEvent;
        console.log("player played");
        // Get the latest data from Anchor for this player
        const playerAddress = getPlayerAddress();
        const playerInfo = await program.account.player.fetch(playerAddress);
        setCountPixelPlayed(playerInfo.pixelPlayedCount);
      }
    );

    return () => {
      program.removeEventListener(listener);
    };
  }, [program]);

  return (
    <div>
      <h2 className="ml-4">
        You have played <strong>{countPixelPlayed}</strong> pixel(s)!
      </h2>
    </div>
  );
}
