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
    const wasm = fs.readFileSync('minter/contract.wasm');
   
    console.log('Uploading contract');
    const uploadReceipt = await client.upload(wasm, {})
        .catch((err) => { throw new Error(`Could not upload contract: ${err}`); });
    // 3. Create an instance of the Counter contract
    // Get the code ID from the receipt
    const { codeId } = uploadReceipt;

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


    const token_addr='secret1pctle9m5n52c8atkpjn4v2syypzy0lk0szd4x2'
    const codehash= await   client.getCodeHashByContractAddr(token_addr)
    console.log('code-hash',codehash)

    const initMsg = {

        entropy: randomString(15),
        token_contract: {
            address: token_addr,
            code_hash: codehash
        }

    }

    const contract = await client.instantiate(codeId, initMsg, `SeMaToken${Math.ceil(Math.random() * 10000)}`)
        .catch((err) => { throw new Error(`Could not instantiate contract: ${err}`); });
    const { contractAddress } = contract;
    console.log('contract: ', contract);

};

main().catch((err) => {
    console.error(err);
});