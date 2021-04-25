<script lang="ts">
import { getFile, storeFile } from "$lib/modules/ipfs/ipfs-store";


  let mintInput
  let title, description, img
  let mintObject: { title: string; description: string; mintImg: string }

  let testcid=undefined

  const onFileSelected = e => {
    let image = e.target.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(image)
    reader.onload = e => {
      img = e.target.result
    }
  }

  async function mintImage() {
    const iCid= await storeFile(img)
    mintObject = { title: title, description: description, mintImg: iCid }
    console.log(mintObject)
    testcid=iCid
    getFile(iCid)
  }
</script>

<svelte:head>
  <title>mint</title>
</svelte:head>

<div>
  <div class="mint-container">
    <span class="mint-header">mint <span class="underlined-text">{title || 'img'}</span></span>

    <div class="mint-input-wrapper">
      <input bind:value={title} placeholder="enter the title" />
    </div>
    <div class="mint-input-wrapper">
      <input bind:value={description} placeholder="enter the description" />
    </div>
    {#if img}
      <div class="preview-img"><img src={img} alt="d" /></div>
    {/if}
    <span
      class="img-selector"
      on:click={() => {
        mintInput.click()
      }}
    >
      Choose Image
    </span>

    <button
      class="hae-button"
      on:click={() => {
        mintImage()
      }}
    >
      mint
    </button>
    {#if testcid}
    <div class="preview-img"><img src="https://ipfs.io/ipfs/{img}" alt="d" /></div>
    {/if}
  </div>
  <input
    style="display:none"
    type="file"
    accept=".jpg, .jpeg, .png"
    on:change={e => onFileSelected(e)}
    bind:this={mintInput}
  />
</div>

<style lang="scss">
  *:focus {
    outline: none;
  }

  .mint-container {
    display: flex;
    flex-direction: column;
    width: 80vw;
  }

  .mint-container span {
    width: max-content;
  }

  .img-selector {
    cursor: pointer;
  }

  .hae-button {
    width: fit-content;
  }

  button:disabled {
    border: 1px solid #999999;
    background-color: #cccccc;
    color: #666666;
  }

  .underlined-text {
    position: relative;
    z-index: 10;
  }

  .underlined-text::after {
    position: absolute;
    bottom: 2px;
    left: 0;
    z-index: 4;

    width: 100%;
    height: 5%;
    min-height: 3px;
    content: '';
    background: linear-gradient(to right, #ffd89b, #19547b);
    /* background: linear-gradient(to right, #1565c0, #b92b27); */
  }

  .mint-input-wrapper {
    margin: 10px;
    width: 50vw;
    min-width: 100px;
    position: relative;
  }

  .mint-input-wrapper input {
    width: 100%;
  }

  .mint-input-wrapper::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 5%;
    max-height: 6px;
    min-height: 3px;
    bottom: 0;
    left: 0;
    background: linear-gradient(to right, #ffd89b, #19547b);
    z-index: 5;
    transition: all 0.4s ease-in-out;
    transform: scale(0);
  }

  .mint-input-wrapper:hover::after {
    transform: scale(1);
  }

  .mint-input-wrapper:focus-within::after {
    transform: scale(1);
  }

  .preview-img {
    position: relative;
    width: fit-content;
  }

  .preview-img img {
    max-height: 20vh;
  }

  .preview-img::after {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 4;

    width: 100%;
    height: 5%;
    max-height: 6px;
    min-height: 3px;
    content: '';
    background: linear-gradient(to right, #ffd89b, #19547b);
  }

  img {
    max-width: none;
  }
</style>
