<template>
  <!-- Navbar -->

  <nav class="nav section">
    <div class="section-margin section-margin--nav">
      <input class="nav-hamberg--checkbox" id="nav-toggle" type="checkbox" ref="hamberg"/>
      <label class="nav-hamberg--btn" for="nav-toggle">
        <span class="nav-hamberg--icon nav-hamberg--icon--1">&nbsp;</span>
        <span class="nav-hamberg--icon nav-hamberg--icon--2">&nbsp;</span>
        <span class="nav-hamberg--icon nav-hamberg--icon--3">&nbsp;</span>
      </label>
      <div class="nav-hamberg--bg">&nbsp;</div>
      <div class="nav--bg">&nbsp;</div>


      <div class="nav--logo">
        <ul class="nav--links">
          <li class="nav--link">
            <a id="logo--anchor" href="#">Corona Virus</a>
          </li>
        </ul>
      </div>

      <div class="nav--block hamberg--block" @click="closeNav($event)">
        <ul class="nav--links hamberg--links">
          <!-- <li ref="bubbleSlider" class="bubble"></li> -->
          <!-- <li><router-link to="/">list</router-link></li> -->
          <li class="nav--link hamberg--link">
            <a href="#global">Global</a>
          </li>
          <li class="nav--link hamberg--link">
            <a href="#continents">Continents</a>
          </li>
          <li class="nav--link hamberg--link">
            <a href="#countries">Countries</a>
          </li>
          <li class="nav--link hamberg--link">
            <a href="#contacts">Contacts</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <div>
    <a class="btn-up" href="#"> </a>
  </div>
</template>

<script>
// import styles from "@/sass/abstracts/_variables.scss";

export default {
  methods: {
    closeNav() {
      this.$refs.hamberg.checked = false;
    }
  },
};
</script>

<style scoped lang="scss">
@use "~@/sass/abstracts/abstracts" as abs;

.bubble {
  background: rgba(white, 0.1);

  position: absolute;
  top: -25%;
  z-index: -100;

  transition: all 0.3s ease-in-out;
}

.section {
  &-margin {
    &--nav {
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      position: relative;
    }
  }
}

.nav {
  -webkit-tap-highlight-color: transparent;

  min-height: unset;
  height: 7rem;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 5000;

  background: abs.$vars-c-dprimary;
}



// Nav Bg
.nav {
  &--bg {
    height: 7rem;
    width: 100%;
    display: none;
    background: abs.$vars-c-dprimary;

    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;

    @include abs.mxs-respond(ptablet) {
      display: block;
    }
  }
}

// Nav Hamberg
.nav-hamberg {
  &--checkbox,
  &--bg {
    height: 4rem;
    width: 4rem;
  }

  &--checkbox,
  &--btn {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
  }

  &--btn {
    height: 2rem;
    width: 3rem;

    cursor: pointer;
    z-index: 100;

    display: none;

    @include abs.mxs-respond(ptablet) {
      display: flex;
      flex-wrap: wrap;
    }
  }
  &--bg {
    background: abs.$vars-c-lprimary;
    border-radius: 10rem;

    position: fixed;
    top: -2px;
    right: -2px;
    z-index: 50;
    opacity: 0;

    transition: all 0.3s ease-in-out;
  }
  &--icon {
    display: block;
    height: 4px;
    width: 100%;
    margin-bottom: 4px;

    background: abs.$vars-c-lprimary;

    transition: all .3s ease-in-out;

    &:last-child {
      margin-bottom: 0;
    }

    &--1 {
      width: 80%;
    }
    &--2 {
      width: 100%;
    }
    &--3 {
      width: 60%;
    }
  }
}



// Nav Hamberg Functions
.nav {
  &-hamberg {
    &--checkbox {
      display: none;
    }
    &--checkbox:checked ~ &--btn &--icon {
      width: 100%;
      background: abs.$vars-c-lprimary;
    }
    &--checkbox:checked ~ &--bg {
      // opacity: 1;
      // transform: scale(100);
    }
  }
  &-hamberg--checkbox:checked ~ &--block {
    opacity: 1;
    top: 0;
  }
}

// Nav Logo
.nav {

  &--logo {
    position: relative;
    z-index: 100;
  }
  &--logo &--link::before {
    height: 10%;
    border-radius: 2px;
    background: abs.$vars-c-lprimary;
  }
  &--logo &--link a {
    // text-transform: uppercase;
    font-family: tbold;
    color: abs.$vars-c-lprimary;

    padding: 0;
  }
}

// Nav Links
.nav {
  &--block {
    transition: all 0.8s ease-in-out;
  }
  &--links {
    display: flex;
  }
  &--link {
    margin-right: 1rem;
    border-radius: 5px;

    // background: rgba(white, 0.1);
    position: relative;

    &::before {
      content: "";
      display: block;

      height: 100%;
      width: 0;
      border-radius: inherit;
      background: rgba(white, .1);

      position: absolute;
      right: 0;
      bottom: 0;
      transform-origin: right;

      transition: all 0.3s ease-in-out;
    }
    &:hover::before {
      width: 100%;

      right: unset;
      left: 0;
      transform-origin: left;
    }
  }
  &--link a {
    display: block;
    text-align: center;
    white-space: pre;
    color: rgba(white,.6);

    padding: .6rem .8rem;
    position: relative;
  }
  &--link:last-child {
    margin-right: 0;
  }
}



// Hamberg Links
.hamberg {
  &--block {
    // transition: all 0.3s ease-in-out;

    @include abs.mxs-respond(ptablet) {
      height: 100%;
      width: 100%;
      // min-width: 30rem;
      background: transparent;
      margin-top: 7rem;

      display: flex;
      justify-content: center;

      position: fixed;
      top: -100%;
      right: 0;
      // right: -50%;
      z-index: -1;

      opacity: 0;
    }
    @include abs.mxs-respond(lphone) {
      min-width: 20rem;
    }
    @include abs.mxs-respond(pphone) {
      min-width: 15rem;
    }
  }
  &--links {
    @include abs.mxs-respond(ptablet) {
      height: 30rem;
      width: 100%;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;


      $links-bg: lighten(abs.$vars-c-dprimary, 2%);
      background: $links-bg;

      // Scroll Bar 
      scrollbar-width: none;
      -ms-overflow-style: none;
      &::-webkit-scrollbar {
        width: 0;
        height: 0;
      }
      // Works on Divs | Track & Thumb 
      &::-webkit-scrollbar-track {
        background: abs.$vars-c-dprimary;
      }
      &::-webkit-scrollbar-thumb {
        background: abs.$vars-c-black;
      }
      &::-webkit-scrollbar-thumb:hover {
        background: abs.$vars-c-lprimary;
      }

      overflow-y: scroll;
    }
  }
  &--link {
    @include abs.mxs-respond(ptablet) {
      height: 100%;
      width: 100%;
      background: transparent;

      margin-right: 0;
      border-radius: 0;

      display: flex;
    }
  }
  &--link {
    &::before {
      @include abs.mxs-respond(ptablet) {
        background: abs.$vars-c-dprimary;

        width: 100%;
        height: 0;

        right: unset;
        bottom: 0;
        transform-origin: bottom;
      }
    }
    &:hover::before {
      @include abs.mxs-respond(ptablet) {
        height: 100%;

        bottom: unset;
        top: 0;
        transform-origin: top;
      }
    }
  }
  &--link a {
    transition: all .3s ease-in-out;

    @include abs.mxs-respond(ptablet) {
      height: 100%;
      width: 100%;

      padding: 0;
      font-family: tbold;


      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  &--link:hover a {
    color: white;

    @include abs.mxs-respond(ptablet) {
      // color: abs.$vars-c-lprimary;
    }
  }
}

</style>
