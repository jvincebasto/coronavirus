<template>
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


  <!-- Total Cases -->
  <card-case class="card" id="total-cases" :data="data" ref="totalcases">
    <template #title>Total Cases</template>
  </card-case>
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
    const newCasesEl = reactive({});
    const totalCasesEl = reactive({});
    const caseEls = reactive({
      newCasesEl,
      totalCasesEl,
    });

    return {
      newCasesEl,
      totalCasesEl,
      caseEls
    }
  },
  components: {
    cardCase,
  },
  methods: {
    elCaseValues(list,value,prop) {
      this[prop].values = [];
      this[prop].items = [];

      for(const cur in list) {
        const el = list[cur];
        const refName = cur.substr(-value.length).toLowerCase();

        if(refName === value.toLowerCase()) 
          this[prop].values.push(el);
        else this[prop].items.push(el);
      }
    },

    // animations
    listValues() {
      const listValues = gsap.timeline({
        scrollTrigger: {
          // markers
          // markers: true,
          // markers: {
          //   startColor: "blue",
          //   endColor: "yellow",
          //   fontSize: "12px"
          // },

          // trigger | (trigger, viewport)
          trigger: this.els.container,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        }
      });

      const unformatNumber = (value) => {
        const filtered = value.split(",").join("");
        return eval(filtered);
      }
      const newcasesValues = this.newCasesEl.values;
      const totalcasesValues = this.totalCasesEl.values;


      for(const cur of newcasesValues)
        listValues.counter(cur,{ end: unformatNumber(cur.innerText)});
      for(const cur of totalcasesValues)
        listValues.counter(cur,{ end: unformatNumber(cur.innerText)});
    },
    listItems() {
      const listItems = gsap.timeline({
        scrollTrigger: {
          // markers
          // markers: true,
          // markers: {
          //   startColor: "blue",
          //   endColor: "yellow",
          //   fontSize: "12px"
          // },

          // trigger | (trigger, viewport)
          trigger: this.els.container,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        }
      });


      const newcasesItems = this.newCasesEl.items;
      const totalcasesItems = this.totalCasesEl.items;


      listItems.from(newcasesItems,{ x: -100, opacity: 0, duration: .5, stagger: .2 });
      listItems.from(totalcasesItems,{ x: -100, opacity: 0, duration: .5, stagger: .2 });
    },
    cards() {
      const cards = gsap.timeline({
        scrollTrigger: {
          // markers
          // markers: true,
          // markers: {
          //   startColor: "green",
          //   endColor: "red",
          //   fontSize: "16px"
          // },

          // trigger | (trigger, viewport)
          trigger: this.els.container,
          start: "top center",
          end: "bottom bottom",
          scrub: 1,
        }
      });

      const newcases = this.$refs.newcases;
      const totalcases = this.$refs.totalcases;


      cards.from(newcases.$el,{ x: 100, opacity: 0, duration: 1 })
      cards.from(totalcases.$el,{ x: 100, opacity: 0, duration: 1 })
    }
  },
  mounted() {
    // this.counter();
    this.elCaseValues(this.$refs.newcases.$refs,"value","newCasesEl");
    this.elCaseValues(this.$refs.totalcases.$refs,"value","totalCasesEl");
    this.counter();
    this.cards();
    this.listItems();
    this.listValues();
  }
};
</script>

<style scoped lang="scss">
@use "~@/sass/abstracts/abstracts" as abs;



#new-cases {
  margin-bottom: 4rem;
}
#total-cases {
  margin-left: -10rem;

  @include abs.mxs-respond(ptablet) {
    margin: 0;
  }
}


</style>
