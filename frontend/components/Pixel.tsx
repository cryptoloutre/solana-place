import { IdlAccounts, Program } from "@project-serum/anchor";
import { useConnection } from "@solana/wallet-adapter-react";
import {
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import { SolPlace } from "../idl/sol_place";
import { Color } from "../lib/colors";

type PixelAccount = IdlAccounts<SolPlace>["pixel"];

interface Props {
  posX: number;
  posY: number;
  program: Program<SolPlace>;
  pixelData?: PixelAccount;
  selectedColor: Color;
}

export default function Pixel({
  posX,
  posY,
  program,
  pixelData,
  selectedColor,
}: Props) {
  const { colR, colG, colB } = pixelData || {};
  const color = pixelData ? `rgb(${colR}, ${colG}, ${colB})` : "white";
  const { connection } = useConnection();

  const getPixelAddress = () => {
    const [pixelPublicKey] = PublicKey.findProgramAddressSync(
      [Buffer.from("pixel"), Buffer.from([posX, posY])],
      program.programId
    );
    return pixelPublicKey;
  };

  const getVaultAddress = () => {
    const [vaultPublicKey] = PublicKey.findProgramAddressSync(
      [Buffer.from("vault")],
      program.programId
    );
    return vaultPublicKey;
  };

  const getPlayerAddress = () => {
    const [playerPublicKey] = PublicKey.findProgramAddressSync(
      [Buffer.from("player"), program.provider.publicKey.toBuffer()],
      program.programId
    );
    return playerPublicKey;
  };

  const createPixel = async () => {
    const Tx = new Transaction();
    const playerAddress = getPlayerAddress();
    const playerAccountInfo = await connection.getAccountInfo(playerAddress);
    if (playerAccountInfo == null) {
      const initPlayerIx = await program.methods
        .initializePlayer()
        .accounts({
          initializer: program.provider.publicKey,
          player: playerAddress,
          systemProgram: SystemProgram.programId,
        })
        .instruction();
      Tx.add(initPlayerIx);
    }
    const playPixelIx = await program.methods
      .createPixel(
        posX,
        posY,
        selectedColor.r,
        selectedColor.g,
        selectedColor.b
      )
      .accounts({
        pixel: getPixelAddress(),
        user: program.provider.publicKey,
        vault: getVaultAddress(),
        player: playerAddress,
        systemProgram: SystemProgram.programId,
      })
      .instruction();
    Tx.add(playPixelIx);
    const signature = await program.provider.sendAndConfirm(Tx);
    console.log("success: ", signature);
  };

  const updatePixel = async () => {
    const Tx = new Transaction();
    const playerAddress = getPlayerAddress();
    const playerAccountInfo = await connection.getAccountInfo(playerAddress);
    if (playerAccountInfo == null) {
      const initPlayerIx = await program.methods
        .initializePlayer()
        .accounts({
          initializer: program.provider.publicKey,
          player: playerAddress,
          systemProgram: SystemProgram.programId,
        })
        .instruction();
      Tx.add(initPlayerIx);
    }
    const updatePixelIx = await program.methods
      .updatePixel(selectedColor.r, selectedColor.g, selectedColor.b)
      .accounts({
        pixel: getPixelAddress(),
        user: program.provider.publicKey,
        vault: getVaultAddress(),
        player: playerAddress,
        systemProgram: SystemProgram.programId,
      })
      .instruction();
    Tx.add(updatePixelIx);
    const signature = await program.provider.sendAndConfirm(Tx);
    console.log("success: ", signature);
  };

  return (
    <td
      className="h-4 min-w-[1rem]"
      style={{ backgroundColor: color }}
      onClick={pixelData ? updatePixel : createPixel}
    />
  );
}
