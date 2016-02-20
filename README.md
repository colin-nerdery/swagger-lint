# swagger-lint
A fully pluggable tool for identifying and reporting on patterns in your
[Swagger][swagger] documents.

# Installation
``` sh
npm install swagger-lint -g
```

# Usage
Run `slint` against any swagger file, json or yaml, remote or local.
``` sh
slint path/to/swagger.json
slint path/to/swagger.yaml
slint http://petstore.swagger.io/v2/swagger.json
```

# Features
Familiar command-line interface formatting and options, thanks to
[commander][commander]!
``` sh
slint -h

  Usage: slint [options] <file>

  Options:

    -h, --help             output usage information
    -V, --version          output the version number
    -H, --header <header>  http headers to include for remote files
```

# TODO
- Add linting capabilities via configuration file.

[swagger]: http://swagger.io/
[commander]: https://github.com/tj/commander.js
