# Treihadwyl CLI

> Local package manager for working with Treihadwyl modules


## Installation

Download from git and manually link to global npm.

```
git clone git@github.com:treihadwyl/tpm.git
cd tpm
npm link
```


## API

### help

```
tpm
```

```
tpm --help
```

Shows the help

### options

#### debug

```
tpm -d
```

```
tpm --debug
```

Runs in debug mode; usually this is akin to a verbose mode outputting more messages.

### tpm setCore

```
tpm -c
```

```
tpm -c <path>
```

Tells tpm where to find the core Treihadwyl module. Will throw a hissy fit if it can not find it.

If specified with a path then will use that, otherwise it’ll link the the current directory.

### tpm link

```
tpm link
```

```
tpm link -p <path>
```

```
tpm link -l <modulePath>
```

Sugar method for symlinking modules into the core `config.modulePath` folder (this will usually be `modules`).

If specified with a `-p` path then it’ll link the project found at that path to the core, otherwise it’ll use the project found at the current directory.

If specifed with a `-l` path then it’ll link into the path directory within core.
e.g.

```
tpm link -l node_modules
```

will link the current project into `core/node_modules` if you’d prefer it to go in there.

`tpm link` will create two links - the specified one and one that goes into the `node_modules` folder. This is to let `browserify` have a better time at finding dependencies.

Run this from the project root to link it (or specify a project root directory), this is rubbish and is on the `todo` list.

### tpm create

```
tpm create <path>
```

Scaffolds the [base module repository](https://github.com/treihadwyl/base-module) into the specified `<path>`.

`<path>` is required.


### tpm register

```
tpm register
```

Registers the current project with `tpm`, currently this needs to be run from project root. Registerting a package allows it to be linked to other packages.


## Todo

* Linking should be smart enough to find a `package.json` and therefore find
the root and symlink that in.

* Clean - should clean the entire core module of links.

* Unlink - should unlink a project from core.

* Test - the current problem with testing is that any module that depends on another will not have access to that dependency until it is built by core. By registerting modules `tpm` can symlink any dependent modules and run tests using those dependencies.
