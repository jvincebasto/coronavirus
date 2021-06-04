<template>
  <section class="section section-hero" id="hero" ref="sectHero">
    <div class="section-margin row">
      
      <!-- headline block -->
      <div class="col col--1">
        <div class="headline headline-block">
          <h2 class="headline-title" ref="title">Search Covid Cases</h2>
          <p class="headline-subtitle" ref="subtitle">by country, continent and globally.</p>


          <div class="headline-btn" ref="btn">
            <a class="headline-btn--text" href="#countries">Go Search</a>
          </div>
      
          <div class="covidgroup covidgroup--1" ref="covid1">&nbsp;</div>
        </div>
      </div>


      <!-- bg block -->
      <div class="col col--2">
        <div class="model--bggroup">
          <div class="covidgroup covidgroup--2" ref="covid2">&nbsp;</div>
          <div class="model--person" ref="person">&nbsp;</div>
        </div>
      </div>
    </div>

  </section>
</template>



<script>
import { gsap } from "gsap";

export default {
  methods: {
    // animations
    model() {
      const timelineObj = { repeat: -1, yoyo: true };
      const filter = "drop-shadow(0 15px 20px rgba(0,0,0, 0.8))";
      function animateObj() {
        return { 
          ease: "ease",
          duration: 5
        }
      }


      const model = gsap.timeline(timelineObj);
      model.to(this.$refs.person,{ y: -20, ...animateObj() });
      model.to(this.$refs.person,{ filter, ...animateObj() },"<");


      return model
    },
    covidIcon() {
      const timelineObj = { repeat: -1, yoyo: true };
      const filter = "drop-shadow(0 2px 4px rgba(0,0,0, 0.5))";
      function animateObj(duration = 2) {
        return { 
          ease: "ease",
          duration,
        }
      };

      const covid1 = gsap.timeline(timelineObj);
      covid1.to(this.$refs.covid1 ,{ y: 10, ...animateObj() });
      covid1.to(this.$refs.covid1 ,{ filter, ...animateObj() },"<");

      const covid2 = gsap.timeline(timelineObj);
      covid2.to(this.$refs.covid2 ,{ y: 10, ...animateObj(1) });
      covid2.to(this.$refs.covid2 ,{ filter, ...animateObj(1) },"<");
    },
    fadeIns() {
      function animateObj() {
        return { 
          opacity: 0,
          ease: "ease",
          duration: .5
        }
      }

      const model = this.model;
      const covidIcon = this.covidIcon;
      const headline = gsap.timeline({ onComplete: function() {

          model();
          covidIcon();
        }
      });
      // content
      headline.from(this.$refs.title,{ x: -50, ...animateObj() },"+1");
      headline.from(this.$refs.subtitle,{ x: -50, ...animateObj() });
      headline.from(this.$refs.btn,{ y: -10, ...animateObj() });


      // bg
      headline.from(this.$refs.person,{ ...animateObj() },"<+.2");
      headline.from(".section-hero .covidgroup",{ stagger: .3, ...animateObj() });

      return headline;
    }
  },
  mounted() {
    this.fadeIns();
  }
};
</script>

<style scoped lang="scss">
@use "~@/sass/abstracts/abstracts" as abs;


.row {
  margin-top: 12rem;
  display: flex;

  @include abs.mxs-respond(ltablet) {
    margin-top: 8vw;
  }
  @include abs.mxs-respond(pphone) {
    flex-wrap: wrap;
  }
}
.col {
  flex: 1 0 50%;

  &--1 {
    @include abs.mxs-respond(lphone) {
      flex: 1 1;
    }
    @include abs.mxs-respond(pphone) {
      margin-bottom: 4rem;
    }
  }
  &--2 {
    display: flex;
    justify-content: center;
  }
}

.section {
  &-hero {
    height: auto;
    min-height: 75rem;
    width: 100%;
    background: abs.$vars-c-lprimary;

    padding: 7rem 0rem;
    position: relative;

    @include abs.mxs-respond(ltablet) {
      min-height: 65rem;
    }
    @include abs.mxs-respond(ptablet) {
      min-height: 25rem;
    }
  }
}



// bg group
.model {
  &--bggroup {
    height: 40rem;
    width: 38rem;
    position: relative;


    @include abs.mxs-respond(ltablet) {
      height: 35rem;
      width: 33rem;
    }
    @include abs.mxs-respond(lphone) {
      height: 33rem;
      width: 30rem;
    }
  }
  &--person {
    height: 100%;
    width: 100%;

    background-image: url("~@/assets/bgs/facemaskBlob@2x.png");
    @include abs.mxs-img-contain;


    filter: drop-shadow(0 0 0 rgba(black, 0));
    position: relative;
    z-index: 50;
  }
}




// headline
.headline {
  &-block {
    min-width: 60rem;
    margin-top: 4rem;
    position: relative;

    @include abs.mxs-respond(ltablet) {
      min-width: 30rem;
    }
    @include abs.mxs-respond(lphone) {
      min-width: 26rem;
    }
    @include abs.mxs-respond(pphone) {
      margin-top: 4vw;
    }
  }

  &-title {
    @include abs.mxs-respond(ltablet) {
      @include abs.mxs-font-type(heading3);
    }
    @include abs.mxs-respond(lphone) {
      @include abs.mxs-font-type(heading4);
    }
  }
  &-subtitle {
    font-family: heading;
    @include abs.mxs-font-type(subtitle1);
    margin-bottom: 4rem;

    @include abs.mxs-respond(lphone) {
      @include abs.mxs-font-type(subtitle2);
    }
  }
  &-btn {

    -webkit-tap-highlight-color: transparent;
    display: inline-block;
    position: relative;
    cursor: pointer;


    &--text {
      font-family: tsemibold;
      @include abs.mxs-font-type(btn);

      display: block;
      padding: 1rem 2rem;
      border-radius: 10rem;
      border: 2px solid abs.$vars-c-dprimary;

      transition: all 0.3s ease-in-out;
    }

    &:hover &--text {
      background: abs.$vars-c-dprimary;
      color: abs.$vars-c-lprimary;
    }
  }
}



// covid icon
.covidgroup {
  position: absolute;
  @include abs.mxs-img-contain;

  filter: drop-shadow(0 0 0 rgba(black,0));

  &--1 {
    height: 12rem;
    width: 20rem;
    background-image: url("~@/assets/covidicons/covidCluster1@2x.png");

    position: relative;
    left: 40%;
    transform: rotateY(180deg);

    @include abs.mxs-respond(lphone) {
      height: 10rem;
      width: 15rem;
      left: 60%;
      transform: none;
    }
    @include abs.mxs-respond(pphone) {
      margin-top: -4rem;
      transform: rotateY(180deg);
    }
  }
  &--2 {
    height: 10rem;
    width: 10rem;

    background-image: url("~@/assets/covidicons/covidCluster2@2x.png");
    bottom: -3rem;
    right: -3rem;
  }
}
</style>
