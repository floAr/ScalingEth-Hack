<script lang="ts">
  export const id:number=0
  import Lazy from 'svelte-lazy'
  import Modal from '$lib/components/modal.svelte'
</script>

<Lazy height={250} fadeOption={{ delay: 200, duration: 600 }} placeholder={''} class="flow-lazy">
  <Modal>
    <div class="flow-card" slot="trigger" let:setTrue>
      <div class="flow-content" on:click={setTrue} />
    </div>

    <!-- Modal / detail view -->
    <div slot="header">
      <h1>Detail view {id}</h1>
    </div>
    <div slot="content">
     <div class="image-detail"/>
    </div>
    <div slot="footer" let:store={{setFalse}}>
      
    </div>
  </Modal>
</Lazy>

<style lang="scss">
  .flow-card {
    width: 250px;
    height: 250px;
  }
  .flow-lazy {
    width: 100%;
    height: 100%;
  }
  .flow-content {
    width: 100%;
    height: 100%;
    background: url('https://bafybeiacvl6ff2aqn7pdhghqvd6kzeoovze4tjrkzil4m7xels2pjmht3u.ipfs.dweb.link/');
    background-size: cover;
    margin: 1px;
  }

  .image-detail {
    width:350px;
    height: 350px;
    background: url('https://bafybeiacvl6ff2aqn7pdhghqvd6kzeoovze4tjrkzil4m7xels2pjmht3u.ipfs.dweb.link/');
    background-size: cover;
    margin: 1px;
  }
</style>
