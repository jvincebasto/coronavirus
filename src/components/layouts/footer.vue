<template>
  <footer
    data-section="contacts" class="section section-footer" 
      id="contacts" ref="sectFooter" color-static="light">

    <div class="section-margin section-margin--footer">
      <label class="section-copyright">&#169; 2021 CORONASTATS | All Rights Reserved</label>
      <ul class="section-icongroup">
        <li class="icongroup">
          <span class="icon icon-facebook">&nbsp;</span>
        </li>
        <li class="icongroup">
          <span class="icon icon-instagram">&nbsp;</span>
        </li>
        <li class="icongroup">
          <span class="icon icon-twitter">&nbsp;</span>
        </li>
        <li class="icongroup">
          <span class="icon icon-youtube">&nbsp;</span>
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
@use "~@/sass/styles" as styles;

@include styles.mxs-themes(light) {

  .section {
    &-footer {
      background: var(--sc-black);
      color: var(--sc-lprimary);
    }
  }
  .section {
    &-copyright {
      @include styles.mxs-font-size(captions);
      -webkit-tap-highlight-color: transparent;
      color: var(--sc-white);
    }
  }

  .icon {
    -webkit-tap-highlight-color: transparent;

    &-facebook {
      @supports (mask: url("~@/assets/socialmedia/facebook.svg")) {
        mask: url("~@/assets/socialmedia/facebook.svg");
        @include styles.mxs-svg-contain;
      }
      background: url("~@/assets/socialmedia/facebook@2x.png");
    }
    &-instagram {
      @supports (mask: url("~@/assets/socialmedia/instagram.svg")) {
        mask: url("~@/assets/socialmedia/instagram.svg");
        @include styles.mxs-svg-contain;
      }
      background: url("~@/assets/socialmedia/instagram@2x.png");
    }
    &-twitter {
      @supports (mask: url("~@/assets/socialmedia/twitter.svg")) {
        mask: url("~@/assets/socialmedia/twitter.svg");
        @include styles.mxs-svg-contain;
      }
      background: url("~@/assets/socialmedia/twitter@2x.png");
    }
    &-youtube {
      @supports (mask: url("~@/assets/socialmedia/youtube.svg")) {
        mask: url("~@/assets/socialmedia/youtube.svg");
        @include styles.mxs-svg-contain;
      }
      background: url("~@/assets/socialmedia/youtube@2x.png");
    }
  }
  .icon {
    @include styles.mxs-img-contain;
    background: var(--sc-lprimary);
  }
  .icongroup {
    background: styles.fns-lighten(var(--sc-black), 4);

    &:hover {
      background: var(--sc-black);
    }
    &:hover .icon {
      background: var(--sc-defwhite);    
    }
  }
}


@include styles.mxs-themes(dark) {

  .icongroup {
    // background: styles.fns-darken(var(--sc-black), 4);
  }
}
</style>

<style scoped lang="scss">
@use "~@/sass/styles" as styles;


.section {
  &-footer {
    padding: 3rem 0;
    min-height: unset;

    position: relative;
    overflow: hidden;

    @include styles.mxs-respond(lphone) {
      padding: 4rem 0 2rem;
    }
  }

  &-margin {
    &--footer {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;

      @include styles.mxs-respond(lphone) {
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

    @include styles.mxs-respond(lphone) {
      order: -1;
      margin-bottom: 2rem;
    }
  }

  &-copyright {
    @include styles.mxs-font-size(captions);
    transition: all .3s ease-in-out;
  }
}


// social media icons
.icongroup {
  height: 4rem;
  width: 4rem;

  margin-right: 1.5rem;
  border-radius: 1rem;

  cursor: pointer;
  transition: all .4s ease-in-out;


  @include styles.mxs-respond(lphone) {
    height: 3rem;
    width: 3rem;
  }
}
.icon {
  display: block;
  height: 100%;
  width: 100%;

  transition: all .4s ease-in-out;
}
</style>
