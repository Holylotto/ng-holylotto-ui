# NgHolylottoUi

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.3.

## Development server

1. Install truffle, Angular CLI and an Ethereum client. If you don't have a test environment, we recommend ganache-cli
npm install -g truffle
npm install -g @angular/cli
npm install -g ganache-cli

2. Run Ganache

3. Compile and migrate your contracts.

truffle compile && truffle migrate

## Configuration
1. In order to connect with the Ethereum network, you will need to configure MetaMask
2. Log into the ganache-cli test accounts in MetaMask, using the 12-word phrase printed earlier.
        i. A detailed explaination of how to do this can be found 
            a. Normally, the available test accounts will change whenever you restart ganache-cli.
            b. In order to receive the same test accounts every time you start ganache-cli, start it with a seed like this: ganache-cli --seed 0 or ganache-cli -m "put your mnemonic phrase here needs twelve words to work with MetaMask"
3. Point MetaMask to ganache-cli by connecting to the network localhost:8545


Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
