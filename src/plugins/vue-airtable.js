const Airtable = require('airtable');

export default {
  install (Vue, options = {}) {
    Vue.prototype.$airtable = new Airtable({ apiKey: options.apiKey }).base(options.base);
  }
};