---
title: 3 reasons to avoid using `npm link`
subtitle: The dangers of `npm link` and why you should use `npm install` instead
date: 2022-04-18
tags: npm,
duration: 10min
---

## TL; DR

Instead of using `npm link`, use `npm install` to symlink a local package as a dependency:

<TerminalWindow size="large">

```sh
$ npm install --no-save <package-path>
```
</TerminalWindow>

This command is safer, more explicit, and is actually what you'd expect from `npm link`.

Avoid using `npm link` because of the following footguns:
- Running two commands is error-prone with multiple Node.js versions
- No fail-case on unresolvable packages, and unexpected fallback to npm registry
- Unexpected binary installation

## What's `npm link`?
[`npm link`](https://docs.npmjs.com/cli/v8/commands/npm-link) is a command-line tool for [symlinking](https://en.wikipedia.org/wiki/Symbolic_link) a local package as a dependency during development. It is commonly used for testing packages before publishing them.

Read more about it in the [official documentation](https://docs.npmjs.com/cli/v8/commands/npm-link).

### Usage

Given the following packages:

- `my-library`: an npm package that you want to test in another package as a dependency.

    The `name` property in `my-library/package.json` should be `my-library`.

- `my-application`: the package/project you want to test in

1. **Registration**

    Run `npm link` in `my-library` to register it globally, making it possible to link `my-library` to any local project.


<TerminalWindow title="Terminal 1">

```sh
$ cd ./my-library
$ npm link
```
</TerminalWindow>

2. **Installation**

    Run `npm link my-library` in `my-application` to link it:

<TerminalWindow title="Terminal 2">

```sh
$ cd ./my-application
$ npm link my-library
```
</TerminalWindow>

#### Shortcut
`npm link <package-path>` is a shortcut to automate the two steps by simply passing in the package path.

Using the example above:

<TerminalWindow>

```sh
$ cd ./my-application
$ npm link ../my-library
```
</TerminalWindow>

The shortcut approach is much easier to use and is less error-prone because it's a single command that requires an explicit path to the package to link.

## The footguns of `npm link`

### Multiple Node.js versions
Both `npm link` commands must be run using the same Node.js version.

If the environment has multiple Node.js versions through a manager like [nvm](http://nvm.sh/), each version of Node.js has its own global package registry. Lookups will fail if the same version is not used.

Check to see that the global package registry is scoped to the Node.js version:

<TerminalWindow>

```
$ npm root -g
~/.nvm/versions/node/v14.16.1/lib/node_modules
```
</TerminalWindow>


It's very easy to overlook Node.js versions when working on multiple packages in separate terminal sessions.

> **Pro tip:** Add the [recommended shell integration](https://github.com/nvm-sh/nvm/blob/2c0c34f/README.md#deeper-shell-integration) to automatically use the appropriate Node.js version when entering a directory with a `.nvmrc` file.

The Node.js version discrepancy can be especially hard to notice since `npm link` doesn't error when it's unable to find the local package to link, which is discussed in the next section.

### Non-existent fail-case

Try running `npm link a` in a package.

It will succeed despite never registering package `a` to be linkable before:

<TerminalWindow>

```sh
$ npm link a
~/my-package/node_modules/a -> ~/.nvm/versions/node/v14.16.1/lib/node_modules/a
```
</TerminalWindow>

This is because when `npm link` can't find package `a` as a global package, it installs it globally from [the npm registry](https://www.npmjs.com/package/a) and creates a symlink to it.

It only fails when the package is also not found on the remote registry:

<TerminalWindow size="small">

```sh
$ npm link non-existent-package
npm ERR! code E404
npm ERR! 404 Not Found - GET https://registry.npmjs.org/non-existent-package - Not found
npm ERR! 404 
npm ERR! 404  'non-existent-package@*' is not in this registry.
npm ERR! 404 You should bug the author to publish it (or use the name yourself!)
npm ERR! 404 
npm ERR! 404 Note that you can also install from a
npm ERR! 404 tarball, folder, http url, or git url.
```
</TerminalWindow>


To tell if the link _actually_ succeeded, you can check if the output has two arrows (`->`). (Notice how the false-positive above only has one arrow.) Two arrows means it created a symlink to the global package, which then points to the local package:

<TerminalWindow>

```sh
$ npm link my-linked-package
~/my-package/node_modules/my-linked-package -> ~/.nvm/versions/node/v14.16.1/lib/node_modules/my-linked-package -> ~/my-linked-package
```
</TerminalWindow>

This check only works in npm v6. Unfortunately, in npm v8, the symlink paths are no longer logged. Looking at the output, it's impossible to determine if linking the local package succeeded, or if an unintended package was accidentally installed and linked:

<TerminalWindow size="small">

```sh
$ npm link a

up to date, audited 3 packages in 671ms

found 0 vulnerabilities
```
</TerminalWindow>


To confirm the package was successfully linked, you can use [`realpath`](https://www.gnu.org/software/coreutils/realpath) to verify the symlink path:

<TerminalWindow>

```sh
$ realpath node_modules/package-name
~/my-linked-package
```
</TerminalWindow>


The lack of a proper fail case makes using `npm link` a confusing and frail process. Especially when compounded with having multiple Node.js versions.

### Unexpected binary installation
The first step of `npm link` installs the package _globally_. This happens in the shortcut as well, because it just automates the two steps.

Global package installation ([`npm install --global ...`](https://docs.npmjs.com/cli/v8/commands/npm-install#global)) is a type of package installation used to make binaries available as a system-wide CLI command. So, if your package has a [`bin` field](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#bin), `npm link`ing it will make it available as a CLI command.

Considering `npm link` is primarily used to test a package locally, the binary installation can be an unexpected and undesired side-effect.

The implications of this unexpected behavior can be quite serious given packages can declare binaries with [arbitrary names](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#:~:text=%22bin%22%3A%20%7B-,%22my%2Dprogram%22,-%3A%20%22./path/to/program).

In this example package, an arbitrary binary name `random-command` is specified in the `package.json` file:

```json
{
    "name": "my-package",
    "bin": {
        "random-command": "bin.js"
    }
}
```

Running `npm link` installs binary `random-command`:

<TerminalWindow size="small">

```sh
$ random-command
zsh: command not found: random-command

$ cd my-package && npm link
added 1 package, and audited 3 packages in 548ms

found 0 vulnerabilities

$ random-command
Suddenly works!
```
</TerminalWindow>


Global install can also override existing binaries depending on your [`PATH` configuration](https://linuxhint.com/path_in_bash/)—the variable of paths the shell uses to lookup commands from. If you're using [nvm](http://nvm.sh/), your configuration is likely [susceptible to this](https://github.com/nvm-sh/nvm/issues/2140).

In this example, I override the binary `cat`, a [standard Unix utility](https://en.wikipedia.org/wiki/Cat_(Unix)):

<TerminalWindow size="small">

```sh
$ type cat
cat is /bin/cat

$ cd my-package && npm link
added 1 package, and audited 3 packages in 230ms

found 0 vulnerabilities

$ hash cash
$ type cat
cat is ~/.nvm/versions/node/v16.14.0/bin/cat
```
</TerminalWindow>

In regards to software installation security, these risks are prevalent in every installer and aren't considered too dangerous from a security perspective.

However, `npm link` is not a global package installer. It's worth pausing to reflect on how unexpected this behavior is, and what mistakes it could lead to.

By the way, if you ran `npm link a` in the prior section, you'll have a binary `a` installed. You would think `npm unlink a` will revert the action, but it only removes the local link and not the binaries.

Uninstall a global package and its binaries with:

<TerminalWindow>

```sh
$ npm uninstall --global a
```
</TerminalWindow>

### Potential for accidents

As with any popular package registry, npm has a diverse collection with no standard for quality.

[npm removes malicious packages](https://docs.npmjs.com/reporting-malware-in-an-npm-package), but risks mentioned above are not limited to attacks. When it's unclear whether the right package was installed, there is always potential for accidents.

Many packages on npm are designed to make changes to the file-system, such as [rimraf](https://www.npmjs.com/package/rimraf) or a code linter. In an accident, the consequences of running file-system altering code can be detrimental.

Installing the wrong package is possible with `npm install` as well, but the risks are higher with `npm link` when the footguns above come together:

- **Package names can collide.** It's possible to link a local package with a name that's on the [npm registry](https://www.npmjs.com/). This can happen when developing and testing a new or private package before realizing the name is already taken.

- **No local resolution error.** If the package being linked can't be locally resolved, it will get resolved from the npm registry. If a package with the same name is found, an unexpected package can get globally installed.

- **Binaries are installed.** If the wrong package is installed, it's unintuitive that binaries get installed and to realize it needs to be uninstalled globally. This leaves unexpected binaries to be left installed and accidentally invoked.

## Use `npm install` instead

A better alternative to `npm link` is `npm install` using a package path:

<TerminalWindow>

```sh
$ npm install --no-save <package-path>
```
</TerminalWindow>

This creates a symlink to the package without installing it globally. This behavior is probably closer to what most people expect from `npm link`.

The `--no-save` flag is to prevent the package path from getting saved in `package.json`.

Since this requires passing in the package path to install, it will visibly fail when the package cannot be resolved locally.

If you want to use binaries from the package, they will only be installed to the package and will only be executable with [npx](https://docs.npmjs.com/cli/v8/commands/npx) or via [package scripts](https://docs.npmjs.com/cli/v8/using-npm/scripts):

<TerminalWindow>

```sh
$ npx <binary-name>
```
</TerminalWindow>


> **Protip:** To link multiple packages, pass the package paths in as arguments.
>
> Running `npm install` or `npm link` multiple times will remove previous links.
>
> <TerminalWindow>
>
> ```sh
> $ npm install --no-save <package-path-a> <package-path-b> ...
> ```
> </TerminalWindow>
