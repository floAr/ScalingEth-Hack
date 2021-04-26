import OpenLogin from "@toruslabs/openlogin";

// clientId can be any string for localhost
const openlogin = new OpenLogin({ clientId: "BPyQp-cGIlSTkVHdhtoUM0ktdHEWgw4omK-fGZU_gXfdhYpYh8m53wgFXL5FFaB3vYci0ExgXlDU2OgSyxPX7Gg", network: "testnet" });

export async function torus_login(){

    await openlogin.init();
    
    // if openlogin instance has private key then user is already logged in
    if (openlogin.privKey) {
        console.log("User is already logged in. Private key: " + openlogin.privKey);
    } else {
        await openlogin.login({
            loginProvider: "google",
            redirectUrl: "http://localhost:3000",
        });
    }
    return true
}
