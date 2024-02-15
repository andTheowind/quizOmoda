<div class="card border-0 p-0">
  <slot name="cardHeader" />
  <div class="variants mt-3">
    <slot />
  </div>
</div>

<style lang="scss">
  .card {
    text-transform: uppercase;

    .variants {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
  }
</style>
