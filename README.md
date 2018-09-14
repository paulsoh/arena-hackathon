arena
=====



[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/arena.svg)](https://npmjs.org/package/arena)
[![CircleCI](https://circleci.com/gh/Workspace/arena/tree/master.svg?style=shield)](https://circleci.com/gh/Workspace/arena/tree/master)
[![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/Workspace/arena?branch=master&svg=true)](https://ci.appveyor.com/project/Workspace/arena/branch/master)
[![Codecov](https://codecov.io/gh/Workspace/arena/branch/master/graph/badge.svg)](https://codecov.io/gh/Workspace/arena)
[![Downloads/week](https://img.shields.io/npm/dw/arena.svg)](https://npmjs.org/package/arena)
[![License](https://img.shields.io/npm/l/arena.svg)](https://github.com/Workspace/arena/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g arena
$ arena COMMAND
running command...
$ arena (-v|--version|version)
arena/0.0.0 darwin-x64 node-v10.7.0
$ arena --help [COMMAND]
USAGE
  $ arena COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`arena hello [FILE]`](#arena-hello-file)
* [`arena help [COMMAND]`](#arena-help-command)
* [`arena register [FILE]`](#arena-register-file)
* [`arena register-patient [FILE]`](#arena-register-patient-file)

## `arena hello [FILE]`

describe the command here

```
USAGE
  $ arena hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ arena hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/Workspace/arena/blob/v0.0.0/src/commands/hello.ts)_

## `arena help [COMMAND]`

display help for arena

```
USAGE
  $ arena help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.2/src/commands/help.ts)_

## `arena register [FILE]`

describe the command here

```
USAGE
  $ arena register [FILE]
```

_See code: [src/commands/register.ts](https://github.com/Workspace/arena/blob/v0.0.0/src/commands/register.ts)_

## `arena register-patient [FILE]`

describe the command here

```
USAGE
  $ arena register-patient [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/register-patient.ts](https://github.com/Workspace/arena/blob/v0.0.0/src/commands/register-patient.ts)_
<!-- commandsstop -->
