import { IdlAccounts, Program } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";
import clsx from "clsx";
import { useEffect, useState, useMemo } from "react";
import { SolPlace } from "../idl/sol_place";
import { Color } from "../lib/colors";
import Pixel from "./Pixel";

interface Props {
  program?: Program<SolPlace>;
  selectedColor: Color;
}

type PixelAccount = IdlAccounts<SolPlace>["pixel"];

interface PixelChangedEvent {
  posX: number;
  posY: number;
  colR: number;
  colG: number;
  colB: number;
}

export default function Canvas({ program, selectedColor }: Props) {
  const disabled = !program;
  const [fetchedPixels, setFetchedPixels] = useState<PixelAccount[]>([]);

  const fetchPixels = async () => {
    if (program) {
      const pixels = await program.account.pixel.all();
      console.log("got the pixels!", pixels);
      setFetchedPixels(pixels.map((p) => p.account));
    }
  };

  useEffect(() => {
    fetchPixels();
  }, [program]);

  const pixelsMap = useMemo(() => {
    const map: { [id: number]: PixelAccount } = {};
    fetchedPixels.forEach((p) => {
      const id = p.posY * 100 + p.posX;
      map[id] = p;
    });
    return map;
  }, [fetchedPixels]);

  const getPixelAddress = (posX: number, posY: number) => {
    const [pixelPublicKey] = PublicKey.findProgramAddressSync(
      [Buffer.from("pixel"), Buffer.from([posX, posY])],
      program.programId
    );
    return pixelPublicKey;
  };

  // Listen to PixelChanged events
  useEffect(() => {
    if (!program) return;

    const listener = program.addEventListener(
      "PixelChanged",
      async (event, _slot, _sig) => {
        console.log("Pixel changed");
        const e = event as PixelChangedEvent;
        // Get the latest data from Anchor for this pixel
        const pixelAddress = await getPixelAddress(e.posX, e.posY);
        const updatedPixelAccount = await program.account.pixel.fetch(
          pixelAddress
        );

        // Update the state
        setFetchedPixels((pixels) => {
          const newPixels = [...pixels];
          const index = newPixels.findIndex(
            (p) => p.posX === e.posX && p.posY === e.posY
          );
          if (index >= 0) {
            // We already have pixel data at this position, so replace it
            newPixels[index] = updatedPixelAccount;
          } else {
            // We don't have pixel data at this position, so add it
            newPixels.push(updatedPixelAccount);
          }
          return newPixels;
        });
      }
    );

    return () => {
      program.removeEventListener(listener);
    };
  }, [program]);

  return (
    <div className={clsx(disabled && "opacity-25 cursor-not-allowed")}>
      <table className="border border-gray-300 table-fixed">
        <tbody className="divide-y divide-gray-300">
          {[...Array(100)].map((_, y) => {
            return (
              <tr className="divide-x divide-gray-300" key={y}>
                {[...Array(100)].map((_, x) => {
                  const id = y * 100 + x;
                  const pixelData = pixelsMap[id];
                  return (
                    <Pixel
                      posX={x}
                      posY={y}
                      program={program}
                      pixelData={pixelData}
                      selectedColor={selectedColor}
                      key={x}
                    />
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
