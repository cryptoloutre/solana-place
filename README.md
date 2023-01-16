# SolanaPlace

SolanaPlace is an onchain pixel war between crypto communities. 

Set your own rules: paint the color of your choice one pixel at a time, create designs, defend your own, or paint over the designs of others!

Plays 15 pixels and gets a commemorative NFT.

This event aims to make people test Solana and to onboard new people in a fun way.

❤️ [@pointer_gg](https://twitter.com/pointer_gg) for the [stater code and tutorial](https://www.pointer.gg/tutorials/solana-anchor)

## Getting Started

Clone the repo, install the dependencies and run `npm run dev` to run the development server.

```bash
git clone https://github.com/cryptoloutre/solana-place.git
cd solana-place/frontend
npm install
npm run dev
```

## Deploy on Vercel

Before push run localy `npm run build` to make sure app can be build succesffully on vercel .

Vercel will automatically create environment and deployment for you if you have vercel account connected to your GitHub account. Go to the vercel.com to connect it.
Then any push to `main` branch will automatically rebuild and redploy app.

You will need to set the root directory to frontend, since you only want Vercel to deploy that directory.
To do so use the following settings :

<p align="center">
<img src="https://user-images.githubusercontent.com/35653371/212338425-46d06be7-fa5d-4b49-82a9-6ab91bb93614.png"/>
</p>
