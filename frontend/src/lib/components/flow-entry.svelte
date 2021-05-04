<script lang="ts">
  export let id: number = 0
  export let name: string = ''
  export let description: string = ''
  export let cid: string = ''
  import Lazy from 'svelte-lazy'
  import Modal from '$lib/components/modal.svelte'
</script>

<Lazy height={250} fadeOption={{ delay: 200, duration: 600 }} placeholder={''} class="flow-lazy">
  <Modal>
    <div
      class="flow-card"
      slot="trigger"
      let:setTrue
      style="--flow-cid: url('https://{cid}.ipfs.dweb.link/')"
    >
      <div class="flow-content" on:click={setTrue} />
    </div>

    <!-- Modal / detail view -->
    <div slot="content" style="--flow-cid: url('https://{cid}.ipfs.dweb.link/'); overflow: visible; position: relative;">
      <div class="image-detail">
        <div class="side-content">
          <h1>Detail view {id}</h1>
        </div>
      </div>
    </div>
    <div slot="footer" let:store={{ setFalse }} />
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
    background: var(--flow-cid);
    background-size: cover;
    margin: 1px;
  }

  .image-detail {
    width: 350px;
    height: 350px;
    background: var(--flow-cid);
    background-size: cover;
    margin: 1px;
  }

  .side-content {
    right: -50px;
    position: absolute;
  }
</style>
