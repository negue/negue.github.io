---
tags: [angular, lazyloaded, ivy, performance]
published: true
date: 2019-12-25
title: 'Lazy Loaded Components - #4 NPM-Package'
series: 'Angular: Lazy Loading Components'
---

# Proudly presenting `npm install @gewd/lazy -S` :wink: 
[![NPM Version][npm-img]][npm-url] 


[npm-img]: https://img.shields.io/npm/v/@gewd/lazy.svg?
[npm-url]: https://www.npmjs.com/package/@gewd/lazy

Finally, the demo-repository and loader package is done. Here are some of the changes:

## `Lazy`-Helper

Like the C# Lazy<T>-Class, I created a simple helper, which holds the lazy-Value once its already have been requested.

```ts
import { Lazy } from '@gewd/lazy/utils';

// create
var myLazy = Lazy.create(() => import(/*...*/))

// callback/promise will be only executed once `.getValue()` is called
const result = await myLazy.getValue();

// once the value was loaded, it'll just use this cached promise
```

In the previously articles you saw that I cached the requests, in a separate dictionary, with this I don't need to handle that.


## Lazy Components

As you can see the registration of LazyComponents changed a bit, now using the Lazy-Helper.


```ts
// Register the lazy component, without a module
DynamicLoaderRegistry.LazyComponents = {
  'test-comp': new Lazy<any>(() => import('./lazy-wrapper/test-comp'))
};
```

Use it inside your app with:

```html
<gewd-lazy-component 
   [componentInputs]="{ testProp: 'Component Binding from outside' }"
   component="test-comp"
>
   Normal content that is visible the content isn't loaded.

   <div isLoading>
      This content will be visible while the component is loading / being created.
   </div>                  
</gewd-lazy-component>
```

This is useful for components that don't need any other module's or using 3rd party web-components.

> Note, using components of the host-module not working yet.

But for this issue I created the lazy-components (using modules), this type of lazy-loading has been around for quite a while, there are existing libraries for this, but here is my approach :) 

## Lazy Module Components

```ts
DynamicLoaderRegistry.LazyModuleComponents = {
  'test-module': {
    load: new Lazy<any>(
      () => import('./lazy-wrapper/test-module-comp')
      .then(({TestModule}) => TestModule)
    )
  },
};
```

Your lazy module need to implement `LazyModule`

```ts
@NgModule({
  declarations: [
    MyModuleComp // Your Component
  ],
  imports: [
    CommonModule,
    MatButtonModule // any dependent module
  ]
})
export class TestModule implements LazyModule {
  getComponents (): LazyModuleComponentInfo[] {
    return [
      {
        name: 'MyModuleComp',  // key to access it
        componentType: MyModuleComp  // your component
      }
    ];
  }
}
```


Use it inside your app with:

```html
<gewd-lazy-module-component
    [componentInputs]="{ testProp: 'Module Component Example' }"
    [componentOutputs]="outputBinding"
    moduleAlias="test-module"
    component="MyModuleComp"
    >
   Normal content that is visible the content isn't loaded.

   <div isLoading>
      This content will be visible while the component is loading / being created.
   </div>  
</gewd-lazy-module-component>
```


{% github negue/gewd no-readme %}

Any ideas / issues / suggestions, write here or open an issue :)
