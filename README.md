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

### tpm || tpm --help

```
tpm
```

Shows the help

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


## Todo

* Linking should be smart enough to find a `package.json` and therefore find
the root and symlink that in.

* Clean - should clean the entire core module of links.

* Unlink - should unlink a project from core.
