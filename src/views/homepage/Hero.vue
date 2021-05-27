<template>
  <section class="section section-hero" id="hero" ref="sectHero">
    <div class="section--blob">&nbsp;</div>

    <div class="section-covidCluster section-covidCluster--1" ref="covid1">&nbsp;</div>

    <div class="section-margin section-margin--headline">
      <div class="headline headline-block">
        <h3 class="headline-title headline-title--1" ref="title1">Be aware of</h3>
        <h1 class="headline-title headline-title--2" ref="title2">Corona Virus</h1>

        <div class="headline-subgroup">
          <p class="headline-subtitle" ref="subtitle">Stay safe at all times</p>
          <p class="headline-text" ref="text">
            Welcome! This is a simple covid 19 statistics site, where you can
            view the total infected cases, deaths, recovered and remaining
            infected persons in a country. Learn about your Country's Status
            Now!
          </p>
        </div>

        <div class="headline-btn headline-btnblock" ref="btn">
          <div class="headline-btn headline-btngroup">
            <a class="headline-btn--text" href="#countries">Go Search!</a>
            <span class="headline-btn--icon">&nbsp;</span>
          </div>
          <div class="headline-btn--fill">&nbsp;</div>
        </div>
      </div>
    </div>

    <div class="section-margin section-margin--bg">
      <div class="section-bggroup">
        <div class="section-covidCluster section-covidCluster--2" ref="covid2">&nbsp;</div>
        <div class="section-covidCluster section-covidCluster--3" ref="covid3">&nbsp;</div>
        <div class="section-circlegrids--1">&nbsp;</div>
        <div class="section--person" ref="person">&nbsp;</div>
      </div>
    </div>
  </section>
</template>

<script>
import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// gsap.registerPlugin(ScrollTrigger);

export default {
  methods: {
    // animations
    hero() {
      const ease = "ease";
      const timelineObj = { repeat: -1, yoyo: true };

      const person = gsap.timeline(timelineObj);
      person.to(this.$refs.person,{ y: -20, ease, duration: 5 });
      person.to(this.$refs.person,{ filter: "drop-shadow(0 15px 20px rgba(0,0,0, 0.8))", duration: 5 },"<");


      const covid1 = gsap.timeline(timelineObj);
      covid1.to(this.$refs.covid1,{ y: 10, ease, duration: 3 });
      covid1.to(this.$refs.covid1,{ filter: "drop-shadow(0 2px 4px rgba(0,0,0, 0.5))", duration: 3 },"<");

      const covid2 = gsap.timeline(timelineObj);
      covid2.to(this.$refs.covid2,{ y: 10, ease, duration: 2 });
      covid2.to(this.$refs.covid2,{ filter: "drop-shadow(0 2px 4px rgba(0,0,0, 0.5))", duration: 2 },"<");

      const covid3 = gsap.timeline(timelineObj);
      covid3.to(this.$refs.covid3,{ y: 5, ease, duration: 1 });
      covid3.to(this.$refs.covid3,{ filter: "drop-shadow(0 2px 2px rgba(0,0,0, 0.5))", duration: 1 },"<");
    },
    content() {
      const ease = "ease";
      const timelineObj = {  };

      const headline = gsap.timeline(timelineObj);
      headline.from(this.$refs.title1,{ x: -50, opacity: 0, ease, duration: .5 });
      headline.from(this.$refs.title2,{ x: -50, opacity: 0, ease, duration: .5 },"<+.3");
      headline.from(this.$refs.subtitle,{ y: -10, opacity: 0, ease, duration: .5 },"<+.3");


      headline.from(this.$refs.text,{ y: -30, opacity: 0, ease, duration: 1 },"<+.3");
      headline.from(this.$refs.btn,{ x: -20, opacity: 0, ease, duration: .8 },"<+.5");
    }
  },
  mounted() {
    this.hero();
    this.content();
  }
};
</script>

<style scoped lang="scss">
@use "~@/sass/abstracts/abstracts" as abs;

.section {
  &-hero {
    height: auto;
    min-height: 80rem;
    width: 100%;
    background: abs.$vars-c-lprimary;

    padding: 7rem 0rem;
    position: relative;
  }
  &-margin {
    &--headline {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 500;

      @include abs.mxs-respond(ptablet) {
        position: relative;
        top: 0;
        left: 0;
        transform: none;

        margin-top: 10rem;
      }
      @include abs.mxs-respond(pphone) {
        margin-top: 6rem;
      }
    }

    &--bg {
      height: 100%;
      margin: 0 auto;

      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      @include abs.mxs-respond(ptablet) {
        height: auto;
        margin: 10rem auto 4rem;

        position: relative;
        top: 0;
        left: 0;
        transform: translate(0, 0);
      }
      @include abs.mxs-respond(pphone) {
        margin-top: 8rem;
      }
    }
  }

  &--blob {
    height: 60rem;
    width: 60rem;
    background: url("~@/assets/bgs/blob-1@2x.png");
    @include abs.mxs-img-contain;

    position: absolute;
    top: 0;
    left: 0;

    display: none;

    @include abs.mxs-respond(ptablet) {
      top: -8%;
      height: 65rem;
      width: 65rem;
    }
    @include abs.mxs-respond(lphone) {
      display: none;
    }
  }

  &-bggroup {
    height: 40rem;
    width: 40rem;

    position: absolute;
    top: 55%;
    right: 5%;
    transform: translateY(-50%);

    @include abs.mxs-respond(ltablet) {
      height: 35rem;
      width: 35rem;
    }
    @include abs.mxs-respond(ptablet) {
      position: relative;
      top: 0;
      right: -2%;
      transform: none;

      margin: 0rem auto;
    }
    @include abs.mxs-respond(lphone) {
      right: -5%;
    }
    @include abs.mxs-respond(pphone) {
      height: 25rem;
      width: 25rem;
    }
  }
  &--person {
    height: 100%;
    width: 100%;

    background: url("~@/assets/bgs/facemaskBlob@2x.png");
    @include abs.mxs-img-contain;

    filter: drop-shadow(0 0 0 rgba(black, 0));

    position: relative;
    z-index: 50;
  }

  &-circlegrids {
    &--1 {
      width: 20rem;
      height: 20rem;

      background: url("~@/assets/bgs/circle-grid-10@2x.png");
      @include abs.mxs-img-contain;

      position: absolute;
      top: -2rem;
      right: 2rem;

      @include abs.mxs-respond(ltablet) {
        height: 15rem;
        width: 15rem;
      }
      @include abs.mxs-respond(ptablet) {
        display: none;
      }
    }
  }

  &-covidCluster {
    position: absolute;
    @include abs.mxs-img-contain;

    filter: drop-shadow(0 0 0 rgba(black,0));

    &--1 {
      height: 18rem;
      width: 18rem;

      background: url("~@/assets/covidicons/covidCluster1@2x.png");
      bottom: 5%;
      left: 25%;

      @include abs.mxs-respond(ltablet) {
        height: 15rem;
        width: 15rem;
        bottom: 10%;
        left: 30rem;
      }
      @include abs.mxs-respond(ptablet) {
        display: none;
      }
    }
    &--2 {
      height: 15rem;
      width: 15rem;

      background: url("~@/assets/covidicons/covidCluster1@2x.png");
      top: 0;
      left: -10rem;
      transform: rotateY(180deg);

      @include abs.mxs-respond(ltablet) {
        height: 12rem;
        width: 12rem;
        left: -8rem;
      }
      @include abs.mxs-respond(lphone) {
        height: 10rem;
        width: 10rem;
        left: -4rem;
      }
      @include abs.mxs-respond(pphone) {
        height: 8rem;
        width: 8rem;
      }
    }
    &--3 {
      height: 10rem;
      width: 10rem;

      background: url("~@/assets/covidicons/covidCluster2@2x.png");
      bottom: 0;
      right: 0;

      @include abs.mxs-respond(ltablet) {
        height: 8rem;
        width: 8rem;
      }
      @include abs.mxs-respond(pphone) {
        height: 5rem;
        width: 5rem;
      }
    }
  }
  &-covidCluster {
    @include abs.mxs-img-contain;
  }
}

.headline {
  &-block {
    max-width: 39rem;
    position: relative;
    z-index: 10;

    @include abs.mxs-respond(ptablet) {
      max-width: 51rem;
      margin: auto;
      text-align: center;
    }
    @include abs.mxs-respond(pphone) {
      max-width: 39rem;
      text-align: unset;
    }
  }

  &-title {
    line-height: 1;

    &--1 {
      font-family: tlight;
    }
    &--2 {
      font-size: 4.8rem;
      font-family: hblack;

      @include abs.mxs-respond(pphone) {
        font-size: 4rem;
      }
    }
  }

  &-subgroup {
    margin-bottom: 2rem;
  }
  &-subtitle {
    margin-bottom: 4rem;
    font-family: tbold;
    color: abs.$vars-c-dprimary;
  }
  &-text {
    opacity: 0.8;
  }

  &-btnblock {
    -webkit-tap-highlight-color: transparent;

    display: inline-block;
    position: relative;
    cursor: pointer;

    @include abs.mxs-respond(ptablet) {
      margin-left: 3rem;
    }
    @include abs.mxs-respond(pphone) {
      margin-left: 0;
    }
  }
  &-btngroup {
    display: flex;
  }
  &-btn {
    &--text {
      font-family: tbold;
      font-size: 2rem;
      margin-right: 2rem;
      color: abs.$vars-c-dprimary;
    }
    &--icon {
      height: 100%;
      width: auto;
      min-width: 2rem;

      background-image: url("~@/assets/icons/arrow-1@2x.png");
      @include abs.mxs-img-contain;
      background-position: center 50%;

      transition: all 0.3s ease-in-out;
    }
    &--fill {
      height: 50%;
      width: 2rem;

      // $fill-sat: saturate(abs.$vars-c-lprimary, 50%);
      $fill-lighten: lighten(abs.$vars-c-lprimary, 10%);
      background: $fill-lighten;
      border-radius: 2px;

      position: absolute;
      bottom: 0;
      left: 0;
      z-index: -1;

      transition: all 0.5s ease-in-out;
    }
  }

  &-btnblock:hover &-btn--icon {
    transform: translateX(0.5rem);
  }
  &-btnblock:hover &-btn--fill {
    width: 75%;
  }
}
</style>
