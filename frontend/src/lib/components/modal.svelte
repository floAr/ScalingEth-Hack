<!-- if you're not using typescript, remove lang="ts" attribute from the script tag -->
<script context="module" lang="ts">
  // for passing focus on to the next Modal in the queue.
  // A module context level object is shared among all its component instances. [Read More Here](https://svelte.dev/tutorial/sharing-code)
  const modalList: HTMLElement[] = []
</script>

<script lang="ts">
  import { booleanStore } from '$lib/booleanStore'

  export let open = false
  export let onClose: () => void = () => {}

  const store = booleanStore(open)
  const { isOpen, setTrue, setFalse } = store

  function closeModal() {
    setFalse()
    onClose()
  }
  function keydown(e: KeyboardEvent) {
    e.stopPropagation()
    if (e.key === 'Escape') {
      closeModal()
    }
  }
  function transitionend(e: TransitionEvent) {
    const node = e.target as HTMLElement
    node.focus()
  }
  function modalAction(node: HTMLElement) {
    const returnFn = []
    // for accessibility
    if (document.body.style.overflow !== 'hidden') {
      const original = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      returnFn.push(() => {
        document.body.style.overflow = original
      })
    }
    node.addEventListener('keydown', keydown)
    node.addEventListener('transitionend', transitionend)
    node.focus()
    modalList.push(node)
    returnFn.push(() => {
      node.removeEventListener('keydown', keydown)
      node.removeEventListener('transitionend', transitionend)
      modalList.pop()
      // Optional chaining to guard against empty array.
      modalList[modalList.length - 1]?.focus()
    })
    return {
      destroy: () => returnFn.forEach(fn => fn())
    }
  }
</script>

<slot name="trigger" {setTrue}>
  <!-- fallback trigger to open the modal -->
  <button on:click={setTrue}>Open</button>
</slot>
{#if $isOpen}
  <div class="modal" use:modalAction tabindex="0">
    <div class="backdrop" on:click={closeModal} />

    <div class="content-wrapper">
      <div class="content">
        <slot name="content" {store} />
      </div>

      <slot name="footer" {store}>
        <!-- fallback -->
        <div>
          <h1>Your Modal Footer Goes Here...</h1>
          <button on:click={closeModal}>Close</button>
        </div>
      </slot>
    </div>
  </div>
{/if}

<style>
  :global(body) {
    overflow-y: visible !important;
  }
  div.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 9999;

    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 1;
  }
  div.modal:not(:focus-within) {
    transition: opacity 0.1ms;
    opacity: 0.99;
  }
  div.backdrop {
    background-color: rgba(127, 127, 127, 0.2);
    position: absolute;
    width: 100%;
    height: 100%;
  }
  div.content-wrapper {
    z-index: 10;
    max-width: 70vw;
    border-radius: 0.3rem;
    background-color: var(--theme-colors-background, initial);
  }
  @media (max-width: 767px) {
    div.content-wrapper {
      max-width: 100vw;
    }
  }
  div.content {
    max-height: 50vh;
    max-width: 80vw;
    overflow: visible;
  }
  h1 {
    opacity: 0.5;
  }

  @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
    div.modal {
      -webkit-backdrop-filter: blur(10px);
      backdrop-filter: blur(3px);
    }
    .warning {
      display: none;
    }
  }
</style>
