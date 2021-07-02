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
      
          <div class="covidgroup covidgroup--1" ref="covid1">
            <div class="covidgroup-img covidgroup-img--1">&nbsp;</div>
          </div>
        </div>
      </div>


      <!-- bg block -->
      <div class="col col--2">
        <div class="model--bggroup">
          <div class="covidgroup covidgroup--2" ref="covid2">
            <div class="covidgroup-img covidgroup-img--2">&nbsp;</div>
          </div>
          <div class="model--group" ref="person">
            <div class="model--person">&nbsp;</div>
          </div>
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
      const filter = "drop-shadow(0 2px 10px rgba(0,0,0, 0.5))";
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
@use "~@/sass/styles" as styles;


@include styles.mxs-themes(light) {
  .section-hero {
    background: var(--c-lprimary);
  }
  .model {
    &--group {
      filter: drop-shadow(0 0 0 rgba(black, 0));
    }
    &--person {
      fitler: saturate(2);
      background-image: url("~@/assets/bgs/facemaskBlob@2x.png");
    }
  }
  .headline {
    &-title,
    &-subtitle {
      color: var(--c-dprimary);
    }
  }
  .headline-btn {
    &--text {
      color: var(--c-dprimary);
      border: 2px solid var(--c-dprimary);
    }

    &:hover &--text {
      background: var(--c-dprimary);
      color: var(--c-lprimary);
    }
  }
  .covidgroup {
    filter: drop-shadow(0 0 0 rgba(black,0));

    &-img {
      &--1 {
        @supports(mask: url("~@/assets/covidicons/covidCluster1.svg")) {
          mask: url("~@/assets/covidicons/covidCluster1.svg");
          @include styles.mxs-svg-contain;
        }
        background: url("~@/assets/covidicons/covidCluster1@2x.png");
      }
      &--2 {
        @supports(mask: url("~@/assets/covidicons/covidCluster2.svg")) {
          mask: url("~@/assets/covidicons/covidCluster2.svg");
          @include styles.mxs-svg-contain;
        }
        background: url("~@/assets/covidicons/covidCluster2@2x.png");
      }
    }
  }
  .covidgroup {
    &-img {
      background: var(--c-dprimary);
    }
  }
}


@include styles.mxs-colorThemes('green',light) {
  .model--person {
    filter: hue-rotate(-60deg) saturate(2);
  }  
}
@include styles.mxs-colorThemes('green',dark) {
  .model--person {
    filter: hue-rotate(-60deg);
  }  
}
@include styles.mxs-colorThemes('brown',light) {
  .model--person {
    filter: hue-rotate(-162deg) saturate(2);
  }  
}
@include styles.mxs-colorThemes('brown',dark) {
  .model--person {
    filter: hue-rotate(-162deg);
  }  
}
</style>



<style scoped lang="scss">
@use "~@/sass/styles" as styles;


.row {
  margin-top: 12rem;
  display: flex;

  @include styles.mxs-respond(ltablet) {
    margin-top: 8vw;
  }
  @include styles.mxs-respond(pphone) {
    flex-wrap: wrap;
  }
}
.col {
  flex: 1 0 50%;

  &--1 {
    @include styles.mxs-respond(lphone) {
      flex: 1 1;
    }
    @include styles.mxs-respond(pphone) {
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

    padding: 7rem 0rem;
    position: relative;

    @include styles.mxs-respond(ltablet) {
      min-height: 65rem;
    }
    @include styles.mxs-respond(ptablet) {
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


    @include styles.mxs-respond(ltablet) {
      height: 35rem;
      width: 33rem;
    }
    @include styles.mxs-respond(lphone) {
      height: 33rem;
      width: 30rem;
    }
  }
  &--group {
    height: 100%;
    width: 100%;

    filter: drop-shadow(0 0 0 rgba(black, 0));
    position: relative;
    z-index: 50;
  }
  &--person {
    height: 100%;
    width: 100%;
    @include styles.mxs-img-contain;
  }
}




// headline
.headline {
  &-block {
    min-width: 60rem;
    margin-top: 4rem;
    position: relative;

    @include styles.mxs-respond(ltablet) {
      min-width: 30rem;
    }
    @include styles.mxs-respond(lphone) {
      min-width: 26rem;
    }
    @include styles.mxs-respond(pphone) {
      margin-top: 4vw;
    }
  }

  &-title {
    @include styles.mxs-respond(ltablet) {
      @include styles.mxs-font-size(heading3);
    }
    @include styles.mxs-respond(lphone) {
      @include styles.mxs-font-size(heading4);
    }
  }
  &-subtitle {
    font-family: heading;
    @include styles.mxs-font-size(subtitle1);
    margin-bottom: 4rem;

    @include styles.mxs-respond(lphone) {
      @include styles.mxs-font-size(subtitle2);
    }
  }
  &-btn {

    -webkit-tap-highlight-color: transparent;
    display: inline-block;
    position: relative;
    cursor: pointer;


    &--text {
      font-family: tsemibold;
      @include styles.mxs-font-size(btn);

      display: block;
      padding: 1rem 2rem;
      border-radius: 10rem;

      transition: all 0.3s ease-in-out;
    }
  }
}



// covid icon
.covidgroup {
  position: absolute;
  @include styles.mxs-img-contain;

  &--1 {
    height: 12rem;
    width: 20rem;

    position: relative;
    left: 40%;
    transform: rotateY(180deg);

    @include styles.mxs-respond(lphone) {
      height: 10rem;
      width: 15rem;
      left: 60%;
      transform: none;
    }
    @include styles.mxs-respond(pphone) {
      margin-top: -4rem;
      transform: rotateY(180deg);
    }
  }
  &--2 {
    height: 10rem;
    width: 10rem;

    bottom: -3rem;
    right: -3rem;
  }
  &-img {
    height: 100%;
    width: 100%;
  }
}
</style>
