create-pardjs-module
====================

The cli fool for create pardjs module scaffold

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/create-pardjs-module.svg)](https://npmjs.org/package/create-pardjs-module)
[![Downloads/week](https://img.shields.io/npm/dw/create-pardjs-module.svg)](https://npmjs.org/package/create-pardjs-module)
[![License](https://img.shields.io/npm/l/create-pardjs-module.svg)](https://github.com/dozto/create-pardjs-module/blob/master/package.json)

# Usage

This is a lib followed NPX approach to create module project for pardjs.

Use this with yarn `yarn create pardjs-module [module-name]`

Once sucess the `module-name` will be created at the same folder that you execute this command.

# Commands

Run the command with `yarn [command]`

**Please always use `yarn commit` instead of `git commit`**

```yaml
lint: lint all ts file in src and test folder.
build: Compile and build the project.
build:doc: Build doc with typedoc lib.
test: Execute the test in the project.
test:watch: Execute the test in watch mode.
commit: Make a commit followed the best approach.
release: Make a release followed the best approach (For module it will publish to NPM, for service it will build docker image.)
```
