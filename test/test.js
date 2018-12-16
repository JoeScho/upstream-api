const fs = require('fs');
const YML = require('js-yaml');
const needle = require('needle');
const { expect } = require('chai');
const { describe, it } = require('mocha');

const { startServer } = require('../index');

const jsonConfig = require('./test.config.json');

describe('Simple server config', () => {
  it('should create a server, given a yml config', async () => {
    const contents = fs.readFileSync(__dirname + '/test.config.yml', 'utf8');
    const config = YML.safeLoad(contents);

    const server = startServer(config);

    const res = await needle('get', 'http://localhost:8000/test');

    server.close();
    expect(res.statusCode).to.equal(200);
    expect(res.headers['x-correlation-id']).to.equal('abc123');
    expect(res.body).to.deep.equal({
      success: true,
      foo: 'bar'
    });
  });

  it('should create a server, given a json config', async () => {
    const server = startServer(jsonConfig);

    const res = await needle('get', 'http://localhost:8000/test');

    server.close();
    expect(res.statusCode).to.equal(200);
    expect(res.headers['x-correlation-id']).to.equal('abc123');
    expect(res.body).to.deep.equal({
      success: true,
      foo: 'bar'
    });
  });
});