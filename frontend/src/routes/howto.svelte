<script lang="ts">
  import { browser } from '$app/env'

  import { goto } from '$app/navigation'
  import { howtoStore } from '$lib/secret-manufaktur/persistent-store'

  function launch() {
    if (browser) goto('/')
  }
  if ($howtoStore !== undefined && $howtoStore.includes('seen')) {
    launch()
  }
  $howtoStore = 'seen'
</script>

<div class="main-container">
  <div class="nav-bar">
    <div class="nav-container">
      <div class="header-container left">
        <div class="header-link">
          <div class="connect-text">
            <div class="arrow-container">
              <span class="arrow arrow-top" />
              <span class="arrow arrow-top lesser-opacity" />
            </div>
            <div class="underlined-text">
              This is the entry point of the <b>Secret Manufaktur</b>. Endulge yourself in and
              never-ending stream of impressions.
            </div>
          </div>
        </div>
        <div class="header-link">
          <div class="connect-text">
            <div class="arrow-container">
              <span class="arrow arrow-top" />
              <span class="arrow arrow-top lesser-opacity" />
            </div>
            <div class="underlined-text">
              Visit curated galleries and marvel at the work as it is ment to be perceived.<br /><br
              />Must be connected to the network
            </div>
          </div>
        </div>
      </div>
      <div class="header-logo" />

      <div class="header-container right">
        <div class="header-link">
          <div class="connect-text">
            <div class="arrow-container">
              <span class="arrow arrow-top" />
              <span class="arrow arrow-top lesser-opacity" />
            </div>
            <div class="underlined-text">
              Mint and manufacture your own art here<br /><br />Must be connected to the network
            </div>
          </div>
        </div>

        <div class="header-link">
          <div class="connect-text">
            <div class="arrow-container">
              <span class="arrow arrow-top" />
              <span class="arrow arrow-top lesser-opacity" />
            </div>
            <div class="underlined-text">
              Manage your tokens, your sales and everything else<br /><br />Must be connected to the
              network
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <button class="hae-button" on:click={launch}>Got it. Let me in!</button>
</div>

<style lang="scss">
  .main-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 50vh;
    justify-content: space-between;
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
    padding: 10px 15px;
    overflow: hidden;
    position: relative;
    transition: all 0.4s ease-in-out;
  }

  .hae-button::before {
    position: absolute;
    bottom: -100%;
    left: 0;
    content: '';
    height: 100%;
    width: 100%;
    background-color: var(--theme-colors-text);
    transition: all 0.4s ease-in-out;
  }

  .hae-button:hover::before {
    bottom: 0;
    z-index: -1;
  }

  .hae-button:hover {
    color: var(--theme-colors-background);
    z-index: 10;
  }

  .nav-bar {
    height: 12vh;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: row;
    /* font-family: 'Cinzel Decorative'; */
    color: var(--theme-colors-text);
    margin: -20px 0;
    text-align: center;
  }
  .nav-container {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
  }
  .header-logo {
    width: 100px;
    position: relative;
    cursor: pointer;
    margin-bottom: 8px;
  }

  .toast-login {
    font-weight: normal;
    font-size: x-small;
    position: absolute;
    min-width: max-content;
    width: 300%;
    left: -100%;
    text-align: center;
    font-weight: bold;
  }

  .header-container {
    display: flex;
    align-items: baseline;
    height: 100%;
    width: 30vw;
    justify-content: space-around;
  }

  .header-container.left {
    right: 120%;
  }

  .header-container.right {
    left: 120%;
  }

  .header-link {
    position: relative;
    overflow: hidden;
    flex: 1;
  }

  .arrow-container {
    /* position: absolute; */
    height: 10vh;
    width: 100%;
    left: 0;
    top: 26vh;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    animation: moving 1.6s infinite;
  }

  @keyframes moving {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(10px);
    }
    100% {
      transform: translateY(0px);
    }
  }

  .arrow {
    display: inline-block;
    width: 15px;
    height: 15px;
    border-top: 2px solid var(--theme-colors-text);
    border-right: 2px solid var(--theme-colors-text);
  }

  .arrow-top {
    transform: rotate(-45deg);
  }

  .lesser-opacity {
    opacity: 0.5;
  }
</style>
