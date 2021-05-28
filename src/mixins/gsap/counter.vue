<script>
import { gsap } from "gsap";

export default {
  methods: {
    counter() {
      gsap.registerEffect({
        name: "counter",
        extendTimeline: true,
        defaults: {
          end: 0,
          duration: .5,
          ease: "power1",
          increment: 1,
          stagger: 0
        },
        effect: (targets, config) => {

          let tl = gsap.timeline();
          tl.to(targets, {
            ease: config.ease,
            duration: config.duration,
            innerText: config.end,
            // snap is the increment
            // snap: { innerText: config.increment },
            
            modifiers: {
              innerText: function(innerText) {
                let varIncrement;

                if(innerText < config.end) varIncrement = config.increment;
                else varIncrement = 1;

                // gsap.utils.snap = snap
                return gsap.utils.snap(varIncrement,innerText).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              }
            },
          },0);

          return tl;
        },
      });
    },
  },
};
</script>
