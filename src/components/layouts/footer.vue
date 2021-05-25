<template>
  <footer
    data-section="contacts" class="section section-footer" 
      id="contacts" ref="sectFooter">

    <div class="section-margin section-margin--footer">
      <label class="section-copyright">Coronavirus | Copyright 2021</label>
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
export default {

};
</script>

<style scoped lang="scss">
@use "~@/sass/abstracts/abstracts" as abs;

$link-text: lighten(abs.$vars-c-black, 20%);

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
      align-items: center;

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

  &-email,
  &-copyright {
    color: $link-text;
    font-family: tbold;
  }
  &-copyright {
    font-size: 1.6rem;
    cursor: pointer;
    transition: all .3s ease-in-out;
  }
  &-copyright:hover {    
    color: abs.$vars-c-lprimary;
  }
}


.icon {
  height: 4rem;
  width: 4rem;

  background: abs.$vars-c-lprimary;
  border-radius: 1rem;
  cursor: pointer;

  margin-right: 1.5rem;
  transition: all .3s ease-in-out;

  @include abs.mxs-respond(lphone) {
    height: 3rem;
    width: 3rem;
  }

  span {
    display: block;
    height: 100%;
    width: 100%;

    transition: all .3s ease-in-out;
  }

  &-facebook {
    @supports (mask: url("~@/assets/socialmedia/facebook.svg")) {
      mask: url("~@/assets/socialmedia/facebook.svg");
      @include abs.mxs-svg-contain;
    }
    background-image: url("~@/assets/socialmedia/facebook@2x.png");
    @include abs.mxs-img-contain;
  }
  &-instagram {
    @supports (mask: url("~@/assets/socialmedia/instagram.svg")) {
      mask: url("~@/assets/socialmedia/instagram.svg");
      @include abs.mxs-svg-contain;
    }
    background-image: url("~@/assets/socialmedia/instagram@2x.png");
    @include abs.mxs-img-contain;
  }
  &-twitter {
    @supports (mask: url("~@/assets/socialmedia/twitter.svg")) {
      mask: url("~@/assets/socialmedia/twitter.svg");
      @include abs.mxs-svg-contain;
    }
    background-image: url("~@/assets/socialmedia/twitter@2x.png");
    @include abs.mxs-img-contain;
  }
  &-youtube {
    @supports (mask: url("~@/assets/socialmedia/youtube.svg")) {
      mask: url("~@/assets/socialmedia/youtube.svg");
      @include abs.mxs-svg-contain;
    }
    background-image: url("~@/assets/socialmedia/youtube@2x.png");
    @include abs.mxs-img-contain;
  }

  &:hover {
    background: abs.$vars-c-black;
  }
  &:hover span {
    background: abs.$vars-c-lprimary;    
  }
}
</style>
