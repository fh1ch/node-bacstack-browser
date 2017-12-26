const os        = require('os');
const ip        = require('ip');
const async     = require('async');
const express   = require('express');
const bacnet    = require('bacstack');
const debug     = require('debug')('bacstack-browser');

const utils     = require('./utils');

const app = express();

// Local stores
const settings = {
  port: 47808,
  nic: 12,
  timeout: 4000,
  language: 'en',
  analytics: true
};

const devices = {};

// BACNET Stuff
const client = new bacnet({adpuTimeout: 6000});

client.on('iAm', (device) => {
  const id = `${device.address}:${device.deviceId}`;
  devices[id] = device;
  devices[id].id = id;
  client.readPropertyMultiple(device.address, [
    {objectId: {type: 8, instance: 4194303}, properties: [{id: bacnet.enum.PropertyIds.PROP_OBJECT_NAME}, {id: bacnet.enum.PropertyIds.PROP_DESCRIPTION}]}
  ], (err, value) => {
    if (err) return;
    if (value && value.values && value.values[0] && value.values[0].values) {
      const tmp = {};
      value.values[0].values.forEach(data => tmp[data.id] = data.value[0])
      devices[id].name = tmp[bacnet.enum.PropertyIds.PROP_OBJECT_NAME].value;
      devices[id].description = tmp[bacnet.enum.PropertyIds.PROP_DESCRIPTION].value;
    }
  });
});

// Webserver Stuff
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Settings
app.get('/api/settings', (req, res) => {
  res.send(settings);
});

app.post('/api/settings', (req, res) => {
  res.send(req.body);
});

app.get('/api/settings/interfaces', (req, res) => {
  const nics = [];
  const osNics = os.networkInterfaces();
  Object.keys(osNics).forEach((ifname) => {
    osNics[ifname].forEach((iface) => {
      if (iface.interal === true) return;
      if (iface.family !== 'IPv4') return;
      nics.push({
        name: ifname,
        address: iface.address,
        broadcast: ip.subnet(iface.address, iface.netmask).broadcastAddress
      });
    });
  });
  res.send(nics);
});

// Devices
app.get('/api/devices', (req, res) => {
  res.send(Object.keys(devices).map((key) => devices[key]));
});

app.get('/api/devices/search', (req, res) => {
  client.whoIs();
  res.sendStatus(204);
});

// Objects
app.get('/api/devices/:id/objects', (req, res) => {
  const device = devices[req.params.id];
  if (!device) return res.sendStatus(404);
  client.readPropertyMultiple(device.address, [
    {objectId: {type: 8, instance: 4194303}, properties: [{id: bacnet.enum.PropertyIds.PROP_ALL}]}
  ], (err, value) => {
    if (err) return res.sendStatus(500);
    const tmp = {};
    if (!(value && value.values && value.values[0] && value.values[0].values)) return res.sendStatus(500);
    value.values[0].values.forEach(data => tmp[data.id] = data.value)
    async.mapSeries(tmp[bacnet.enum.PropertyIds.PROP_OBJECT_LIST], (item, next) => {
      console.log(item);
      client.readPropertyMultiple(device.address, [
        {objectId: {type: item.value.type, instance: item.value.instance}, properties: [{id: bacnet.enum.PropertyIds.PROP_ALL}]}
      ], (err, value) => {
        if (err) return next(null, {});
        const tmp = {};
        if (!(value && value.values && value.values[0] && value.values[0].values)) return next(null, {});
        value.values[0].values.forEach(data => tmp[data.id] = data.value)
        next(null, {
          id: `${item.value.type}:${item.value.instance}`,
          type: item.value.type,
          name: tmp[bacnet.enum.PropertyIds.PROP_OBJECT_NAME] ? tmp[bacnet.enum.PropertyIds.PROP_OBJECT_NAME][0].value : '',
          description: tmp[bacnet.enum.PropertyIds.PROP_DESCRIPTION] ? tmp[bacnet.enum.PropertyIds.PROP_DESCRIPTION][0].value : '',
          value: tmp[bacnet.enum.PropertyIds.PROP_PRESENT_VALUE] ? tmp[bacnet.enum.PropertyIds.PROP_PRESENT_VALUE][0].value : null
        });
      });
    }, (err, values) => {
      res.send(values);
    });
  });
});

app.get('/api/devices/:id/objects/:oid', (req, res) => {
  const device = devices[req.params.id];
  if (!device) return res.sendStatus(404);
  const oid = req.params.oid.split(':');
  if (!oid[0] || !oid[1]) return res.sendStatus(404);
  client.readPropertyMultiple(device.address, [
    {objectId: {type: oid[0], instance: oid[1]}, properties: [{id: bacnet.enum.PropertyIds.PROP_ALL}]}
  ], (err, value) => {
    if (err) return res.sendStatus(500);
    if (!(value && value.values && value.values[0] && value.values[0].values)) return res.sendStatus(500);
    let properties = value.values[0].values;
    properties = properties.map(property => {return {
      id: property.id,
      name: utils.getPropertyName(property.id) || `Vendor Specific Property ${property.id}`,
      value: property.value
    }});
    res.send(properties);
  });
});

app.listen(3000, '127.0.0.1', () => {
  console.log('Example app listening on port 3000!');
});
