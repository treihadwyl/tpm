# Treihadwyl CLI

> Quick package manager for working with Treihadwyl modules


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

Runs in debug mode; usually this is akin to a verbose mode outputting more
messages.

### tpm setCore

```
tpm -c
```

```
tpm -c <path>
```

Tells tpm where to find the core Treihadwyl module. Will throw a hissy fit if
it can not find it.

If specified with a path then will use that, otherwise it’ll link the the
current directory.

### tpm link

```
tpm link
```

```
tpm link -p <path>
```

Sugar method for symlinking modules into the core `node_modules` folder.

If specified with a path then it’ll link the project found at that path to the
core, otherwise it’ll use the project found at the current directory.

Run this from the project root to link it (or specify a project root directory),
this is rubbish and is on the `todo` list.

### tpm create

```
tpm create <path>
```

Scaffolds the [base module repository](https://github.com/treihadwyl/base-module)
into the specified `<path>`.

`<path>` is required.


## Todo

* Linking should be smart enough to find a `package.json` and therefore find
the root and symlink that in.

* Clean - should clean the entire core module of links.

* Unlink - should unlink a project from core.
