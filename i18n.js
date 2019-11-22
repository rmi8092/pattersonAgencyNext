const NextI18Next = require("next-i18next").default;
const { localeSubpaths } = require("next/config").default().publicRuntimeConfig;

const localeSubpathVariations = {
  none: {},
  foreign: {
    es: "es"
  },
  all: {
    en: "en",
    es: "es"
  }
};

module.exports = new NextI18Next({
  defaultLanguage: "es",
  otherLanguages: ["es", "en"],
  localeSubpaths: localeSubpathVariations[localeSubpaths]
});
