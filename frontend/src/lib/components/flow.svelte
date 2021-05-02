<script lang="ts">
  import FlowEntry from '$lib/components/flow-entry.svelte'
</script>

<div class="flow-container">
  <div class="flow-center">
    <div class="flow-grid">
      {#each Array(500) as row, _}
        <FlowEntry id={row} />
      {/each}
    </div>
  </div>
</div>

<style>
  .flow-container {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .flow-center {
  }
  .flow-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 75vw;
  }
</style>
