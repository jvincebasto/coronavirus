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

    // String Split
    stringFilter(input, delimeter = ",") {
      const string = input.toLowerCase();
      const strings = string.split(delimeter);
      const filtered = [];

      for (const cur of strings) {
        let filter = cur.trim();
        if (filter !== "") filtered.push(filter);
      }

      return filtered;
    },
    // String Duplicates
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

    // String Capitalize
    stringCapitalize(input) {
      const words = input.split(" ");
      let filtered = [];

      for (const word of words) {
        let letters = ``;
        let bool = true;

        for (const letter of word) {
          letters += bool ? letter.toUpperCase() : letter.toLowerCase();
          bool = false;
        }
        if (letters !== "") filtered.push(letters);
      }
      return filtered.join(" ");
    },
    stringCapitalizeLoop(inputs) {
      const format = [];
      for (const input of inputs) format.push(this.stringCapitalize(input));
      return format;
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
  },
};
</script>
