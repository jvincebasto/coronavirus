<template>
  <section
    class="section section-continents"
    id="continents"
    ref="sectContinents"
  >
    <div class="section-margin section-margin--titlegroup">
      <div class="section--titlegroup">
        <h1 class="section--title">Continental Cases</h1>
        <p class="section--subtitle">
          Daily Records of the Virus in each Continent
        </p>
      </div>
    </div>

    <!--     <div class="block" ref="block">
      click here
    </div>
    <p ref="text">block text</p> -->

    <div class="section-margin slider-container">
      <template v-if="continentBool">
        <slider :data="continents">
          <template #component="slot">
            <card-continent :data="slot.prop"></card-continent>
          </template>
        </slider>
      </template>
    </div>
  </section>
</template>

<script>
import cardContinent from "@/components/cards/cardContinent.vue";
import { ref, reactive, defineAsyncComponent } from "vue";
import { /*useStore,*/ createNamespacedHelpers } from "vuex";
const { mapActions: covidActions } = createNamespacedHelpers("covid");

export default {
  data() {
    const conti = [
      {
        updated: 1620392607363,
        cases: 38701507,
        todayCases: 3620,
        deaths: 868551,
        todayDeaths: 232,
        recovered: 30521207,
        todayRecovered: 3212,
        active: 7311749,
        critical: 17151,
        casesPerOneMillion: 65263.3,
        deathsPerOneMillion: 1464.66,
        tests: 507196855,
        testsPerOneMillion: 855298.54,
        population: 593005635,
        continent: "North America",
        undefined: 0,
        activePerOneMillion: 12329.98,
        recoveredPerOneMillion: 51468.66,
        criticalPerOneMillion: 28.92,
        continentInfo: { lat: 31.6768272, long: -146.4707474 },
        countries: [
          "Anguilla",
          "Antigua and Barbuda",
          "Aruba",
          "Bahamas",
          "Barbados",
          "Belize",
          "Bermuda",
          "British Virgin Islands",
          "Canada",
          "Caribbean Netherlands",
          "Cayman Islands",
          "Costa Rica",
          "Cuba",
          "Curaçao",
          "Dominica",
          "Dominican Republic",
          "El Salvador",
          "Greenland",
          "Grenada",
          "Guadeloupe",
          "Guatemala",
          "Haiti",
          "Honduras",
          "Jamaica",
          "Martinique",
          "Mexico",
          "Montserrat",
          "Nicaragua",
          "Panama",
          "Saint Kitts and Nevis",
          "Saint Lucia",
          "Saint Martin",
          "Saint Pierre Miquelon",
          "Saint Vincent and the Grenadines",
          "Sint Maarten",
          "St. Barth",
          "Trinidad and Tobago",
          "Turks and Caicos Islands",
          "USA"
        ]
      },
      {
        updated: 1620392607364,
        cases: 42555508,
        todayCases: 70487,
        deaths: 553548,
        todayDeaths: 1025,
        recovered: 36600026,
        todayRecovered: 70338,
        active: 5401934,
        critical: 33611,
        casesPerOneMillion: 9175.28,
        deathsPerOneMillion: 119.35,
        tests: 785384660,
        testsPerOneMillion: 169334.72,
        population: 4638060428,
        continent: "Asia",
        undefined: 0,
        activePerOneMillion: 1164.7,
        recoveredPerOneMillion: 7891.24,
        criticalPerOneMillion: 7.25,
        continentInfo: { lat: 23.7027273, long: 62.3750637 },
        countries: [
          "Afghanistan",
          "Armenia",
          "Azerbaijan",
          "Bahrain",
          "Bangladesh",
          "Bhutan",
          "Brunei",
          "Cambodia",
          "China",
          "Cyprus",
          "Georgia",
          "Hong Kong",
          "India",
          "Indonesia",
          "Iran",
          "Iraq",
          "Israel",
          "Japan",
          "Jordan",
          "Kazakhstan",
          "Kuwait",
          "Kyrgyzstan",
          "Lao People's Democratic Republic",
          "Lebanon",
          "Macao",
          "Malaysia",
          "Maldives",
          "Mongolia",
          "Myanmar",
          "Nepal",
          "Oman",
          "Pakistan",
          "Palestine",
          "Philippines",
          "Qatar",
          "S. Korea",
          "Saudi Arabia",
          "Singapore",
          "Sri Lanka",
          "Syrian Arab Republic",
          "Taiwan",
          "Tajikistan",
          "Thailand",
          "Timor-Leste",
          "Turkey",
          "UAE",
          "Uzbekistan",
          "Vietnam",
          "Yemen"
        ]
      },
      {
        updated: 1620392607365,
        cases: 25581250,
        todayCases: 1783,
        deaths: 694866,
        todayDeaths: 28,
        recovered: 23239762,
        todayRecovered: 791,
        active: 1646622,
        critical: 27709,
        casesPerOneMillion: 58975.6,
        deathsPerOneMillion: 1601.96,
        tests: 107604019,
        testsPerOneMillion: 248072.79,
        population: 433759862,
        continent: "South America",
        undefined: 0,
        activePerOneMillion: 3796.16,
        recoveredPerOneMillion: 53577.48,
        criticalPerOneMillion: 63.88,
        continentInfo: { lat: -15.6551563, long: -100.7484231 },
        countries: [
          "Argentina",
          "Bolivia",
          "Brazil",
          "Chile",
          "Colombia",
          "Ecuador",
          "Falkland Islands (Malvinas)",
          "French Guiana",
          "Guyana",
          "Paraguay",
          "Peru",
          "Suriname",
          "Uruguay",
          "Venezuela"
        ]
      },
      {
        updated: 1620392607367,
        cases: 45254802,
        todayCases: 40817,
        deaths: 1030192,
        todayDeaths: 1665,
        recovered: 40418873,
        todayRecovered: 90868,
        active: 3805737,
        critical: 27341,
        casesPerOneMillion: 60500.04,
        deathsPerOneMillion: 1377.24,
        tests: 776023610,
        testsPerOneMillion: 1037447.07,
        population: 748012728,
        continent: "Europe",
        undefined: 0,
        activePerOneMillion: 5087.8,
        recoveredPerOneMillion: 54035.01,
        criticalPerOneMillion: 36.55,
        continentInfo: { lat: 25.771324, long: -35.6012256 },
        countries: [
          "Albania",
          "Andorra",
          "Austria",
          "Belarus",
          "Belgium",
          "Bosnia",
          "Bulgaria",
          "Channel Islands",
          "Croatia",
          "Czechia",
          "Denmark",
          "Estonia",
          "Faroe Islands",
          "Finland",
          "France",
          "Germany",
          "Gibraltar",
          "Greece",
          "Holy See (Vatican City State)",
          "Hungary",
          "Iceland",
          "Ireland",
          "Isle of Man",
          "Italy",
          "Latvia",
          "Liechtenstein",
          "Lithuania",
          "Luxembourg",
          "Macedonia",
          "Malta",
          "Moldova",
          "Monaco",
          "Montenegro",
          "Netherlands",
          "Norway",
          "Poland",
          "Portugal",
          "Romania",
          "Russia",
          "San Marino",
          "Serbia",
          "Slovakia",
          "Slovenia",
          "Spain",
          "Sweden",
          "Switzerland",
          "UK",
          "Ukraine"
        ]
      },
      {
        updated: 1620392607368,
        cases: 4649975,
        todayCases: 919,
        deaths: 123948,
        todayDeaths: 11,
        recovered: 4183095,
        todayRecovered: 1000,
        active: 342932,
        critical: 3453,
        casesPerOneMillion: 3400.25,
        deathsPerOneMillion: 90.64,
        tests: 44892737,
        testsPerOneMillion: 32827.34,
        population: 1367541078,
        continent: "Africa",
        undefined: 0,
        activePerOneMillion: 250.77,
        recoveredPerOneMillion: 3058.84,
        criticalPerOneMillion: 2.52,
        continentInfo: { lat: 1.7383867, long: -16.3094636 },
        countries: [
          "Algeria",
          "Angola",
          "Benin",
          "Botswana",
          "Burkina Faso",
          "Burundi",
          "Cabo Verde",
          "Cameroon",
          "Central African Republic",
          "Chad",
          "Comoros",
          "Congo",
          "Côte d'Ivoire",
          "DRC",
          "Djibouti",
          "Egypt",
          "Equatorial Guinea",
          "Eritrea",
          "Ethiopia",
          "Gabon",
          "Gambia",
          "Ghana",
          "Guinea",
          "Guinea-Bissau",
          "Kenya",
          "Lesotho",
          "Liberia",
          "Libyan Arab Jamahiriya",
          "Madagascar",
          "Malawi",
          "Mali",
          "Mauritania",
          "Mauritius",
          "Mayotte",
          "Morocco",
          "Mozambique",
          "Namibia",
          "Niger",
          "Nigeria",
          "Rwanda",
          "Réunion",
          "Saint Helena",
          "Sao Tome and Principe",
          "Senegal",
          "Seychelles",
          "Sierra Leone",
          "Somalia",
          "South Africa",
          "South Sudan",
          "Sudan",
          "Swaziland",
          "Tanzania",
          "Togo",
          "Tunisia",
          "Uganda",
          "Western Sahara",
          "Zambia",
          "Zimbabwe"
        ]
      },
      {
        updated: 1620392607369,
        cases: 63663,
        todayCases: 8,
        deaths: 1209,
        todayDeaths: 0,
        recovered: 60439,
        todayRecovered: 3,
        active: 2015,
        critical: 4,
        casesPerOneMillion: 1490.46,
        deathsPerOneMillion: 28.3,
        tests: 19385093,
        testsPerOneMillion: 453838.99,
        population: 42713591,
        continent: "Australia/Oceania",
        undefined: 0,
        activePerOneMillion: 47.17,
        recoveredPerOneMillion: 1414.98,
        criticalPerOneMillion: 0.09,
        continentInfo: { lat: -8.6599161, long: 91.1469847 },
        countries: [
          "Australia",
          "Fiji",
          "French Polynesia",
          "Marshall Islands",
          "Micronesia",
          "New Caledonia",
          "New Zealand",
          "Papua New Guinea",
          "Samoa",
          "Solomon Islands",
          "Vanuatu",
          "Wallis and Futuna"
        ]
      }
    ];
    return {
      conti
    };
  },
  components: {
    slider: defineAsyncComponent({
      loader: () => import("@/components/slider/slider.vue")
      // delay: 200,
      // timeout: 3000,
      // errorComponent: errorComponent,
      // loadingComponent: loadingComponent,
    }),
    cardContinent
  },
  setup() {
    const continents = reactive([]);
    let bool = ref(false);
    // const store = useStore();

    return {
      continents,
      bool
    };
  },
  methods: {
    ...covidActions(["fetchAllContinents"]),
    async getContinents() {
      this.continents = await this.fetchAllContinents();
      if (this.continents) this.bool = true;
    },
    block() {
      const data = {
        // continents: JSON.stringify(this.continents),
        continents: this.continents,
        bool: this.bool
      };
      console.log("data", data);
    }
  },
  computed: {
    continentBool() {
      return this.bool;
    }
  },
  async mounted() {
    await this.getContinents();
    // this.$refs.block.onclick = this.block;

    // const date = this.$refs.date;
    // const time = this.$refs.time;
    // this.startClock(date, time);
  }
};
</script>

<style scoped lang="scss">
@use "~@/sass/abstracts/abstracts" as abs;

$case-bg: darken(abs.$vars-c-lprimary, 10%);

.block {
  height: 10rem;
  width: 10rem;
  background: green;
  display: none;
}

.slider-container {
  margin: auto;
  margin-bottom: 15rem;
}

.section {
  &-continents {
    $section-bg: lighten(abs.$vars-c-lprimary, 5%);
    background: $section-bg;
  }
  &-margin {
    &--titlegroup {
      margin: 8rem auto 3rem;

      @include abs.mxs-respond(lphone) {
        margin-top: 6rem;
      }
    }
  }
  &--titlegroup {
    text-align: center;
    margin-bottom: 10rem;
  }
  &--title {
    font-family: hbold;
  }
  &--subtitle {
    // font-family: tbody;
    // color: abs.$vars-c-dprimary;
  }
}
</style>
