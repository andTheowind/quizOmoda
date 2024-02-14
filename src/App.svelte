<script lang="ts">
  import QuizCard from "./components/QuizCard.svelte";
  import HeaderQuiz from "./components/HeaderQuiz.svelte";
  import FooterQuiz from "./components/FooterQuiz.svelte";
  import CardColumn from "./components/CardColumn.svelte";

  import { windowSize } from "@sveu/browser";
  const { width } = windowSize();
  $: isMobile = $width < 992;

  let selectedColor: string;
  let selectedTradeIn: string;
  let selectedPaymentMethod: string;

  let currentPage: number = 1;
  $: canGoPreviousPage = currentPage > 1;
  $: canGoNextPage = currentPage < 4;

  let currentPageValue: string;
  $: {
    switch (currentPage) {
      case 1:
        currentPageValue = selectedColor;
        break;
      case 2:
        currentPageValue = selectedTradeIn;
        break;
      case 3:
        currentPageValue = selectedPaymentMethod;
        break;
    }
  }

  function nextPage() {
    if (!canGoNextPage) {
      return;
    }
    currentPage += 1;
  }

  function previousPage() {
    if (!canGoPreviousPage) {
      return;
    }
    currentPage -= 1;
  }

  function onColorChange(event?: any) {
    selectedColor = event.detail.value;
    if (currentPage >= 2 || isMobile) {
      return;
    }
    nextPage();
  }

  function onTradeInChange(event?: any) {
    selectedTradeIn = event.detail.value;
    if (currentPage >= 3 || isMobile) {
      return;
    }
    nextPage();
  }

  function onPaymentMethodChange(event?: any) {
    selectedPaymentMethod = event.detail.value;
  }

  function finalContainer(event?: any) {
    selectedPaymentMethod = event.detail.value;
  }
</script>

<HeaderQuiz></HeaderQuiz>

<main>

  <section class="pages">
    <div class="container my-4">
      <div class="row">
        <CardColumn>
          <div class="page" class:selected={currentPage === 1}>
            <QuizCard
              index={1}
              title="Выберите цвет"
              variants={["Красный", "Синий", "Черный"]}
              on:change={onColorChange}
            />
          </div>
        </CardColumn>
        <CardColumn>
          <div
            class="page"
            class:inactive={!selectedColor}
            class:selected={currentPage === 2}
          >
            <QuizCard
              index={2}
              title="Планируете ли сдавать свой авто в trade-in?"
              variants={["Да", "Нет", "Еще не определился"]}
              on:change={onTradeInChange}
            />
          </div>
        </CardColumn>
        <CardColumn>
          <div
            class="page"
            class:inactive={!selectedTradeIn}
            class:selected={currentPage === 3}
          >
            <QuizCard
              index={3}
              title="Как планируете приобретать автомобиль:"
              variants={["Кредит", "Наличные", "Лизинг", "Рассрочка"]}
              on:change={onPaymentMethodChange}
            />
          </div>
        </CardColumn>
      </div>
    </div>
  </section>

  {#if isMobile}
    <div class="controls" >
      <button on:click={previousPage} disabled={!canGoPreviousPage}>
        Previous
      </button>
      <button
        on:click={nextPage}
        disabled={!canGoNextPage || !currentPageValue}
      >
        Next
      </button>
    </div>
  {/if}
  
  {#if selectedColor && !isMobile  && selectedTradeIn && selectedPaymentMethod || (isMobile && currentPage === 4) }
    <div class="container">
      <div class="row">

      </div>
      <div class="row">
        <CardColumn>
          {selectedColor}
        </CardColumn>
        <CardColumn>
          {selectedTradeIn}
        </CardColumn>
        <CardColumn>
          {selectedPaymentMethod}
        </CardColumn>
      </div>
    </div>
  {/if}
    
</main>

<FooterQuiz></FooterQuiz>

<style lang="scss">
  .page {
    opacity: 1;

    &.inactive {
      opacity: 0.5;
    }

    @media (max-width: 992px) {
      &.selected {
        display: block;
      }

      &:not(.selected) {
        display: none;
      }
    }
  }
</style>
