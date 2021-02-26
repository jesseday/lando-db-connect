"use strict";

module.exports = (app) => {
  // Merge some stuff into the lando object and its config
  return {
    // customModule: require("./lib/customMod"),
    config: {
      mySetting: true,
      domain: "mydomain.com",
    },
  };
};
