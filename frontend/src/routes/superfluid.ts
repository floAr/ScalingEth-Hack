import SuperfluidSDK from "@superfluid-finance/js-sdk";
import Web3 from 'web3'
import HDWalletProvider from '@truffle/hdwallet-provider'


export async function get(req) {





    const mem1 = 'digital enact ginger purchase arrive umbrella enrich super miss august horror rookie'
    const provider = new HDWalletProvider({
        mnemonic: {
            phrase: mem1
        },
        providerOrUrl: "wss://goerli.infura.io/ws/v3/4744b8018752472dad1b8daf20e7eb27",
        chainId: 5
    });
    const w3 = new Web3(provider,)

    //    console.log(w3)


    const sf = new SuperfluidSDK.Framework({
        web3: w3,

    })
    await sf.initialize()
    console.log(sf)

    const viewer = sf.user({
        address: '0x6EC25460f85F23181f5694c7c61C74027fCDdB03',
        token: '0xF2d68898557cCb2Cf4C10c3Ef2B034b2a69DAD00'
    });

    console.log(await viewer)


    const updated = await viewer.flow({
        recipient: '0xF16fBeBEF9293B196781a655b1f08CDec34Bfe0b',
        flowRate: '0' //385802469135802
    });
    console.log(updated)
    const details = await viewer.details();
    console.log(details);


    return { body: { success: true } }
}
