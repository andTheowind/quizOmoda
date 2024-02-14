<div class="card">
  <slot name="cardHeader" />
  <div class="variants">
    <slot />
  </div>
</div>

<style lang="scss">
  .card {
    text-transform: uppercase;

    // .card-title {
    //   display: flex;
    //   align-items: center;
    //   padding: 5px 0;
    //   font-size: 18px;
    // }

    // .card-title p {
    //   text-align: left;
    //   margin-bottom: 0;
    // }

    // .card-index {
    //   display: inline-block;
    //   background-color: #abbbbe;
    //   padding: 4px 15px;
    //   margin-right: 10px;
    //   line-height: 1;
    // }

    // .card-index span {
    //   font-size: 48px;
    //   color: #fff;
    //   min-width: 26px;
    // }

    .variants {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
  }
</style>
