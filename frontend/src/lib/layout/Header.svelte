<script lang="ts">
  import ThemeIcon from '$lib/ThemeIcon.svelte'
  import Logo from '$lib/logo/logo.svelte'
</script>

<div class="nav-bar">
  <div />

    <a href=".">Feed</a>
    <div class="header-logo">
      <Logo/>
    </div>
    <a href="mint">Manufaktur</a>

  <!-- <div class="theme-icon">
    <ThemeIcon size={25} />
  </div> -->
  <div />
</div>
<hr class="rounded">
<style lang="scss">

.header-logo{
  width: 100px;
}
  .nav-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    font-family: 'Cinzel Decorative',  cursive;
    font-weight: 700;
    font-size: large;
    width: 100vw;
    margin-top: 5px; 
    color: var(--theme-colors-text);
    /* position: absolute;
    top: 0;
    left: 0;
    height: 7vh;
    display: flex;
    */
  }

  .nav-bar a {
    padding: 10px;
    margin-top:50px;
    text-decoration: dotted;
  }

  .theme-icon {
    margin-top:30px;
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
