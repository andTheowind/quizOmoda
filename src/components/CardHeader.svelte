<script lang="ts">
  export let index: number;
  export let title: string;
</script>

<div class="card-title">
  <div class="card-index">
    <span>{index}</span>
  </div>
  <div class="card-quiestion">
    <p>{title}</p>
  </div>
</div>

<style scoped lang="scss">
  .card-title {
    display: flex;
    align-items: center;
    padding: 5px 0;
  }

  .card-title p {
    text-align: left;
    margin-bottom: 0;
    max-width: 254px;
    font-size: 18px;
    font-weight: 700;
  }

  .card-index {
    display: inline-block;
    background-color: #abbbbe;
    padding: 4px 15px;
    margin-right: 20px;
    line-height: 1;
  }

  .card-index span {
    font-size: 48px;
    color: #fff;
    min-width: 26px;
  }
</style>
