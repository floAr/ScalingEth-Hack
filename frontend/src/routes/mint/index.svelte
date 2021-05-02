<script lang="ts">
  import { browser } from '$app/env'

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

  async function handleUpload(e) {
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
  

      console.log("img: ",img)
      window.img=img
      const base64 = await fetch(img);
      console.log("base64: ",base64)
      window.b64=base64
         // first try using blob to get data, this errors out on larger files ------------------------------------
      const blob = await base64.blob();
      console.log("blob: ",blob)
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
      axios.default({
            method: 'post',
        url: 'https://ipfsnode.azurewebsites.net/ipfs/upload',
        headers: {},
        data:ab,
        onUploadProgress:(progressEvent:ProgressEvent)=>{
          // const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
                console.log("onUploadProgress total", progressEvent.total);
                console.log("onUploadProgress loaded", progressEvent.loaded);
                console.log("onUploadProgress progress", Math.round( (progressEvent.loaded * 100) / progressEvent.total ));
                // if (totalLength !== null) {
                //     this.updateProgressBarValue(Math.round( (progressEvent.loaded * 100) / totalLength ));
                // }
        }
      })
              .then(res => {console.log(res)}) // Handle the response from backend here
              .catch(err => {}) // Catch errors if any
    }
  }

  async function mintImage() {
    handleUpload(null)
    // const iCid = await storeFile(img)
    // // mintObject = { title: title, description: description, mintImg: iCid }
    // console.log(mintObject)
    // testcid = iCid
    // getFile(iCid)
  }
</script>

<svelte:head>
  <title>mint</title>
</svelte:head>

<div>
  <div class="mint-container">
    <span class="mint-header">mint <span class="underlined-text">{title || 'img'}</span></span>

    <div class="mint-input-container">
      <div class="mint-input-wrapper">
        <input bind:value={title} placeholder="enter the title" />
      </div>
      <div class="mint-input-wrapper">
        <input bind:value={description} placeholder="enter the description" />
      </div>
      <div class="mint-img-container">
        <span
          class="img-selector"
          on:click={() => {
            mintInput.click()
          }}
        >
          Choose Image
        </span>
        {#if img}
          <div class="preview-img"><img src={img} alt="d" /></div>
        {/if}
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

  .mint-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 80vw;
  }

  .mint-container span {
    width: max-content;
  }

  .mint-img-container {
    display: flex;
    flex-direction: row;
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
