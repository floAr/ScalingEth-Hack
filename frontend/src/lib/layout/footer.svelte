<script lang="ts">
  import Title from '$lib/logo/title.svelte'
  import ThemeIcon from '$lib/components/themeIcon.svelte'
  import Seperator from '$lib/components/seperator.svelte'
  import SecretLogo from '$lib/logo/secret.svelte'
</script>

<div class="footer-layout">
  <Seperator />
  <div class="footer-title">
    <Title />
  </div>
  <div class="footer-fineprint">
    <div class="footer-info">
      <h4>Secured by Secret Network</h4>
      <p>
        Secret Manufaktur's secretNFTs are created using the SNIP-721 standard on Secret Network.
        Your image is encrpyted and stored within the private metadata, so only the current owner
        can ever access it. Secret Network is the first blockchain with privacy-preserving smart
        contracts. Applications built on Secret Network utilize encrypted data without exposing it
        to anyone, even the nodes in the network.
      </p>
    </div>
    <div class="footer-logo"><SecretLogo /></div>
    <ThemeIcon />
  </div>
</div>

<style lang="scss">
  .footer-layout {
    display: flex;
    flex-direction: column;
    align-items: center;
    /* position: fixed;
    bottom: 0; */
    width: 100%;
  }
  .footer-fineprint {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 75vw;
  }
  .footer-title {
    width: 300px;
  }

  .footer-info {
    width: 80%;
    display: flex;
    flex-direction: column;
  }

  .footer-logo {
    display: grid;
    place-items: center;
    width: 100px;
  }
</style>
