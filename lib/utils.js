const _         = require('lodash');
const bacnet    = require('bacstack');

module.exports.getPropertyName = (id) => {
  let name = Object.keys(bacnet.enum.PropertyIds).find(key => bacnet.enum.PropertyIds[key] === id);
  if (!name) return;
  name = _.startCase(_.lowerCase(name.substring(5)));
  return name;
};
