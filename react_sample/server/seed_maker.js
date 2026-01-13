const axios = require("axios");

let output = [];

let func = async () => {
  let quakes = async () => {
    let response = await axios
      .get(
        "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2018-01-01&endtime=2026-01-11&minmagnitude=5"
      )
      .then(async (res) => {
        let data = await res.data;
        let arr = data.features;
        //return arr

        let quake_stuff = await arr.map((quake) => {
          let ts = quake.properties.time;
          let date = new Date(ts).toISOString().slice(0, 10);
          let modified = {
            location: quake.properties.place,
            magnitude: quake.properties.mag,
            lat: quake.geometry.coordinates[0],
            lng: quake.geometry.coordinates[1],
            url: quake.properties.url,

            time: date,
          };
          output.push(modified);
          //console.log(output,"the arrayfdsaf")
          return modified;
        });
        //console.log(output, 'the data')
        return output;
      });

    return response;
  };

  let seeds = await quakes();
  //console.log(seeds, 'seeds data')
  return seeds;
};

let a = func();

//console.log(a, 'output data')

module.exports = { func };
