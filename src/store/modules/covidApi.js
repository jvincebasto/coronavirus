export default {
  state() {
    const countryTest = [
      { country: "Afghanistan", iso2: "AF", iso3: "AFG" },
      { country: "Albania", iso2: "AL", iso3: "ALB" },
      { country: "Algeria", iso2: "DZ", iso3: "DZA" },
      { country: "Andorra", iso2: "AD", iso3: "AND" },
      { country: "Angola", iso2: "AO", iso3: "AGO" },
      { country: "Anguilla", iso2: "AI", iso3: "AIA" },
      { country: "Antigua and Barbuda", iso2: "AG", iso3: "ATG" },
      { country: "Argentina", iso2: "AR", iso3: "ARG" },
      { country: "Armenia", iso2: "AM", iso3: "ARM" },
      { country: "Aruba", iso2: "AW", iso3: "ABW" }
      // { country: "Diamond Princess", iso2: "null", iso3: "null" },
      // { country: "MS Zaandam", iso2: "null", iso3: "null" },
    ];
    const countryNames = [
      { country: "Afghanistan", iso2: "AF", iso3: "AFG" },
      { country: "Albania", iso2: "AL", iso3: "ALB" },
      { country: "Algeria", iso2: "DZ", iso3: "DZA" },
      { country: "Andorra", iso2: "AD", iso3: "AND" },
      { country: "Angola", iso2: "AO", iso3: "AGO" },
      { country: "Anguilla", iso2: "AI", iso3: "AIA" },
      { country: "Antigua and Barbuda", iso2: "AG", iso3: "ATG" },
      { country: "Argentina", iso2: "AR", iso3: "ARG" },
      { country: "Armenia", iso2: "AM", iso3: "ARM" },
      { country: "Aruba", iso2: "AW", iso3: "ABW" },
      { country: "Australia", iso2: "AU", iso3: "AUS" },
      { country: "Austria", iso2: "AT", iso3: "AUT" },
      { country: "Azerbaijan", iso2: "AZ", iso3: "AZE" },
      { country: "Bahamas", iso2: "BS", iso3: "BHS" },
      { country: "Bahrain", iso2: "BH", iso3: "BHR" },
      { country: "Bangladesh", iso2: "BD", iso3: "BGD" },
      { country: "Barbados", iso2: "BB", iso3: "BRB" },
      { country: "Belarus", iso2: "BY", iso3: "BLR" },
      { country: "Belgium", iso2: "BE", iso3: "BEL" },
      { country: "Belize", iso2: "BZ", iso3: "BLZ" },
      { country: "Benin", iso2: "BJ", iso3: "BEN" },
      { country: "Bermuda", iso2: "BM", iso3: "BMU" },
      { country: "Bhutan", iso2: "BT", iso3: "BTN" },
      { country: "Bolivia", iso2: "BO", iso3: "BOL" },
      { country: "Bosnia", iso2: "BA", iso3: "BIH" },
      { country: "Botswana", iso2: "BW", iso3: "BWA" },
      { country: "Brazil", iso2: "BR", iso3: "BRA" },
      { country: "British Virgin Islands", iso2: "VG", iso3: "VGB" },
      { country: "Brunei", iso2: "BN", iso3: "BRN" },
      { country: "Bulgaria", iso2: "BG", iso3: "BGR" },
      { country: "Burkina Faso", iso2: "BF", iso3: "BFA" },
      { country: "Burundi", iso2: "BI", iso3: "BDI" },
      { country: "Cabo Verde", iso2: "CV", iso3: "CPV" },
      { country: "Cambodia", iso2: "KH", iso3: "KHM" },
      { country: "Cameroon", iso2: "CM", iso3: "CMR" },
      { country: "Canada", iso2: "CA", iso3: "CAN" },
      { country: "Caribbean Netherlands", iso2: "BQ", iso3: "BES" },
      { country: "Cayman Islands", iso2: "KY", iso3: "CYM" },
      { country: "Central African Republic", iso2: "CF", iso3: "CAF" },
      { country: "Chad", iso2: "TD", iso3: "TCD" },
      { country: "Channel Islands", iso2: "JE", iso3: "JEY" },
      { country: "Chile", iso2: "CL", iso3: "CHL" },
      { country: "China", iso2: "CN", iso3: "CHN" },
      { country: "Colombia", iso2: "CO", iso3: "COL" },
      { country: "Comoros", iso2: "KM", iso3: "COM" },
      { country: "Congo", iso2: "CG", iso3: "COG" },
      { country: "Costa Rica", iso2: "CR", iso3: "CRI" },
      { country: "Croatia", iso2: "HR", iso3: "HRV" },
      { country: "Cuba", iso2: "CU", iso3: "CUB" },
      { country: "Curaçao", iso2: "CW", iso3: "CUW" },
      { country: "Cyprus", iso2: "CY", iso3: "CYP" },
      { country: "Czechia", iso2: "CZ", iso3: "CZE" },
      { country: "Côte d'Ivoire", iso2: "CI", iso3: "CIV" },
      { country: "DRC", iso2: "CD", iso3: "COD" },
      { country: "Denmark", iso2: "DK", iso3: "DNK" },
      { country: "Diamond Princess", iso2: "null", iso3: "null" },
      { country: "Djibouti", iso2: "DJ", iso3: "DJI" },
      { country: "Dominica", iso2: "DM", iso3: "DMA" },
      { country: "Dominican Republic", iso2: "DO", iso3: "DOM" },
      { country: "Ecuador", iso2: "EC", iso3: "ECU" },
      { country: "Egypt", iso2: "EG", iso3: "EGY" },
      { country: "El Salvador", iso2: "SV", iso3: "SLV" },
      { country: "Equatorial Guinea", iso2: "GQ", iso3: "GNQ" },
      { country: "Eritrea", iso2: "ER", iso3: "ERI" },
      { country: "Estonia", iso2: "EE", iso3: "EST" },
      { country: "Ethiopia", iso2: "ET", iso3: "ETH" },
      { country: "Falkland Islands (Malvinas)", iso2: "FK", iso3: "FLK" },
      { country: "Faroe Islands", iso2: "FO", iso3: "FRO" },
      { country: "Fiji", iso2: "FJ", iso3: "FJI" },
      { country: "Finland", iso2: "FI", iso3: "FIN" },
      { country: "France", iso2: "FR", iso3: "FRA" },
      { country: "French Guiana", iso2: "GF", iso3: "GUF" },
      { country: "French Polynesia", iso2: "PF", iso3: "PYF" },
      { country: "Gabon", iso2: "GA", iso3: "GAB" },
      { country: "Gambia", iso2: "GM", iso3: "GMB" },
      { country: "Georgia", iso2: "GE", iso3: "GEO" },
      { country: "Germany", iso2: "DE", iso3: "DEU" },
      { country: "Ghana", iso2: "GH", iso3: "GHA" },
      { country: "Gibraltar", iso2: "GI", iso3: "GIB" },
      { country: "Greece", iso2: "GR", iso3: "GRC" },
      { country: "Greenland", iso2: "GL", iso3: "GRL" },
      { country: "Grenada", iso2: "GD", iso3: "GRD" },
      { country: "Guadeloupe", iso2: "GP", iso3: "GLP" },
      { country: "Guatemala", iso2: "GT", iso3: "GTM" },
      { country: "Guinea", iso2: "GN", iso3: "GIN" },
      { country: "Guinea-Bissau", iso2: "GW", iso3: "GNB" },
      { country: "Guyana", iso2: "GY", iso3: "GUY" },
      { country: "Haiti", iso2: "HT", iso3: "HTI" },
      { country: "Holy See (Vatican City State)", iso2: "VA", iso3: "VAT" },
      { country: "Honduras", iso2: "HN", iso3: "HND" },
      { country: "Hong Kong", iso2: "HK", iso3: "HKG" },
      { country: "Hungary", iso2: "HU", iso3: "HUN" },
      { country: "Iceland", iso2: "IS", iso3: "ISL" },
      { country: "India", iso2: "IN", iso3: "IND" },
      { country: "Indonesia", iso2: "ID", iso3: "IDN" },
      { country: "Iran", iso2: "IR", iso3: "IRN" },
      { country: "Iraq", iso2: "IQ", iso3: "IRQ" },
      { country: "Ireland", iso2: "IE", iso3: "IRL" },
      { country: "Isle of Man", iso2: "IM", iso3: "IMN" },
      { country: "Israel", iso2: "IL", iso3: "ISR" },
      { country: "Italy", iso2: "IT", iso3: "ITA" },
      { country: "Jamaica", iso2: "JM", iso3: "JAM" },
      { country: "Japan", iso2: "JP", iso3: "JPN" },
      { country: "Jordan", iso2: "JO", iso3: "JOR" },
      { country: "Kazakhstan", iso2: "KZ", iso3: "KAZ" },
      { country: "Kenya", iso2: "KE", iso3: "KEN" },
      { country: "Kuwait", iso2: "KW", iso3: "KWT" },
      { country: "Kyrgyzstan", iso2: "KG", iso3: "KGZ" },
      { country: "Lao People's Democratic Republic", iso2: "LA", iso3: "LAO" },
      { country: "Latvia", iso2: "LV", iso3: "LVA" },
      { country: "Lebanon", iso2: "LB", iso3: "LBN" },
      { country: "Lesotho", iso2: "LS", iso3: "LSO" },
      { country: "Liberia", iso2: "LR", iso3: "LBR" },
      { country: "Libyan Arab Jamahiriya", iso2: "LY", iso3: "LBY" },
      { country: "Liechtenstein", iso2: "LI", iso3: "LIE" },
      { country: "Lithuania", iso2: "LT", iso3: "LTU" },
      { country: "Luxembourg", iso2: "LU", iso3: "LUX" },
      { country: "MS Zaandam", iso2: "null", iso3: "null" },
      { country: "Macao", iso2: "MO", iso3: "MAC" },
      { country: "Macedonia", iso2: "MK", iso3: "MKD" },
      { country: "Madagascar", iso2: "MG", iso3: "MDG" },
      { country: "Malawi", iso2: "MW", iso3: "MWI" },
      { country: "Malaysia", iso2: "MY", iso3: "MYS" },
      { country: "Maldives", iso2: "MV", iso3: "MDV" },
      { country: "Mali", iso2: "ML", iso3: "MLI" },
      { country: "Malta", iso2: "MT", iso3: "MLT" },
      { country: "Marshall Islands", iso2: "MH", iso3: "MHL" },
      { country: "Martinique", iso2: "MQ", iso3: "MTQ" },
      { country: "Mauritania", iso2: "MR", iso3: "MRT" },
      { country: "Mauritius", iso2: "MU", iso3: "MUS" },
      { country: "Mayotte", iso2: "YT", iso3: "MYT" },
      { country: "Mexico", iso2: "MX", iso3: "MEX" },
      { country: "Micronesia", iso2: "FM", iso3: "FSM" },
      { country: "Moldova", iso2: "MD", iso3: "MDA" },
      { country: "Monaco", iso2: "MC", iso3: "MCO" },
      { country: "Mongolia", iso2: "MN", iso3: "MNG" },
      { country: "Montenegro", iso2: "ME", iso3: "MNE" },
      { country: "Montserrat", iso2: "MS", iso3: "MSR" },
      { country: "Morocco", iso2: "MA", iso3: "MAR" },
      { country: "Mozambique", iso2: "MZ", iso3: "MOZ" },
      { country: "Myanmar", iso2: "MM", iso3: "MMR" },
      { country: "Namibia", iso2: "NA", iso3: "NAM" },
      { country: "Nepal", iso2: "NP", iso3: "NPL" },
      { country: "Netherlands", iso2: "NL", iso3: "NLD" },
      { country: "New Caledonia", iso2: "NC", iso3: "NCL" },
      { country: "New Zealand", iso2: "NZ", iso3: "NZL" },
      { country: "Nicaragua", iso2: "NI", iso3: "NIC" },
      { country: "Niger", iso2: "NE", iso3: "NER" },
      { country: "Nigeria", iso2: "NG", iso3: "NGA" },
      { country: "Norway", iso2: "NO", iso3: "NOR" },
      { country: "Oman", iso2: "OM", iso3: "OMN" },
      { country: "Pakistan", iso2: "PK", iso3: "PAK" },
      { country: "Palestine", iso2: "PS", iso3: "PSE" },
      { country: "Panama", iso2: "PA", iso3: "PAN" },
      { country: "Papua New Guinea", iso2: "PG", iso3: "PNG" },
      { country: "Paraguay", iso2: "PY", iso3: "PRY" },
      { country: "Peru", iso2: "PE", iso3: "PER" },
      { country: "Philippines", iso2: "PH", iso3: "PHL" },
      { country: "Poland", iso2: "PL", iso3: "POL" },
      { country: "Portugal", iso2: "PT", iso3: "PRT" },
      { country: "Qatar", iso2: "QA", iso3: "QAT" },
      { country: "Romania", iso2: "RO", iso3: "ROU" },
      { country: "Russia", iso2: "RU", iso3: "RUS" },
      { country: "Rwanda", iso2: "RW", iso3: "RWA" },
      { country: "Réunion", iso2: "RE", iso3: "REU" },
      { country: "S. Korea", iso2: "KR", iso3: "KOR" },
      { country: "Saint Kitts and Nevis", iso2: "KN", iso3: "KNA" },
      { country: "Saint Lucia", iso2: "LC", iso3: "LCA" },
      { country: "Saint Martin", iso2: "MF", iso3: "MAF" },
      { country: "Saint Pierre Miquelon", iso2: "PM", iso3: "SPM" },
      { country: "Saint Vincent and the Grenadines", iso2: "VC", iso3: "VCT" },
      { country: "Samoa", iso2: "WS", iso3: "WSM" },
      { country: "San Marino", iso2: "SM", iso3: "SMR" },
      { country: "Sao Tome and Principe", iso2: "ST", iso3: "STP" },
      { country: "Saudi Arabia", iso2: "SA", iso3: "SAU" },
      { country: "Senegal", iso2: "SN", iso3: "SEN" },
      { country: "Serbia", iso2: "RS", iso3: "SRB" },
      { country: "Seychelles", iso2: "SC", iso3: "SYC" },
      { country: "Sierra Leone", iso2: "SL", iso3: "SLE" },
      { country: "Singapore", iso2: "SG", iso3: "SGP" },
      { country: "Sint Maarten", iso2: "SX", iso3: "SXM" },
      { country: "Slovakia", iso2: "SK", iso3: "SVK" },
      { country: "Slovenia", iso2: "SI", iso3: "SVN" },
      { country: "Solomon Islands", iso2: "SB", iso3: "SLB" },
      { country: "Somalia", iso2: "SO", iso3: "SOM" },
      { country: "South Africa", iso2: "ZA", iso3: "ZAF" },
      { country: "South Sudan", iso2: "SS", iso3: "SSD" },
      { country: "Spain", iso2: "ES", iso3: "ESP" },
      { country: "Sri Lanka", iso2: "LK", iso3: "LKA" },
      { country: "St. Barth", iso2: "BL", iso3: "BLM" },
      { country: "Sudan", iso2: "SD", iso3: "SDN" },
      { country: "Suriname", iso2: "SR", iso3: "SUR" },
      { country: "Swaziland", iso2: "SZ", iso3: "SWZ" },
      { country: "Sweden", iso2: "SE", iso3: "SWE" },
      { country: "Switzerland", iso2: "CH", iso3: "CHE" },
      { country: "Syrian Arab Republic", iso2: "SY", iso3: "SYR" },
      { country: "Taiwan", iso2: "TW", iso3: "TWN" },
      { country: "Tajikistan", iso2: "TJ", iso3: "TJK" },
      { country: "Tanzania", iso2: "TZ", iso3: "TZA" },
      { country: "Thailand", iso2: "TH", iso3: "THA" },
      { country: "Timor-Leste", iso2: "TL", iso3: "TLS" },
      { country: "Togo", iso2: "TG", iso3: "TGO" },
      { country: "Trinidad and Tobago", iso2: "TT", iso3: "TTO" },
      { country: "Tunisia", iso2: "TN", iso3: "TUN" },
      { country: "Turkey", iso2: "TR", iso3: "TUR" },
      { country: "Turks and Caicos Islands", iso2: "TC", iso3: "TCA" },
      { country: "UAE", iso2: "AE", iso3: "ARE" },
      { country: "UK", iso2: "GB", iso3: "GBR" },
      { country: "USA", iso2: "US", iso3: "USA" },
      { country: "Uganda", iso2: "UG", iso3: "UGA" },
      { country: "Ukraine", iso2: "UA", iso3: "UKR" },
      { country: "Uruguay", iso2: "UY", iso3: "URY" },
      { country: "Uzbekistan", iso2: "UZ", iso3: "UZB" },
      { country: "Vanuatu", iso2: "VU", iso3: "VUT" },
      { country: "Venezuela", iso2: "VE", iso3: "VEN" },
      { country: "Vietnam", iso2: "VN", iso3: "VNM" },
      { country: "Wallis and Futuna", iso2: "WF", iso3: "WLF" },
      { country: "Western Sahara", iso2: "EH", iso3: "ESH" },
      { country: "Yemen", iso2: "YE", iso3: "YEM" },
      { country: "Zambia", iso2: "ZM", iso3: "ZMB" },
      { country: "Zimbabwe", iso2: "ZW", iso3: "ZWE" }
    ];

    const api = "https://disease.sh/v3/covid-19";
    const options = {
      method: "GET",
      redirect: "follow"
    };

    let globalData = [];
    let continents = [];
    let countries = [];
    let overall = [globalData,countries, continents];

    return {
      countryTest,
      countryNames,

      api,
      options,

      globalData,
      continents,
      countries,
      overall
    };
  },
  getters: {
    covidConst(state) {
      return {
        api: state.api,
        options: state.options
      };
    },
    dataStats(state) {
      return {
        globalData: state.globalData,
        continents: state.continents,
        countries: state.countries,
        overall: state.overall,
      };
    },

    nameCheck: state => obj => {
      const { stateProp, value } = obj;

      let bool = state[`${stateProp}`].some(stateObj => {
        let bool = false;

        if (
          stateObj.country.toLowerCase() === value ||
          stateObj.countryInfo.iso2.toLowerCase() === value ||
          stateObj.countryInfo.iso3.toLowerCase() === value
        )
          bool = true;
        if (bool) return bool;
      });

      return bool;
    },
    indexCheck: state => obj => {
      const { stateProp, value } = obj;
      let index;

      let bool = state[`${stateProp}`].some((stateObj, i) => {
        let bool = false;

        if (
          stateObj.country.toLowerCase() === value ||
          stateObj.countryInfo.iso2.toLowerCase() === value ||
          stateObj.countryInfo.iso3.toLowerCase() === value
        ) {
          bool = true;
          index = i;
        }
        if (bool) return bool;
      });

      if (bool) return index;
      else return -1;
    }
  },
  mutations: {
    globalData(state, res) {
      state.globalData = res;
    },
    allContinents(state, res) {
      state.continents = res;
    },
    allCountries(state, res) {
      state.countries = res;
    },

    storeContinent(state, res) {
      state.continents.push(res);
    },
    storeCountry(state, res) {
      state.countries.push(res);
    },
    storeCountries(state, res) {
      for (const cur of res) {
        state.countries.push(cur);
      }
    }
  },
  actions: {
    async countryInfos({ dispatch }) {
      const countries = await dispatch("getAllCountries");
      let countryNames = ``;

      if (await countries) {
        for (const cur of await countries) {
          countryNames += `{country: "${cur.country}",iso2: "${cur.countryInfo.iso2}",iso3: "${cur.countryInfo.iso3}"},`;
        }
      }
      // console.log(countryNames);

      return countryNames;
    },
    async errorCheck({ getters }, path) {
      try {
        const { options } = getters.covidConst;
        const res = await fetch(path, options);

        if (res.status !== 200) {
          throw new Error("Request Failed, Try Again Later");
        } else {
          return await res.json();
        }
      } catch (err) {
        return { error: err.message };
      }
    },

    async fetchAll({ getters, commit, dispatch }) {
      const { api } = getters.covidConst;
      const path = `${api}/all`;
      const res = await dispatch("errorCheck", path);

      if (!res.error) {
        commit("globalData", res);
        return await res;
      } else return await res.error;
    },
    async fetchAllContinents({ getters, commit, dispatch }) {
      const { api } = getters.covidConst;
      const path = `${api}/continents`;
      const res = await dispatch("errorCheck", path);

      if (!res.error) {
        commit("allContinents", res);
        return await res;
      } else return await res.error;
    },
    async fetchAllCountries({ getters, commit, dispatch }) {
      const { api } = getters.covidConst;
      const path = `${api}/countries`;
      const res = await dispatch("errorCheck", path);

      if (!res.error) {
        commit("allCountries", res);
        return await res;
      } else return await res.error;
    },

    async commitData({ commit, getters }, obj) {
      const { commitName, stateProp, data, value } = await obj;
      const state = getters.dataStats;

      if (state[`${stateProp}`].length === 0) {
        commit(`${commitName}`, await data);
      } else {
        const bool = getters.nameCheck({ stateProp, value });
        if (!bool) commit(`${commitName}`, await data);
      }
    },

    async fetchContinent({ getters, dispatch }, continent) {
      const { api } = getters.covidConst;
      const path = `${api}/continents/${continent}`;
      const res = await dispatch("errorCheck", path);

      if (!res.error) {
        dispatch("commitData", {
          commitName: "storeContinent",
          stateProp: "continents",
          data: await res,
          value: continent.toLowerCase()
        });
        return await res;
      } else return await res.error;
    },
    async fetchCountry({ getters, dispatch }, country) {
      const { api } = getters.covidConst;
      const path = `${api}/countries/${country}`;
      const res = await dispatch("errorCheck", path);

      if (!res.error) {
        dispatch("commitData", {
          commitName: "storeCountry",
          stateProp: "countries",
          data: await res,
          value: country.toLowerCase()
        });
        return await res;
      } else return await res.error;
    },
    async fetchCountries({ getters, dispatch }, ...countries) {
      const { api } = getters.covidConst;
      let path = `${api}/countries/`;

      for (let cur in countries) {
        if (parseInt(cur) !== countries.length - 1) {
          path += `${countries[cur]}%2C`;
        } else if (parseInt(cur) === countries.length - 1) {
          path += `${countries[cur]}`;
          break;
        }
      }
      const res = await dispatch("errorCheck", path);

      if (!res.error) {
        for (const cur of await res) {
          dispatch("commitData", {
            commitName: "storeCountry",
            stateProp: "countries",
            data: await cur,
            value: cur.country.toLowerCase()
          });
        }
        return await res;
      } else return await res.error;
    },

    async getCountryData({ getters }, country) {
      const { countries } = getters.dataStats;
      const index = getters.indexCheck({
        stateProp: "countries",
        value: country.toLowerCase()
      });
      if (index !== -1) return countries[index];
      else return { result: "No Match Found" };
    }
  },
  modules: {}
};
