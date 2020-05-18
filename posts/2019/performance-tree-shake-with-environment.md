---
tags: [angular, performance]
published: true
date: 2019-09-19
title: 'Performance: Tree-Shake with environment.ts'
---

You probably get to the point where you only need modules that has to be there during development but not in the production build.

For example:

I use `@ngrx/store-devtools` nearly all the time while developing. 

In order to not have this module on my production build, I thought, the solution was *easy*-ish, just use the environment-condition to exclude it from the build.

```ts
import {environment} from '../environments/environment';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

const additionalImports = [];

if (!environment.production) {
  additionalImports.push(StoreDevtoolsModule.instrument({
    maxAge: 25
  }));
}


@NgModule({
  import: [
    ...additionalImports
  ]
})
```
<figcaption>app.module.ts</figcaption>

But the compiler still adds the module to production build: about `18 kb` added for this module, sure its not "that" much but this adds up to the loading+parsing/eval-time, which you probably don't need.


## Using `environment.ts` the better way :)

Since angular adds a default `fileReplacements` config for `environment.ts` and `environment.prod.ts` those will be only compiled into during development/production build. 

We can also use this to add different modules for our development phase / or to production vice versa.

```ts
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

export const environment = {
  production: false,
  modules: [
    StoreDevtoolsModule.instrument({
      maxAge: 25
    }),
  ]
};
```
<figcaption>environment.ts</figcaption>


```ts
import {environment} from '../environments/environment';


@NgModule({
  import: [
    ...environment.modules
  ]
})
```
<figcaption>app.module.ts</figcaption>

## :tada: Now that module is only added during development and not in your production build :tada:

Maybe in the future it will be possible to tree-shake these kinds just by using `if (environment.production)`, but until then we have a nice workaround. 

### `Protip 1:` Use an interface for your environment files.

Have a `environment.def.ts`-File which is something like:
```ts
export interface Environment {
  production: boolean;
  modules: any[];
}
```

That way both (or more?) environments will be at least consistent on the properties.

### `Protip 2:` Use a path-alias
```json
  "compilerOptions": {
    "paths": {
      "@myApp/env": ["apps/myApp/src/environments/environment"]
    }
  }
```
<figcaption>tsconfig.json</figcaption>

Then you can import your environment in any file just by `@myApp/env` instead of `../../../..and/so/on../../environment` 

<hr>

### I really would like to know, if you have/use modules only during dev/prod?
