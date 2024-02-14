<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let index: number;
  export let title: string;
  export let variants: string[];
  export let selectedValue: string | null = null;

  let dispatch = createEventDispatcher();

  function selectedEvent(event?: any) {
    dispatch("change", { value: event.target.value });
  }
</script>

<div class="card">
  <div class="card-title">
    <div class="card-index"><span>{index}</span></div>
    <div class="card-quiestion"><p>{title}</p></div>
  </div>
  <div class="variants">
    {#each variants as variant}
      <label>
        <input
          type="radio"
          on:change={selectedEvent}
          bind:group={selectedValue}
          value={variant}
        />
        {variant}
      </label>
    {/each}
  </div>
</div>

<style lang="scss">

  .card {

    text-transform: uppercase;

    .card-title {
      display: flex;
      align-items: center;
      padding: 5px 0;
      font-size: 18px;
    }

    .card-title p {
      text-align: left;
      margin-bottom: 0;
    }

    .card-index {
      display: inline-block;
      background-color: #ABBBBE;
      padding: 4px 15px;
      margin-right: 10px;
      line-height: 1;
    }

    .card-index span {
      font-size: 48px;  
      color: #fff;
      min-width: 26px;
    }

    .variants {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

  }

</style>
