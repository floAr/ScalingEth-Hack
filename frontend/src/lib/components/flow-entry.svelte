<script lang="ts">
  export const id = 0
  import Lazy from 'svelte-lazy'
</script>

<Lazy
height={250}
fadeOption={{ delay: 200, duration: 600 }}
placeholder={''}
class="flow-lazy"

>
<div class="flow-card">
    <div class="flow-content" />
  </div>
  </Lazy>

<style lang="scss">
  .flow-card {
    width: 250px;
    height: 250px;
  }
  .flow-lazy {
    width: 100%;
    height: 100%;
  }
  .flow-content {
    width: 100%;
    height: 100%;
    background: url('https://bafybeiacvl6ff2aqn7pdhghqvd6kzeoovze4tjrkzil4m7xels2pjmht3u.ipfs.dweb.link/');
    background-size: cover;
    margin: 1px;
  }
</style>
