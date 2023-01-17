import Title from "./Title";
import Link from "next/link";

export default function Rules() {

  return (
    <div className="flex flex-col items-stretch gap-8 px-4 pt-16 mx-auto w-[90%] h-screen">
      <main className="flex flex-col gap-4">
        <Title />

        <div className="flex">
        <Link href="/">
          <div className="text-xl uppercase mr-4 font-bold hover:cursor-pointer">
            Home
          </div>
        </Link>
        <Link href="/livechat">
            <div className="text-xl uppercase font-bold hover:cursor-pointer">
              Live Chat
            </div>
          </Link>
          </div>

        <div className="mb-4">
          <div className="flex justify-center text-3xl uppercase font-bold underline mb-[2%]">
            <h1>how to play?</h1>
          </div>
          <div className="flex justify-center">
            <div className="w-[70%]">
              <div>
                0. Download a Solana wallet (
                <a
                  className="underline font-bold"
                  href="https://phantom.app/"
                  rel="noreferrer"
                  target="_blank"
                >
                  Phantom
                </a>{" "}
                or{" "}
                <a
                  className="underline font-bold"
                  href="https://solflare.com/"
                  rel="noreferrer"
                  target="_blank"
                >
                  Solflare
                </a>
                )
              </div>
              <div>1. Connect your Solana wallet</div>
              <div>
                2. Choose a color among those proposed in the palette
              </div>
              <div>
                3. Choose the pixel you want to color and click on it
              </div>
              <div>4. Accept the transaction</div>
              <div>
                5. Have fun setting your own rules! Create designs, defend your own or paint over others' designs!
              </div>
              <div>
                <strong>BONUS</strong> Color 15 times and receive a commemorative NFT representing the final work!
              </div>
              <div>
                <strong className="underline">Good to know:</strong> The more a pixel is played, the more expensive it becomes to modify again. The base price of a pixel is 0.0001 $SOL and will increase by 0.0001 $SOL with each modification
              </div>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <div className="flex justify-center text-3xl uppercase font-bold underline mb-[2%]">
            <h1>Comment jouer ?</h1>
          </div>
          <div className="flex justify-center">
          <div className="w-[70%]">
              <div>
                0. Téléchargez un wallet Solana (
                <a
                  className="underline font-bold"
                  href="https://phantom.app/"
                  rel="noreferrer"
                  target="_blank"
                >
                  Phantom
                </a>{" "}
                ou{" "}
                <a
                  className="underline font-bold"
                  href="https://solflare.com/"
                  rel="noreferrer"
                  target="_blank"
                >
                  Solflare
                </a>
                )
              </div>
              <div>1. Connectez votre wallet Solana</div>
              <div>
                2. Choississez une couleur parmi celles proposées dans la
                palette
              </div>
              <div>
                3. Choississez le pixel que vous souhaitez colorier et cliquez
                dessus
              </div>
              <div>4. Acceptez la transaction</div>
              <div>
                5. Amusez-vous en définissant vos propres règles ! Créez des
                dessins, défendez les votre ou peignez par dessus les dessins
                des autres !
              </div>
              <div>
                <strong>BONUS</strong> Coloriez 15 fois et recevez un NFT
                commémoratif représentant l'oeuvre finale !
              </div>
              <div>
                <strong className="underline">A savoir :</strong> Plus un pixel est joué, plus il
                devient cher à modifier de nouveaux. Le prix de base d'un pixel
                est de 0.0001 $SOL et augmentera de 0.0001 $SOL à chaque
                modification
              </div>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <div className="flex justify-center text-3xl uppercase font-bold underline mb-[2%]">
            <h1>¿CÓMO JUGAR?</h1>
          </div>
          <div className="flex justify-center">
          <div className="w-[70%]">
              <div>
                0. Descargar una cartera de Solana (
                <a
                  className="underline font-bold"
                  href="https://phantom.app/"
                  rel="noreferrer"
                  target="_blank"
                >
                  Phantom
                </a>{" "}
                o{" "}
                <a
                  className="underline font-bold"
                  href="https://solflare.com/"
                  rel="noreferrer"
                  target="_blank"
                >
                  Solflare
                </a>
                )
              </div>
              <div>1. Conecte su cartera Solana</div>
              <div>
                2. Elige un color de la paleta
              </div>
              <div>
                3. Elige el píxel que quieras colorear y haz clic sobre él
              </div>
              <div>4. Aceptar la transacción</div>
              <div>
                5. ¡Diviértete estableciendo tus propias reglas! Crea diseños, defiende los tuyos o pinta sobre los de los demás.
              </div>
              <div>
                <strong>BONUS</strong> Coloree 15 veces y reciba un NFT conmemorativo de la obra final
              </div>
              <div>
                <strong className="underline">A savoir :</strong> Cuanto más se reproduce un píxel, más caro resulta modificarlo de nuevo. El precio base de un píxel es de 0,0001 $SOL y aumentará en 0,0001 $SOL con cada modificación.
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
