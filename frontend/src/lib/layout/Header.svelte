<script lang="ts">
  import ThemeIcon from '$lib/ThemeIcon.svelte'
</script>

<div class="nav-bar">
  <div />
  <nav>
    <a href=".">home</a>
    <a href="mint">mint</a>
  </nav>
  <div class="theme-icon">
    <ThemeIcon size={25} />
  </div>
</div>

<style lang="postcss">
  .nav-bar {
    position: absolute;
    top: 0;
    left: 0;
    height: 5vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 5px;
  }

  .nav-bar a {
    padding: 10px;
  }

  .theme-icon {
    padding: 0 10px;
  }
</style>
