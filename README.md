# swagger-lint

A fully pluggable tool for identifying and reporting on patterns in your
[Swagger][swagger] documents.

# Installation
``` sh
npm install swagger-lint -g
```

# Usage
Run `slint` against a swagger file, does YAML too!
``` sh
slint path/to/swagger.json
Found 0 error(s)
Found 0 warning(s)
```

Will validate remote swagger files as well!
``` sh
slint http://petstore.swagger.io/v2/swagger.json
Found 0 error(s)
Found 0 warning(s)
```

# Features
Familiar command-line interface formatting and options, thanks to
[commander][commander]!
``` sh
slint -h

  Usage: slint [options] <file>

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
```

# TODO
- Add linting capabilities via configuration file.

[swagger]: http://swagger.io/
[commander]: https://github.com/tj/commander.js
