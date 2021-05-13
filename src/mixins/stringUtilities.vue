<script>
export default {
  methods: {
    numberFormat(number) {
      const strNumber = `${number}`;
      const [int, dec] = strNumber.split(".");
      let counter = 1;
      let reset = false;
      let num = ``;

      for (const value of [...int].reverse()) {
        if (reset) counter = 2;
        if (counter === 4) {
          num += `,${value}`;
          reset = true;
        } else {
          num += `${value}`;
          reset = false;
          counter++;
        }
      }

      num =
        dec !== undefined
          ? `${[...num].reverse().join("")}.${dec}`
          : `${[...num].reverse().join("")}`;

      return num;
    },

    //

    stringFilter(input) {
      const string = input.toLowerCase();
      const strings = string.split(",");
      const filtered = [];

      for (const cur of strings) {
        let filter = cur;
        filter = cur.trim();
        if (typeof filter === "string" && filter !== "") filtered.push(filter);
      }

      return filtered;
    },
    stringDuplicates(inputs) {
      let distincts = [];

      for (const cur of inputs) {
        if (distincts.legnth === 0) distincts.push(cur);
        else {
          const bool = distincts.includes(cur);
          if (!bool) distincts.push(cur);
        }
      }

      return distincts;
    },

    //

    letterCheck(inputs, value) {
      const letters = [...value.toLowerCase()];
      const wordLength = letters.length - 1;
      const threshold = Math.floor(wordLength * 0.5);
      let newInputs = [];
      let indices = [];

      for (const [index, input] of inputs.entries()) {
        let x = 0;
        let y = 0;
        let reset = false;

        for (x, y; x <= wordLength, y <= input.length - 1; x++, y++) {
          if (reset) x = 0;
          if (letters[x] === input[y]) {
            reset = x === wordLength ? true : false;
            if (x === threshold) {
              indices.push(index);
              break;
            }
          } else {
            reset = true;
          }
        }
      }

      newInputs = inputs.filter((value, index) => {
        return indices.indexOf(index) === -1;
      });

      return newInputs;
    },
    stringValid(inputs, removeMatch = false, includeMatch = false) {
      let newInputs = [];
      let indices = [];
      let matches = [];

      for (const [index, input] of inputs.entries()) {
        let bool = this.$store.state.covid.countryNames.some(obj => {
          let bool = false;

          for (const prop in obj) {
            bool =
              obj[prop].toLowerCase() === input.toLowerCase() ? true : false;
            if (bool) {
              if (removeMatch) indices.push(index);
              if (includeMatch) matches.push(obj);
              break;
            }
          }

          return bool;
        });
        if (!bool) indices.push(index);
      }

      newInputs = inputs.filter((value, index) => {
        return indices.indexOf(index) === -1;
      });

      if (includeMatch) {
        for (const match of matches) {
          newInputs.push(match.country);
        }
      }

      return newInputs;
    },

    //

    stringFormat(input) {
      const words = input.split(" ");
      let filtered = [];

      for (const word of words) {
        let letters = ``;
        let bool = true;

        for (const letter in word) {
          if (word[letter] !== ",") {
            letters += bool
              ? `${word[letter].toUpperCase()}`
              : `${word[letter].toLowerCase()}`;
            bool = false;
          }
        }
        if (letters !== "") filtered.push(letters);
      }
      return filtered.join(" ");
    },
    stringFormatArray(inputs) {
      const format = [];
      for (const input of inputs) {
        format.push(this.stringFormat(input));
      }
      return format;
    }

    //
  }
};
</script>
