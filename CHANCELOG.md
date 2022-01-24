# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
e este projeto adere a [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [1.2.0]

### 2022-01-23

- Iniciado uso da documentação com o padrão [JSDoc](http://usejsdoc.org/), a partir dos modelos definidos pelo [Wordpress](https://make.wordpress.org/core/handbook/best-practices/inline-documentation-standards/javascript/).
- Padrão utilizado para arquivos:
  ```javascript
  /**
   * @file FileName.js A brief, one line explanation of the purpose of the file. Use a period at the end
   *
   * @author name <emailAddress>
   *
   * @todo To do stuffs
   */

  // stuffs
  ```
- Padrão utilizado para funções:
  ```javascript
  /**
   * @description A brief, one line explanation of the purpose of the function. Use a period at the end
   *
   * @param {type} [var] Description of optional variable with default variable. (Default/Example: value)
   *
   * @return {type} Description.
   *
   * @memberof ClassName, when applicable
   *
   * @todo To do stuffs
   */
  function() { }
  ```
- Padrão utilizado para classes:
  ```javascript
  /**
   * @description A brief, one line explanation of the purpose of the class. Use a period at the end
   *
   * @class ClassName
   *
   * @todo To do stuffs
   */
  class ClassName { }
  ```
- Padrão utilizado para construtor de classe:
  ```javascript
  class ClassName {
    /**
     * @description Creates an instance of ClassName
     *
     * @param {type} [var=default] Description of optional variable with default variable
     *
     * @class No description, use when class constructors
     *
     * @return {void} Esta função não possui retorno
     *
     * @memberof ClassName
     *
     * @todo To do stuffs
     */
    constructor() { }
  }
  ```
- Atualizadas as entradas no arquivo `package.json`:
  ```json
  "author": "Edson Moretti <edsonmoretti@gmail.com> (https://www.linkedin.com/in/edsonmoretti)",
  "contributors": [
    "João Ferreira <joaoferreirape@compesa.com.br> (https://www.compesa.com.br)",
    "Samuel Martins <samuelmastins@compesa.com.br> (https://www.compesa.com.br)"
  ],
  "cpu": [
    "x64"
  ],
  "dependencies": {
    "ask-sdk-core": "^2.7.0",
    "ask-sdk-model": "^1.19.0",
    "aws-sdk": "^2.326.0"
  },
  "description": "Projeto desenvolvido como parte dos requisitos para conclusão da pós em Cloud da UPE",
  "devDependencies": {
    "jsdoc": "^3.6.9"
  },
  "homepage": "https://github.com/edsonmoretti/alexa-datacenter-monitor",
  "license": "CC-BY-4.0",
  "main": "index.js",
  "man": [
    "./docs"
  ],
  "name": "alexa-datacenter-monitor-skill",
  "private": true,
  "repository": {
    "type": "git",
    "url": "https://github.com/edsonmoretti/alexa-datacenter-monitor"
  },
  "scripts": {
    "docs": "jsdoc . --destination docs --encoding utf8",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "version": "1.2.0"
  ```
- Criado o arquivo `.editorconfig` e inseridas as configurações
- Criado o arquivo `.gitignore` e inseridas as configurações
- Criado o arquivo `.jshintrc` e inseridas as configurações
- Criado o arquivo `CHANGELOG.md`
- Criado o arquivo `CONTRIBUTING.md`
- Criado o arquivo `LICENSE`
- Criado o arquivo `README.md`
- Instalação de pacotes no escopo global do ambiente:
    - `npm install --global jsdoc`
- Instalação de pacotes no escopo local do projeto:
    - `npm install --local --save-dev jsdoc`
- Mudanças na estrutura de diretórios:
  - [+] `lambda`
    - [+] `docs`
