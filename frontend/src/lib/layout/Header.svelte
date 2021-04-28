<script lang="ts">
  import ThemeIcon from '$lib/ThemeIcon.svelte'
  import Logo from '$lib/logo/logo.svelte'
</script>

<div class="nav-bar">
  <div class="nav-container">
    <div class="header-link">
      <a href=".">Feed</a>
    </div>
    <div class="header-logo">
      <Logo />
      <div class="toast-login">click to connect keplr</div>
    </div>
    <div class="header-link">
      <a href="mint">Manufaktur</a>
    </div>
  </div>

  <!-- <div class="theme-icon">
    <ThemeIcon size={25} />
  </div> -->
</div>
<hr class="rounded" />

<style lang="scss">

.nav-container {
  display: flex;
  flex-direction: row;
  align-items: center;
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
    width: 200%;
    left: -50%;
    text-align: center;
  }

  .header-container {
    min-width: 20vw;
  }

  .header-link {
    position: relative;
    overflow: hidden;
    margin: 0 10vw;
  }

  .header-link a {
    text-decoration: none;
  }

  .header-link::before {
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

  .header-link:focus-within::before {
    left: 0;
  }

  .header-link:hover::before {
    left: 0;
  }
  .header-link a:visited {
    color: var(--theme-colors-text);
  }
  .nav-bar {
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: row;
    font-family: 'Cinzel Decorative', cursive;
    font-weight: 700;
    font-size: large;
    width: 100vw;
    color: var(--theme-colors-text);
    margin: 10px 0;
  }
  .theme-icon {
    margin-top: 30px;
    padding: 0 10px;
  }

  /* Rounded border */
  hr.rounded {
    border-top: 1px solid #bbb;
    border-radius: 5px;
    width: 90vw;
    transform: translateY(-5px);
  }
</style>
