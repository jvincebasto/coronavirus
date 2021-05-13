<template>
  <footer
    data-section="contacts"
    class="section section-footer"
    id="contacts"
    ref="sectFooter"
  >
    <div class="section-vector--cftop">&nbsp;</div>
    <div class="section-vector--cfbot">&nbsp;</div>
    <div class="section-vector--cfsolar">&nbsp;</div>

    <div class="section-margin">
      <h4 class="section-title">Contacts</h4>
      <p class="section-text">
        Let us know on what improvements we can do for you. Send us a message at
        <span class="section-email">corona@gmail.com</span> or contact us on our
        social media platforms
      </p>

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

      <label class="section-copyright">coronavirus | copyright 2021</label>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
@use "./../sass/abstracts/abstracts" as abs;

$link-text: lighten(abs.$vars-c-black, 20%);

.section {
  &-footer {
    min-height: 40rem;

    background: abs.$vars-c-black;
    color: abs.$vars-c-lprimary;

    position: relative;

    overflow: hidden;

    .section {
      &-vector {
        &--cftop {
          height: 20rem;
          width: 20rem;

          position: absolute;
          top: -7rem;
          left: -8.5rem;

          @supports (mask: url(./../assets/cftop.svg)) {
            mask: url(./../assets/cftop.svg);
            @include abs.mxs-svg-contain;
          }
          background-image: url(./../assets/cftop.svg);
          @include abs.mxs-img-contain;

          // transform: rotateX(180deg) rotateY(180deg);
          @include abs.mxs-respond(lphone) {
            height: 15rem;
            width: 15rem;

            top: -5rem;
            left: -6.5rem;
            display: none;
          }
        }
        &--cfbot {
          height: 20rem;
          width: 20rem;

          position: absolute;
          bottom: -8rem;
          right: -9rem;

          @supports (mask: url(./../assets/cfbot.svg)) {
            mask: url(./../assets/cfbot.svg);
            @include abs.mxs-svg-contain;
          }
          background-image: url(./../assets/cfbot.svg);
          @include abs.mxs-img-contain;

          @include abs.mxs-respond(pphone) {
            height: 15rem;
            width: 16rem;

            bottom: -6rem;
            right: -8rem;
          }
        }
        &--cfsolar {
          height: 15rem;
          width: 25rem;

          position: absolute;
          bottom: 15rem;
          right: 15rem;

          @supports (mask: url(./../assets/cfsolar.svg)) {
            mask: url(./../assets/cfsolar.svg);
            @include abs.mxs-svg-contain;
          }
          background-image: url(./../assets/cfsolar.svg);
          @include abs.mxs-img-contain;

          @include abs.mxs-respond(ptablet) {
            display: none;
          }
        }
      }

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
        margin-bottom: 8rem;
      }

      &-email,
      &-copyright {
        color: $link-text;
        font-family: tbold;
      }
      &-copyright {
        position: absolute;
        bottom: 3rem;
        letter-spacing: 1px;
        text-transform: uppercase;
      }
    }
  }
}

.icon {
  width: 4rem;
  height: 4rem;

  background: abs.$vars-c-lprimary;
  border-radius: 1rem;

  margin-right: 1.5rem;

  span {
    display: block;
    height: 100%;
    width: 100%;
  }

  &-facebook {
    @supports (mask: url(./../assets/facebook.svg)) {
      mask: url(./../assets/facebook.svg);
      @include abs.mxs-svg-contain;
    }
    background-image: url(./../assets/facebook.svg);
    @include abs.mxs-img-contain;
  }
  &-instagram {
    @supports (mask: url(./../assets/instagram.svg)) {
      mask: url(./../assets/instagram.svg);
      @include abs.mxs-svg-contain;
    }
    background-image: url(./../assets/instagram.svg);
    @include abs.mxs-img-contain;
  }
  &-twitter {
    @supports (mask: url(./../assets/twitter.svg)) {
      mask: url(./../assets/twitter.svg);
      @include abs.mxs-svg-contain;
    }
    background-image: url(./../assets/twitter.svg);
    @include abs.mxs-img-contain;
  }
  &-youtube {
    @supports (mask: url(./../assets/youtube.svg)) {
      mask: url(./../assets/youtube.svg);
      @include abs.mxs-svg-contain;
    }
    background-image: url(./../assets/youtube.svg);
    @include abs.mxs-img-contain;
  }
}
</style>
