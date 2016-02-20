<a name="module_swagger-lint"></a>
## swagger-lint
A fully pluggable tool for identifying and reporting on patterns
           in your [Swagger](http://swagger.io/) documents.

**Example**  
```js
npm install swagger-lint -g
slint swagger.json
slint swagger.yaml
slint http://petstore.swagger.io/v2/swagger.json
```
<a name="module_swagger-lint..validate"></a>
### swagger-lint~validate(file, options)
Validates the provided swagger document. If any headers options are
          specified, it will modify the request before sending it out.

**Kind**: inner method of <code>[swagger-lint](#module_swagger-lint)</code>  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>string</code> | Location of swagger file, can be remote or local. |
| options | <code>object</code> | Options object from commander.js. |

