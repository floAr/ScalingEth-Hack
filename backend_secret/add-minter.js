const {
    EnigmaUtils, Secp256k1Pen, SigningCosmWasmClient, pubkeyToAddress, encodeSecp256k1Pubkey,
} = require('secretjs');

const fs = require('fs');

// Load environment variables
require('dotenv').config();

const customFees = {
    upload: {
        amount: [{ amount: '20000000', denom: 'uscrt' }],
        gas: '20000000',
    },
    init: {
        amount: [{ amount: '5000000', denom: 'uscrt' }],
        gas: '5000000',
    },
    exec: {
        amount: [{ amount: '5000000', denom: 'uscrt' }],
        gas: '5000000',
    },
    send: {
        amount: [{ amount: '800000', denom: 'uscrt' }],
        gas: '800000',
    },
};

const main = async () => {
    const httpUrl = process.env.SECRET_REST_URL;

    // Use key created in tutorial #2
    const mnemonic = process.env.MNEMONIC;

    // A pen is the most basic tool you can think of for signing.
    // This wraps a single keypair and allows for signing.
    const signingPen = await Secp256k1Pen.fromMnemonic(mnemonic)
        .catch((err) => { throw new Error(`Could not get signing pen: ${err}`); });

    // Get the public key
    const pubkey = encodeSecp256k1Pubkey(signingPen.pubkey);

    // get the wallet address
    const accAddress = pubkeyToAddress(pubkey, 'secret');

    // 1. Initialize client
    const txEncryptionSeed = EnigmaUtils.GenerateNewSeed();

    const client = new SigningCosmWasmClient(
        httpUrl,
        accAddress,
        (signBytes) => signingPen.sign(signBytes),
        txEncryptionSeed, customFees,
    );
    console.log(`Wallet address=${accAddress}`);
    // 2. Upload the contract wasm
  

    // Create an instance of the Counter contract, providing a starting count

    const randomString = (length) => {
        let result = ''
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        const charactersLength = characters.length
        for (let i = 0; i < length; i += 1) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength))
        }
        return result
      }

    
    const  contractAddress  = 'secret1pctle9m5n52c8atkpjn4v2syypzy0lk0szd4x2';
    const jan ='secret1mmutcfdwnya86y2evmmwe84qkqf4t5cp505x2c'
    const moi='secret14rwjv292vxt4zu88kna9zt4w094emwwnkjp3y2'
    const minter='secret17e2mvjm0jq99fa7qnx9qsh7t25ugafd08vme5a'
    const mint = await client.execute(contractAddress,{add_minters:{minters:[jan,moi,minter]}})
    console.log('add mint: ', new TextDecoder().decode(mint.data));

};

main().catch((err) => {
    console.error(err);
});