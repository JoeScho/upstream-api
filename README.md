# upstream-api
This creates a locally hosted upstream API, for use in testing.

## Usage
```js
const needle = require('needle');
const { startServer } = require('upstream-api');
const config = require('testapi-config.json');

startServer(config);

const res = await needle('get', 'http://localhost:8000/test');

// res.status: 200
// res.headers: { 'x-correlation-id': 'abc123' }
// res.body: {
//   success: true,
//   foo: 'bar'
// }
```

## Config
These are the possible configuration options:

| name | description | example | required |
| ---- | ----------- | ------- | -------- |
| port | The port to host the server on | 8000 | yes |
| endpoints | An array of endpoints to host on the server | see full example | yes |
| endpoints[n].path | The path (without '/') of the endpoint | 'test' | yes |
| endpoints[n].method | The method of the endpoint | 'get' | yes |
| endpoints[n].status | The statusCode to be returned | 200 | yes |
| endpoints[n].delay | The delay (in ms) of the endpoint | 200 | no |
| endpoints[n].body | The response body to be returned | { foo: 'bar' } | no |
| endpoints[n].headers | An array of headers to be set on the response | [{ 'x-correlation-id': 'abc123' }] | no |

### Example Config

#### Config
```json
{
  "port": 8000,
  "endpoints": [
    {
      "path": "test",
      "method": "get",
      "status": 200,
      "delay": 200,
      "body": {
        "success": true,
        "foo": "bar"
      },
      "headers": [
        { "x-correlation-id": "abc123" }
      ]
    }
  ]
}
```
