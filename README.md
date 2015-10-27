Web Tech List  [![Circle CI](https://circleci.com/gh/nicgirault/web-tech-list/tree/master.svg?style=svg)](https://circleci.com/gh/nicgirault/web-tech-list/tree/master)
===============================

[The project is online!](http://nicgirault.github.io/web-tech-list/#!/technology)

# Installation

  `npm install`

# Development server

  `npm run-script watch`

Access to the application at this address: http://127.0.0.1:8008
The livereload update your browser each time you change source files.

The Frontend source files are into the [src-public](./src-public) directory and compile to the public directory.
The Backend source files are into the [src-cloud](./src-cloud) directory and compile to the cloud directory.

# Deploy on Parse Cloud

  `npm run-script deploy-parse`

# Deploy on Github Pages (alternative)

You can also deploy the frontend on the Github Pages of your repo by launching this command:

  `npm run-script deploy-github`

## Licence

Licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
