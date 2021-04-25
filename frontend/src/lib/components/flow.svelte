<script lang="ts">
import FlowEntry from '$lib/components/flow-entry.svelte'
    </script>
<div class="flow-grid">
    {#each Array(10) as row, _}
  <FlowEntry id={row}/>
  {/each}
</div>


    <style>
        .flow-grid{
            display: flex;
            flex-wrap: wrap;
        }
    </style>