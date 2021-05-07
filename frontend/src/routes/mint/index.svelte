<script lang="ts">
  import { browser } from '$app/env'
  import { selectedAccount } from '$lib/modules/secret/secret-store'
  import { mintContract, tokenContract } from '$lib/secret-manufaktur/contract-interaction'
  import type { ImageApiResponseData } from '$lib/secret-manufaktur/image-api'

  // import { getFile, storeFile } from '$lib/modules/ipfs/ipfs-store'

  let mintInput
  let title, description, img
  let mintObject: { title: string; description: string; mintImg: string }

  let testcid = undefined

  const onFileSelected = e => {
    let image = e.target.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(image)
    reader.onload = e => {
      img = e.target.result
    }
  }

  async function handleUpload() {
    if (browser) {
      let formData = new FormData()

      //Adding files to the formdata
      const axios = await import('axios')
      // axios
      //   .default({
      //     // Endpoint to send files
      //     url:
      //       'https://prod-18.germanynorth.logic.azure.com:443/workflows/cf39482323884e73a2ff5053f06cc145/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=C1Ykrapemx4BLnzCe8MNUPdhBejMIyEFJxg4bci38y4',
      //     method: 'POST',
      //     headers: {
      //       // Add any auth token here
      //     },
      //     // Attaching the form data
      //     data: formData
      //   })
      //

      const base64 = await fetch(img)
      // first try using blob to get data, this errors out on larger files ------------------------------------
      const blob = await base64.blob()
      var data = blob

      // second but this is not what we want   ------------------------------------
      // const ab = await base64.arrayBuffer();
      // console.log("ab: ",ab)
      // var data = ab

      // old approach using xml request ------------------------------------
      // var xhr = new XMLHttpRequest()
      // xhr.withCredentials = true

      // xhr.addEventListener('readystatechange', function () {
      //   if (this.readyState === 4) {
      //     console.log(this.responseText)
      //   }
      // })
      // xhr.addEventListener('progress', function(p){
      //   console.log(this.status)
      //   console.log(p)
      // })

      // xhr.open('POST', 'https://ipfsnode.azurewebsites.net/ipfs/upload')
      // xhr.send(data)
      // old approach using xml request ------------------------------------
      const response = await axios.default({
        method: 'post',
        url: 'https://ipfsnode.azurewebsites.net/ipfs/upload',
        headers: {},
        data: data,
        onUploadProgress: (progressEvent: ProgressEvent) => {
          // const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
          console.log('onUploadProgress total', progressEvent.total)
          console.log('onUploadProgress loaded', progressEvent.loaded)
          console.log(
            'onUploadProgress progress',
            Math.round((progressEvent.loaded * 100) / progressEvent.total)
          )
          // if (totalLength !== null) {
          //     this.updateProgressBarValue(Math.round( (progressEvent.loaded * 100) / totalLength ));
          // }
        }
      })
      return response.data as ImageApiResponseData
    }
  }

  async function mintImage() {
    const imgResponse = await handleUpload()

    const answer = await mintContract.SendTransaction({
      mint: {
        title,
        description,
        thumbnail: imgResponse.thumb.value.cid,
        fullres: imgResponse.fullRes.value.cid
      }
    })
    // const answer =  await tokenContract.SendTransaction({
    //   mint_nft: {
    //     owner: $selectedAccount.address,
    //     public_metadata: {
    //       name: title,
    //       description: description,
    //       image: imgResponse.thumb.value.cid
    //     },
    //     private_metadata:{
    //       image: imgResponse.fullRes.value.cid
    //     }
    //   }
    // })
    console.log(answer)
  }
</script>

<svelte:head>
  <title>mint</title>
</svelte:head>

<div>
  <div class="mint-container">
    <span class="mint-header">
      mint {title || 'artwork'}
    </span>

    <div class="mint-input-container">
      <div class="mint-img-container">
        {#if img}
          <div class="mint-img preview-img"><img src={img} alt="d" /></div>
        {/if}
        {#if !img}
          <div class="img-selector-container">
            <span
              class="img-selector-button"
              on:click={() => {
                mintInput.click()
              }}
            >
              Choose Image
            </span>
          </div>
        {/if}
        <div class="img-selector-background" />
      </div>
      <div class="mint-input-wrapper title-input">
        <input bind:value={title} placeholder="enter the title" />
      </div>
      <div class="mint-input-wrapper description-input">
        <textarea bind:value={description} rows="3" placeholder="enter the description" />
      </div>
    </div>
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
  .mint-header {
    width: 100%;
    font-family: 'Cinzel Decorative', cursive;
    text-align: center;
    font-weight: bold;
    margin: 6px 0;
  }
  .mint-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 80vw;
    height: 75vh;
  }
  .mint-container span {
    width: max-content;
  }

  .mint-input-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .mint-img-container {
    margin: 6px 0;
    position: relative;
    width: 50vw;
    height: 40vh;
    min-width: 500px;
    max-width: 1000px;
    display: flex;
    flex-direction: column;
    align-items: center;
    &::before {
      content: '';
      position: absolute;
      top: 5%;
      left: 0;
      width: 100%;
      height: 90%;
      z-index: 10;
      border-top: 2px solid var(--theme-colors-text);
      border-bottom: 2px solid var(--theme-colors-text);
      border-radius: 2px;
      transform: scaleX(0);

      transition: all 0.4s ease-in-out;
    }
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 5%;
      width: 90%;
      height: 100%;
      z-index: 10;
      border-left: 2px solid var(--theme-colors-text);
      border-right: 2px solid var(--theme-colors-text);
      border-radius: 2px;
      transform: scaleY(0);

      transition: all 0.4s ease-in-out;
    }
    &:hover::before {
      transform: scaleX(1);
    }
    &:hover::after {
      transform: scaleY(1);
    }
  }
  .mint-img {
    z-index: 2;
  }
  .img-selector-container {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .img-selector-background {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: var(--theme-colors-background-contrast);
    opacity: 0.4;
  }
  .img-selector-button {
    font-family: 'Cinzel Decorative';
    z-index: 20;
    cursor: pointer;
  }
  .hae-button {
    font-family: 'Cinzel Decorative';
    width: fit-content;
    background: none;
    border: none;
    cursor: pointer;
    font-size: larger;
    font-weight: bold;
    color: var(--theme-colors-text);
    margin: 20px;
    overflow: hidden;
    position: relative;
  }

  .hae-button::before {
    position: absolute;
    bottom: 0;
    left: -100%;
    content: '';
    height: 2px;
    width: 100%;
    border-radius: 5px;
    background-color: var(--theme-colors-text);
    transition: all 0.4s ease-in-out;
  }

  .hae-button:hover::before {
    left: 0;
  }

  button:disabled {
    border: 1px solid #999999;
    background-color: #cccccc;
    color: #666666;
  }
  .mint-input-wrapper {
    margin: 6px 0;
    width: 45vw;
    min-width: 100px;
    overflow: hidden;
    position: relative;
  }
  .mint-input-wrapper input {
    width: 100%;
    padding: 4px;
    border: hidden;
    background: var(--theme-colors-background-contrast);
    color: var(--theme-colors-text);
  }

  .mint-input-wrapper textarea {
    width: 100%;
    box-sizing: border-box;
    padding: 4px;
    border: hidden;
    background: var(--theme-colors-background-contrast);
    color: var(--theme-colors-text);
    vertical-align: top;
  }

  .mint-input-wrapper textarea::placeholder,
  input::placeholder {
    color: var(--theme-colors-text);
    opacity: 0.8;
  }
  .mint-input-wrapper::after {
    position: absolute;
    bottom: 0;
    left: -100%;
    content: '';
    height: 2px;
    width: 100%;
    border-radius: 5px;
    background-color: var(--theme-colors-text);
    transition: all 0.4s ease-in-out;
  }
  .mint-input-wrapper:hover::after {
    left: 0;
  }
  .mint-input-wrapper:focus-within::after {
    left: 0;
  }
  .preview-img {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: center;
  }
  .preview-img img {
    max-height: 96%;
    max-width: 96%;
  }
</style>
