<script lang="ts">
  import { loadTokens } from '$lib/secret-manufaktur/token-store'

  loadTokens()

  let galleryTokens: any[] = []

  const rotateLeft = e => {
    galleryTokens = [
      galleryTokens[galleryTokens.length - 1],
      ...galleryTokens.slice(0, galleryTokens.length - 1)
    ]
  }

  const rotateRight = e => {
    galleryTokens = [...galleryTokens.slice(1, galleryTokens.length), galleryTokens[0]]
  }

  function numberWithCommas(x: string) {
    return x
      ? (Number(x) / 1000000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' SCRT'
      : 'Not for sale'
  }

  $: {
    galleryTokens = [
      {
        name: 'Honorary Title of MemeLord',
        description: 'You have been bestowed this honorary title',
        image: 'bafybeiazd6gwtvn2g37viuajfci4vijf65dvmzullmtvxub44aict2ulp4',
        price: null,
        id: '6'
      },
      {
        name: 'Sarina',
        description: 'Sarina after climbing a mountain in Italy',
        image: 'bafybeighza2midgr3rg5bnqsqlq6xpew2bqhbzxjjy7hypb7mbchb6wxee',
        price: null,
        id: '5'
      },
      {
        name: 'Yellow Office Fungus',
        description:
          "Yellow fungus that showed up in an office plant pot one day. The camera couldn't do justice to its dazzling, intense yellow shade. I shall forever cherish it in my memories.",
        image: 'bafybeifxdz6qxuxbjaoye5t5ma6nswkakakcgxr2c6trjk2minmiu4hxey',
        price: 28500000,
        id: '4'
      }
    ]
  }
</script>

<div class="gallery-container">
  <button class="gallery-button" on:click={rotateLeft}>
    <span class="arrow arrow-left" />
    <span class="arrow arrow-left second" />
  </button>
  <div class="gallery-image">
    <img class="image-image" src={`https://${galleryTokens[0].image}.ipfs.dweb.link/`} alt="aaa" />
    <div class="info-container">
      <span class="side-header">
        {galleryTokens[0].name}
      </span>
      <hr class="side-separator" />
      <span class="side-description">
        {galleryTokens[0].description}
      </span>
      <span class="side-price"
        >Price: <span class="underlined-text">{numberWithCommas(galleryTokens[0].price)}</span>
      </span>
    </div>
  </div>
  <button class="gallery-button" on:click={rotateRight}>
    <span class="arrow arrow-right second" />
    <span class="arrow arrow-right" />
  </button>
</div>

<style lang="scss">
  /* We need to set the display of the token card to none */
  :global(.single-flow-container .flow-content) {
    display: none;
  }

  .gallery-container {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  hr.side-separator {
    margin: 5px;
    border-top: 1px solid #bbb;
    border-radius: 5px;
    width: 90%;
    transform: translateY(-5px);
    z-index: -100;
  }

  .gallery-button:hover .arrow.second {
    opacity: 0.5;
  }

  .gallery-button:focus .arrow.second {
    opacity: 0.5;
  }

  .gallery-button:focus {
      border: none;
  }

  .image-image {
    flex-shrink: 0;
    max-width: 100%;
    max-height: 100%;
  }

  .gallery-image {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 350px;
    height: 350px;
  }

  .info-container {
    display: flex;
    flex-direction: column;
  }

  .arrow {
    display: inline-block;
    width: 15px;
    height: 15px;
    border-top: 2px solid var(--theme-colors-text);
    border-right: 2px solid var(--theme-colors-text);
  }

  .arrow-left {
    transform: rotate(225deg);
  }

  .arrow-right {
    transform: rotate(45deg);
  }

  .arrow-left.second {
    transform: translateX(-10px) rotate(225deg);
  }

  .arrow-right.second {
    transform: translateX(10px) rotate(45deg);
  }

  .second {
    opacity: 0;
    transition: all 0.4s ease-in-out;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
  }

  .side-header {
    font-family: 'Cinzel Decorative';
    font-weight: bold;
    font-size: larger;
    text-align: center;
    margin: 5px 0;
  }

  .side-price {
    margin: 3px 0;
  }

  .underlined-text {
    font-family: 'Cinzel Decorative';
    letter-spacing: 0px;
    position: relative;
    font-weight: bold;
    margin: 0 5px;
  }

  .underlined-text::after {
    width: 100%;
    height: 2px;
    content: '';
    background: var(--theme-colors-text);
    position: absolute;
    left: 0;
    bottom: 2px;
    border-radius: 2px;
  }
</style>
