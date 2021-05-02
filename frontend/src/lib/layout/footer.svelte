<script lang="ts">
    	import Title from '$lib/logo/title.svelte';
        import ThemeIcon from '$lib/components/themeIcon.svelte'
        import Seperator from '$lib/components/seperator.svelte'
</script>

<div class="footer-layout">
    <Seperator />
    <div class="footer-title">
        <Title/>
    </div>
<div class="footer-fineprint">
  <div class="footer-info">
    <h4>Secured by Secret Network</h4>
    <p>Secret Heroes’ secretNFTs are created using the SNIP-721 standard on Secret Network.

        Secret Network is the first blockchain with privacy-preserving smart contracts. Applications built on Secret Network utilize encrypted data without exposing it to anyone, even the nodes in the network. </p>
  </div>
  <div class="footer-logo">Logo here</div>
 <ThemeIcon/>
</div>
</div>

<style lang="scss">
      .footer-layout {
    display: flex;
    flex-direction: column;
    align-items: center;

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
      width: 50%;
      display: flex;
      flex-direction: column;
  }

  .footer-logo {
      display: grid;
      place-items: center;
 
  }
</style>
