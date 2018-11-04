const apiID = process.env.AZUNA_ID;
const apiKEY = process.env.AZUNA_KEY;
const axios = require('axios');
const {parse, stringify} =  require('flatted/cjs');
const util = require('util')


function getAdunaListing(city, category, type, beds){
  let contructedURL;
  switch (type) {
    case "detached":
      type = 'house_detached'
    break;
    case "flat":
      type = 'flat'
    break;
    case "bungalow":
      type = 'house_bungalow'
    break;
    case "terraced":
      type = 'house_terraced'
    break;
    default:
    type="undefined"
  }

  if (!beds){
    constructedURL = `http://api.adzuna.com/v1/api/property/gb/search/1/?category=${category}&app_id=${apiID}&app_key=${apiKEY}&results_per_page=1000&where=${city}&property_type=${type}`
  }
  else {
    constructedURL = `http://api.adzuna.com/v1/api/property/gb/search/1/?category=${category}&app_id=${apiID}&app_key=${apiKEY}&results_per_page=1000&where=${city}&property_type=${type}&beds=${beds}`
  }
  console.log("constructed URL: " + constructedURL)

  return axios.get(constructedURL).then(results => {
      return results.data;
    })
    .catch(err => console.log(err.message))
}

module.exports = getAdunaListing;
