---
tags: [envsure, npm, ci]
published: true
date: 2019-09-10
title: 'envsure : {dev} en(v)sure packages are installed'
---

## Lets begin at the *why*
 
While using `storybook` in ~~a~~ some projects, I saw the huge amount of packages that needed to be installed by this (dependencies/addons). Sure on a local repo, installing it once this can be ignored. 

But when you push it to your CI and have for example different CI-runners for different kind of tests, you probably don't need to install storybook (and addons) every time for each CI. Well .. maybe one if you want to test your components? But even then only this particular CI-job would need to install the packages.

### Workaround 1: `package.json` (one I used)
You could just create `package.json`-script-task, like: 
`"install-stuff": "npm install myPackage@1 otherPackage@2 andSo@0n"`

This is probably ok for 3-4 packages, but not when having to add like 8+ and having to handle the versions all into one line in your `package.json`? I for one don't want to do that (again)

### Workaround 2: `install-other-packages.sh`
Use the same `npm install` in a shell-script, sure you can use multiple lines to ease the overview. 

This would be ok if you have one group of packages you need once but what about different groups ?

### Workaround 3: 
Use a different folder in your repo (which has its own `package.json` with these needed packages)

None of these workarounds were good enough for me. So I just made my own.

## Introducing `envsure` - the unusual (node) package installer addon

You can use `envsure` by either having it installed globally `npm install -g envsure` or by using `npx`

Example: 
`envsure groupName` or `npx envsure groupName`

It will use the `envsure.json` in your current directory to install all needed packages for `groupName` without added them to package.json.

```json
{
  "version": 1,
  "groupName": {
    "packageA": "1.2.3",
    "packageB": "2.3",
    "and-so-on": "1"
  }
}
```

`version`: (optional) property is used to determine the json schema, in case of future updates. 

Also you could just use it with your usual npm-script
```json
...
   "premy-routine": "npx envsure groupName",
   "my-routine": "..."
...
```

Links: [repo](https://github.com/negue/envsure) | [npm](https://www.npmjs.com/package/envsure)


This is the first cli I've ever made. So I probably don't have any best-practices on what to use for node-based cli's. Sorry about that! 


Also this is probably just a niche use-case, but maybe it'll help somebody. 

