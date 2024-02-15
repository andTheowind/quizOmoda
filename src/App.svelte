<script lang="ts">
  import CardHeader from "./components/CardHeader.svelte";
  import HeaderQuiz from "./components/HeaderQuiz.svelte";
  import FooterQuiz from "./components/FooterQuiz.svelte";

  import CardDefaultColumns from "./components/CardDefaultColumns.svelte";
  import CardSixColumns from "./components/CardSixColumns.svelte";
  import CardEightColumns from "./components/CardEightColumns.svelte";
  import CardTwelveColumns from "./components/CardTwelveColumns.svelte";

  import { windowSize } from "@sveu/browser";
  import { getCarsData, type CarInfo } from "./stores/carInfoStore";
  import QuizCard from "./components/QuizCard.svelte";
  import RadioColoredList from "./components/RadioColoredList.svelte";
  import RadioList from "./components/RadioList.svelte";

  let carVariants = getCarsData();

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

  async function getVariantByValue(value: string): Promise< CarInfo | undefined > {
    const variant = await carVariants; 
    return variant.find((variant) => variant.value === value);
  }

  async function getPreviewImage(value: string) {
    let variant = await getVariantByValue(value);
    if(variant === undefined) {
      return '/assets/img/black.png';
    }
    return variant.previewImage;
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
    selectedColor = event.detail.event;
    if (currentPage >= 2 || isMobile) {
      return;
    }
    nextPage();
  }

  function onTradeInChange(event?: any) {
    selectedTradeIn = event.detail.event;
    console.log('yo', selectedTradeIn);
    if (currentPage >= 3 || isMobile) {
      return;
    }
    nextPage();
  }

  function onPaymentMethodChange(event?: any) {
    selectedPaymentMethod = event.detail.event;
  }

  let firstBanner = true;
</script>

<HeaderQuiz></HeaderQuiz>

<main>

  {#if firstBanner}
  <section class="first-banner" style="min-height: 100vh">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <button on:click={() => firstBanner = false}>Start</button>
        </div>
      </div>
    </div>
  </section>
  {/if}

  {#if !((selectedColor && !isMobile && selectedTradeIn && selectedPaymentMethod) || (isMobile && currentPage === 4)) && !firstBanner}

  <section class="pages">
    <div class="container my-4">
      <div class="row">
        <CardDefaultColumns>
          <div class="page" class:selected={currentPage === 1}>
            <QuizCard>
              <CardHeader slot="cardHeader" index={1} title="Выберите цвет" />
              {#await carVariants}
              {:then variants}
              <RadioColoredList
                variants={variants}
                bind:selectedValue={selectedColor}
                on:change={onColorChange}
              />
              {:catch}
              {/await}
            </QuizCard>
          </div>
        </CardDefaultColumns>
        <CardEightColumns>
          <div class="row">
            <CardSixColumns>
              <div
                class="page"
                class:inactive={!selectedColor}
                class:selected={currentPage === 2}
              >
                <QuizCard>
                  <CardHeader
                    slot="cardHeader"
                    index={2}
                    title="Планируете ли сдавать свой авто в trade-in?"
                  />
                  <RadioList
                    variants={[
                      { value: "yes", displayName: "Да" },
                      { value: "no", displayName: "Нет" },
                      { value: "maybe", displayName: "Еще не определился" },
                    ]}
                    bind:selectedValue={selectedTradeIn}
                    on:change={onTradeInChange}
                    disabled={!selectedColor}
                  />
                </QuizCard>
              </div>
            </CardSixColumns>
            <CardSixColumns>
              <div
                class="page"
                class:inactive={!selectedTradeIn}
                class:selected={currentPage === 3}
              >
                <QuizCard>
                  <CardHeader
                    slot="cardHeader"
                    index={3}
                    title="Как планируете приобретать автомобиль?"
                  />
                  <RadioList
                    variants={[
                      { value: "credit", displayName: "Кредит" },
                      { value: "cash", displayName: "Наличные" },
                      { value: "leasing", displayName: "Лизинг" },
                      { value: "installment", displayName: "Рассрочка" },
                    ]}
                    bind:selectedValue={selectedPaymentMethod}
                    on:change={onPaymentMethodChange}
                    disabled={!selectedTradeIn}
                  />
                </QuizCard>
              </div>
            </CardSixColumns>
            <CardTwelveColumns>
              <div class="preview-img-wrap text-end w-100">
                {#await getPreviewImage(selectedColor)}
                {:then previewImage }
                <img
                    src={previewImage}
                    class="img-fluid"
                    class:opacity-50={!selectedColor}
                    alt=""
                />
                {:catch}
                {/await}
              </div>
            </CardTwelveColumns>
          </div>
        </CardEightColumns>
        <!-- <CardColumn>
          <div
            class="page"
            class:inactive={!selectedColor}
            class:selected={currentPage === 2}
          >
            <QuizCard>
              <CardHeader
                slot="cardHeader"
                index={2}
                title="Планируете ли сдавать свой авто в trade-in?"
              />
              <RadioList
                variants={[
                  { value: "yes", displayName: "Да" },
                  { value: "no", displayName: "Нет" },
                  { value: "maybe", displayName: "Еще не определился" },
                ]}
                bind:selectedValue={selectedTradeIn}
                on:change={onTradeInChange}
                disabled={!selectedColor}
              />
            </QuizCard>
          </div>
        </CardColumn>
        <CardColumn>
          <div
            class="page"
            class:inactive={!selectedTradeIn}
            class:selected={currentPage === 3}
          >
            <QuizCard>
              <CardHeader
                slot="cardHeader"
                index={3}
                title="Как планируете приобретать автомобиль?"
              />
              <RadioList
                variants={[
                  { value: "credit", displayName: "Кредит" },
                  { value: "cash", displayName: "Наличные" },
                  { value: "leasing", displayName: "Лизинг" },
                  { value: "installment", displayName: "Рассрочка" },
                ]}
                bind:selectedValue={selectedPaymentMethod}
                on:change={onPaymentMethodChange}
                disabled={!selectedTradeIn}
              />
            </QuizCard>
          </div>
        </CardColumn> -->
      </div>
    </div>
  </section>

  {/if}

  {#if isMobile && !firstBanner}
    <div class="controls">
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

  {#if (selectedColor && !isMobile && selectedTradeIn && selectedPaymentMethod) || (isMobile && currentPage === 4) && !firstBanner}
    <div class="container">
      <div class="row">
        <div class="col-6">
          <div class="final-image-wrap">
            {#await getVariantByValue(selectedColor)}
            {:then variant }
            <img src={variant?.finalImage} class="img-fluid" alt="">
            {:catch}
            {/await}
          </div>
        </div>
        <div class="col-6">
          <div>blabla</div>
        </div>
      </div>
      <div class="row">
        <CardDefaultColumns>
          {selectedColor}
        </CardDefaultColumns>
        <CardDefaultColumns>
          {selectedTradeIn}
        </CardDefaultColumns>
        <CardDefaultColumns>
          {selectedPaymentMethod}
        </CardDefaultColumns>
      </div>
    </div>
  {/if} 
</main>

<FooterQuiz></FooterQuiz>

<style lang="scss">
  .preview-img-wrap {
    display: flex;
    justify-content: flex-end;
  }
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

  @media (min-width: 1200px) and (max-width: 1919.98px) {
    .preview-img-wrap {
      max-width: 686px;
      margin-left: auto;
      padding-right: 15px;
    }
  }
</style>
