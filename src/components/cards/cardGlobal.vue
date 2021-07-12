<template>
  <div class="row">

    <div class="col col--1">
      <!-- New Cases -->
      <card-case class="card" id="new-cases" :data="data" ref="newcases">
        <template #title>New Cases</template>
        <template #deathsValue>
          {{ numberFormat(data.todayDeaths) }}
        </template>
        <template #activeRow>
          <template></template>
        </template>
        <template #recoveredValue>
          {{ numberFormat(data.todayRecovered) }}
        </template>
        <template #totalValue>
          {{ numberFormat(data.todayCases) }}
        </template>
      </card-case>
  
      <!-- grids -->
      <div class="grid grid--1">&nbsp;</div>
    </div>


    <div class="col col--2">
      <!-- Total Cases -->
      <card-case class="card" id="total-cases" :data="data" ref="totalcases">
        <template #title>Total Cases</template>
      </card-case>  
  
      <!-- grids -->
      <div class="grid grid--2">&nbsp;</div>
    </div>
  </div>
</template>


<script>
import stringUtilities from "@/mixins/stringUtilities.vue";
import counter from "@/mixins/gsap/counter.vue";
import cardCase from "@/components/cards/cardCase.vue";
import { reactive } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);


export default {
  props: ["data","els"],
  mixins: [stringUtilities,counter],
  setup() {
    const newcasesEl = reactive([]);
    const totalcasesEl = reactive([]);
    const caseEls = reactive({
      newcasesEl,
      totalcasesEl,
    });

    return {
      newcasesEl,
      totalcasesEl,
      caseEls
    }
  },
  components: {
    cardCase,
  },
  methods: {
    caseRefs(list,value,propName) {
      const order = ["deaths","active","recovered","total"];

      for(const curOrder of order) {
        const spanValue = `${curOrder + value}`.toLowerCase();
        const obj = { name: curOrder };

        for(const item in list) {
          const itemValue = item.toLowerCase();
          const el = list[item];

          if(curOrder === itemValue) obj["li"] = el;
          else if(spanValue === itemValue) obj["span"] = el;
        }

        if(obj.li || obj.span) this[propName].push(obj);
      }
    },



    // animations
    listValues() {
      const newcasesValues = this.newcasesEl.values;
      const totalcasesValues = this.totalcasesEl.values;


      const unformatNumber = (value) => {
        const filtered = value.split(",").join("");
        return eval(filtered);
      }


      const listValues = gsap.timeline();
      for(const cur of newcasesValues) 
        listValues.counter(cur,{ end: unformatNumber(cur.innerText)});
      for(const cur of totalcasesValues)
        listValues.counter(cur,{ end: unformatNumber(cur.innerText)});

      return listValues;
    },
    listItems(list) {
      const unformatNumber = (value) => {
        const filtered = value.split(",").join("");
        return eval(filtered);
      }


      const opacity = 0;
      const duration = .5;


      const items = gsap.timeline();
      for(const cur of list) {
        const num = unformatNumber(cur.span.innerText);
        cur.span.innerText = 0;

        items.from(cur.li,{ x: -25, opacity, duration });
        items.counter(cur.span,{ end: num, duration: .2 },"<+.1");
      }
      

      return items;
    },
    cards() {
      const newcases = this.$refs.newcases;
      const totalcases = this.$refs.totalcases;


      const opacity = 0;
      const duration = .5;


      const cards = gsap.timeline();
      cards.from(newcases.$el,{ x: 25, opacity, duration });
      cards.add(this.listItems(this.newcasesEl),"<");
      cards.from(totalcases.$el,{ x: 25, opacity, duration },">")
      cards.add(this.listItems(this.totalcasesEl),"<");

      return cards;
    },
    scroll() {
      const scroll = gsap.timeline({
        scrollTrigger: {
          // markers: {
          //   startColor: "green",
          //   endColor: "red",
          //   fontSize: "16px"
          // },

          // trigger | (trigger, viewport)
          trigger: this.els.container,
          start: "25% center",
          end: "bottom bottom",
          // scrub: 1,
        }
      });

      scroll.add(this.cards());
    }
  },
  mounted() {
    this.caseRefs(this.$refs.newcases.$refs,"value","newcasesEl");
    this.caseRefs(this.$refs.totalcases.$refs,"value","totalcasesEl");
    this.counter();
    
    this.scroll();
    this.cards();
  }
};
</script>

<style scoped lang="scss">
@use "~@/sass/styles" as styles;

@include styles.mxs-themes(light) {
  .grid {
    &--1 {
      @supports(mask: url("~@/assets/bgs/circle-grid-10.svg")) {
        mask: url("~@/assets/bgs/circle-grid-10.svg");
        @include styles.mxs-svg-contain;
      }
      background: url("~@/assets/bgs/circle-grid-10@2x.png");
    }
    &--2 {
      @supports(mask: url("~@/assets/bgs/circle-grid-10.svg")) {
        mask: url("~@/assets/bgs/circle-grid-10.svg");
        @include styles.mxs-svg-contain;
      }
      background: url("~@/assets/bgs/circle-grid-10@2x.png");
    }
  }
  .grid {
    @include styles.mxs-img-contain;
    background: var(--c-dprimary);
  }
  .col {
    :deep(.case-content--block) {
      background: var(--c-white);
    }
  }
}
</style>


<style scoped lang="scss">
@use "~@/sass/styles" as styles;

// row 
.row {
  height: 100%;
  width: 70%;

  display: flex;
  justify-content: center;

  @include styles.mxs-respond(lphone) {
    flex-wrap: wrap;
  }
  @include styles.mxs-respond(pphone) {
    width: 100%;
  }
}

// col
.col {
  padding: 2rem 2rem;
  position: relative;

  display: flex;
  justify-content: center;

  &--1 {
    height: 100%;
  }

  :deep(.case-content--block) {
    max-width: 40rem;
    padding: 5rem;

    position: relative;
    z-index: 10;

    @include styles.mxs-respond(ptablet) {
      max-width: 35rem;
      padding: 3rem;
    }
    @include styles.mxs-respond(pphone) {
      min-width: 30rem;
    }
  }
  :deep(.case-content--title) {
    @include styles.mxs-font-size(subtitle1);
  }
}


// grid
.grid {
  height: 16rem;
  width: 16rem;
  position: absolute;

  &--1 {
    top: -5rem;
    left: -3rem;
  }
  &--2 {
    bottom: -5rem;
    right: -3rem;
  }
}
</style>
