<script lang="ts">
  export let id: string = ''
  export let name: string = ''
  export let description: string = ''
  export let cid: string = ''
  export let price: string | undefined = undefined
  import Lazy from 'svelte-lazy'
  import Modal from '$lib/components/modal.svelte'
  import { fly } from 'svelte/transition'
  import Seperator from '$lib/components/seperator.svelte'
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
    <div
      slot="content"
      style="--flow-cid: url('https://{cid}.ipfs.dweb.link/'); overflow: visible; position: relative;"
    >
      <div class="image-detail" />
      <div class="side-content" in:fly={{ x: -200, duration: 1000 }}>
        <span class="side-header">{name}</span>
        <hr class="side-separator" />
        <span class="side-description">{description}</span>
        <button
          class="side-button"
          on:click={() => {
            console.log('bought')
          }}
        >
          buy me for {price}
        </button>
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

  .side-header {
    font-family: 'Cinzel Decorative';
    font-weight: bold;
    font-size: larger;
    text-align: center;
  }

  .image-detail {
    width: 350px;
    height: 350px;
    background: var(--flow-cid);
    background-size: cover;
    margin: 1px;
    z-index: 10;
    border-radius: 2px;
  }

  .side-content {
    width: 100%;
    height: 50%;
    left: calc(100% - 50px);
    top: calc(50% + 10px);
    position: absolute;
    background: var(--theme-colors-background-contrast);
    padding: 10px;
    padding-left: 60px;
    z-index: -1;
    border-radius: 2px;
    display: flex;
    flex-direction: column;
  }

  .side-button {
    font-family: 'Cinzel Decorative';
    width: fit-content;
    background: none;
    border: none;
    cursor: pointer;
    font-weight: bold;
    letter-spacing: 0px;
    color: var(--theme-colors-text);
    margin: 10px;
    position: relative;
    overflow: hidden;
    transition: all 0.4s ease-in-out;
  }

  .side-button::hover {
    letter-spacing: 5px;
  }

  .side-button::before {
    position: absolute;
    bottom: 0;
    left: -100%;
    content: '';
    height: 2px;
    width: 100%;
    border-radius: 5px;
    background-color: #bbb;
    transition: all 0.4s ease-in-out;
  }

  .side-button:hover::before {
    left: 0;
  }

  hr.side-separator {
    margin: 5px;
    border-top: 1px solid #bbb;
    border-radius: 5px;
    width: 90%;
    transform: translateY(-5px);
    z-index: -100;
  }
</style>
