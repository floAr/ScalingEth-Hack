<script lang="ts">
  export let id: string = ''
  // export let name: string = ''
  // export let description: string = ''
  // export let cid: string = ''
  // export let price: string | undefined = undefined
  import Lazy from 'svelte-lazy'
  import Modal from '$lib/components/modal.svelte'
  import { fly } from 'svelte/transition'
  import type { FlowButton } from '$lib/secret-manufaktur/types'
  import { getToken } from '$lib/secret-manufaktur/token-store'

  export let Buttons: FlowButton[] = []

  function numberWithCommas(x: string) {
    return x
      ? (Number(x) / 1000000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' SCRT'
      : 'Not for sale'
  }

  let token = undefined
  const getMyToken = async () => {
    token = await getToken(id)
    console.log(token)
  }

  $:{
    getMyToken()
  }
</script>

<!-- <Lazy height={250} fadeOption={{ delay: 200, duration: 600 }} placeholder={''} class="flow-lazy"> -->
{#if token}
  <Modal>
    <div
      class="flow-card"
      slot="trigger"
      let:setTrue
      style="--flow-cid: url('https://{token.image}.ipfs.dweb.link/'); --flow-name: '{token.name}';"
    >
      <div class="flow-content" on:click={setTrue} />
    </div>
    <!-- Modal / detail view -->
    <div
      slot="content"
      style="--flow-cid: url('https://{token.image}.ipfs.dweb.link/'); overflow: visible; position: relative;"
    >
      <div class="image-detail" />
      <div class="side-content" in:fly={{ x: -200, duration: 1000 }}>
        <span class="side-header">{token.name}</span>
        <hr class="side-separator" />
        <span class="side-description">{token.description}</span>
        <span class="side-price"
          >Price: <span class="underlined-text">{numberWithCommas(token.price)}</span></span
        >
        <div class="interaction-pane">
          {#each Buttons as { title, func, active }, i}
            {#if active(token)}
              <button
                class="side-button"
                on:click={() => {
                  func(token)
                }}
              >
                {title}
              </button>
            {/if}
          {/each}
        </div>
      </div>
    </div>
    <div slot="footer" let:store={{ setFalse }} />
  </Modal>
{:else}
  <div>loading</div>
{/if}

<!-- </Lazy> -->
<style lang="scss">
  .interaction-pane {
    display: flex;
    flex-direction: row;
    margin-top: auto;
  }
  .flow-card {
    margin: 5px;
    width: 250px;
    height: 250px;
    position: relative;
  }
  .flow-lazy {
    width: 100%;
    height: 100%;
  }

  .flow-title {
    width: 100%;
    height: 100%;
  }
  .flow-content {
    width: 100%;
    height: 100%;
    background: var(--flow-cid);
    background-size: cover;
    margin: 1px;
    cursor: pointer;

    // &::before {
    //   content: '';
    //   position: absolute;
    //   top: 5%;
    //   left: 0;
    //   width: 100%;
    //   height: 90%;
    //   z-index: 10;
    //   border-top: 2px solid var(--theme-colors-text);
    //   border-bottom: 2px solid var(--theme-colors-text);
    //   border-radius: 2px;
    //   transform: scaleX(0);

    //   transition: all 0.4s ease-in-out;
    // }
    // &::after {
    //   content: '';
    //   position: absolute;
    //   top: 0;
    //   left: 5%;
    //   width: 90%;
    //   height: 100%;
    //   z-index: 10;
    //   border-left: 2px solid var(--theme-colors-text);
    //   border-right: 2px solid var(--theme-colors-text);
    //   border-radius: 2px;
    //   transform: scaleY(0);

    //   transition: all 0.4s ease-in-out;
    // }

    &::after {
      content: var(--flow-name);
      color: var(--theme-colors-background);
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      top: 0;
      opacity: 0;
      position: absolute;
      transition: all 0.4s ease-in-out;
      font-family: 'Cinzel Decorative';
      padding: 20px;
      box-sizing: border-box;
      text-align: center;
    }
    &:hover::after {
      opacity: 1;
      box-shadow: inset 0 -250px 0 0 var(--theme-colors-text);
    }
  }

  .side-header {
    font-family: 'Cinzel Decorative';
    font-weight: bold;
    font-size: larger;
    text-align: center;
    margin: 5px 0;
  }

  .underlined-text {
    font-family: 'Cinzel Decorative';
    letter-spacing: 0px;
    position: relative;
    font-weight: bold;
    margin: 0 5px;
  }

  .underlined-text::after {
    width: 110%;
    height: 2px;
    content: '';
    background: var(--theme-colors-text);
    position: absolute;
    left: -5%;
    bottom: 2px;
    border-radius: 2px;
  }

  .image-detail {
    width: 350px;
    height: 350px;
    background: var(--flow-cid);
    background-size: contain;
    margin: 1px;
    z-index: 10;
    border-radius: 2px;
    box-shadow: rgb(23 23 23 / 20%) 4px 3px 13px;
    background-repeat: no-repeat;
    background-position: 50% 50%;
  }

  .side-price {
    margin: 3px 0;
  }

  .side-content {
    width: 100%;
    min-height: 50%;
    height: auto;
    left: calc(100% - 50px);
    top: calc(50% + 10px);
    position: absolute;
    background: var(--theme-colors-background);
    padding: 10px;
    padding-left: 60px;
    z-index: -1;
    border-radius: 2px;
    display: flex;
    flex-direction: column;
    box-shadow: rgb(23 23 23 / 20%) 4px 3px 13px;
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
    padding: 6px 10px;
    position: relative;
    transition: all 0.4s ease-in-out;
  }

  .side-button:hover {
    box-shadow: inset 0px -50px 0 0 var(--theme-colors-text); 
    color: var(--theme-colors-background);
  }

  // .side-button::before {
  //   position: absolute;
  //   bottom: 0;
  //   left: -100%;
  //   content: '';
  //   height: 2px;
  //   width: 100%;
  //   border-radius: 5px;
  //   background-color: var(--theme-colors-text);
  //   transition: all 0.4s ease-in-out;
  // }

  // .side-button:hover::before {
  //   left: 0;
  // }

  hr.side-separator {
    margin: 5px;
    border-top: 1px solid #bbb;
    border-radius: 5px;
    width: 90%;
    transform: translateY(-5px);
    z-index: -100;
  }
</style>
