<template>
  <footer
    data-section="contacts" class="section section-footer" 
      id="contacts" ref="sectFooter">

    <div class="section-margin section-margin--footer">
      <label class="section-copyright">&#169; 2021 CORONASTATS | All Rights Reserved</label>
      <ul class="section-icongroup">
        <li class="icon">
          <span class="icon-facebook">&nbsp;</span>
        </li>
        <li class="icon">
          <span class="icon-instagram">&nbsp;</span>
        </li>
        <li class="icon">
          <span class="icon-twitter">&nbsp;</span>
        </li>
        <li class="icon">
          <span class="icon-youtube">&nbsp;</span>
        </li>
      </ul>
    </div>
  </footer>
</template>

<script>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);


export default {
  methods: {
  },
  mounted() {
  }
};
</script>

<style scoped lang="scss">
@use "~@/sass/abstracts/abstracts" as abs;


.section {
  &-footer {
    padding: 3rem 0;
    min-height: unset;

    background: abs.$vars-c-black;
    color: abs.$vars-c-lprimary;

    position: relative;
    overflow: hidden;

    @include abs.mxs-respond(lphone) {
      padding: 4rem 0 2rem;
    }
  }

  &-margin {
    &--footer {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;

      @include abs.mxs-respond(lphone) {
        flex-direction: column;
        align-items: unset;
      }
    }
  }
}


.section {

  &-title {
    margin-top: 4rem;
    margin-bottom: 3rem;
  }
  &-text {
    max-width: 55rem;
    margin-bottom: 3rem;
  }

  &-icongroup {
    display: flex;

    @include abs.mxs-respond(lphone) {
      order: -1;
      margin-bottom: 2rem;
    }
  }

  &-copyright {
    @include abs.mxs-font-type(captions);
    color: lighten(abs.$vars-c-black, 60%);

    cursor: pointer;
    transition: all .3s ease-in-out;
  }
}


// social media icons
.icon {
  height: 4rem;
  width: 4rem;

  background: abs.$vars-c-lprimary;
  -webkit-tap-highlight-color: transparent;

  margin-right: 1.5rem;
  border-radius: 1rem;

  cursor: pointer;
  transition: all .4s ease-in-out;


  @include abs.mxs-respond(lphone) {
    height: 3rem;
    width: 3rem;
  }

  span {
    display: block;
    height: 100%;
    width: 100%;

    @include abs.mxs-img-contain;
    transition: all .4s ease-in-out;
  }

  &-facebook {
    @supports (mask: url("~@/assets/socialmedia/facebook.svg")) {
      mask: url("~@/assets/socialmedia/facebook.svg");
      @include abs.mxs-svg-contain;
    }
    background-image: url("~@/assets/socialmedia/facebook@2x.png");
  }
  &-instagram {
    @supports (mask: url("~@/assets/socialmedia/instagram.svg")) {
      mask: url("~@/assets/socialmedia/instagram.svg");
      @include abs.mxs-svg-contain;
    }
    background-image: url("~@/assets/socialmedia/instagram@2x.png");
  }
  &-twitter {
    @supports (mask: url("~@/assets/socialmedia/twitter.svg")) {
      mask: url("~@/assets/socialmedia/twitter.svg");
      @include abs.mxs-svg-contain;
    }
    background-image: url("~@/assets/socialmedia/twitter@2x.png");
  }
  &-youtube {
    @supports (mask: url("~@/assets/socialmedia/youtube.svg")) {
      mask: url("~@/assets/socialmedia/youtube.svg");
      @include abs.mxs-svg-contain;
    }
    background-image: url("~@/assets/socialmedia/youtube@2x.png");
  }


  &:hover {
    background: abs.$vars-c-black;
  }
  &:hover span {
    background: abs.$vars-c-lprimary;    
  }
}
</style>
