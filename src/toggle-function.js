let click = document.querySelector(".form-check-input");
if (click != "on") {
  click.addEventListener("click", showCelsius);
}

function showCelsius(_event) {
  metricToday();
  function metricToday() {
    let high = document.querySelector("#highToday");
    high.innerHTML = "2°";
    metricTomo();

    function metricTomo() {
      let high = document.querySelector("#tomoHigh");
      high.innerHTML = "3°";
      metricNext();

      function metricNext() {
        let high = document.querySelector("#nextHigh");
        high.innerHTML = "2°";
        metricFollow();

        function metricFollow() {
          let high = document.querySelector("#followHigh");
          high.innerHTML = "8°";
          metricLowLast();

          function metricLowLast() {
            let high = document.querySelector("#lastHigh");
            high.innerHTML = "13°";
            metricLowToday();

            function metricLowToday() {
              let low = document.querySelector("#lowToday");
              low.innerHTML = "-11°";
              metricLowTomo();

              function metricLowTomo() {
                let low = document.querySelector("#tomoLow");
                low.innerHTML = "-6°";
                metricLowNext();

                function metricLowNext() {
                  let low = document.querySelector("#nextLow");
                  low.innerHTML = "-10°";
                  metricLowFollow();

                  function metricLowFollow() {
                    let low = document.querySelector("#followLow");
                    low.innerHTML = "-1°";
                    metricLowLast();

                    function metricLowLast() {
                      let low = document.querySelector("#lastLow");
                      low.innerHTML = "0°";
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
