---
tags: [angular, lazyloaded, ivy, performance]
published: true
date: 2019-08-25
title: Lazy Loaded Components in Angular
series: 'Angular: Lazy Loading Components'
---



Back in the old AngularJS Days I had a little playground app where I could lazy load nearly everything.

Ever since Angular 2 came out, I searched every few months about lazy loading components. 

Some time after release, it got quite easy to lazy load angular modules based on your routes, and also got easier with simple [npm packages / files](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-4.html), but there weren't any "easy"(-ish) ways to lazy load a component, but thankfully Ivy will finally change that. :tada:

## 1. Wait, before you continue reading...

I suggest you to read [Artur's Post about `Asynchronous modules and components in Angular Ivy`](https://blog.angularindepth.com/asynchronous-modules-and-components-in-angular-ivy-1c1d79d45bd3) first, great introduction and explanation!

This component loader is based on his example, loading the components based on a fixed `import()-path`.


## 2. Refactoring the example Component [Link](https://gist.github.com/negue/5f4435c7e1d2c11449691d342b39cdd5/5bc827ee9fda2115da34ce6d9a0bf24986c6bce9)

I added a simple map which holds all my lazy loadable components. 

```ts
// list of lazy loaded components
const lazyComponents = {
  'lazy-comp': () => import('../lazy-comp/lazy-comp.component'),
  'other-comp': () => import('../lazy-comp/other-comp.component')
};
```

With each `import` line, the angular-cli (or rather webpack) marks those imports as lazy and those will be extracted to a separate chunk.

```bash
chunk {lazy-comp-lazy-comp-component} lazy-comp-lazy-comp-component.js, lazy-comp-lazy-comp-component.js.map (lazy-comp-lazy-comp-component) 1.55 kB  [rendered]
chunk {lazy-comp-other-comp-component} lazy-comp-other-comp-component.js, lazy-comp-other-comp-component.js.map (lazy-comp-other-comp-component) 1.57 kB  [rendered]
```


Now you only need to set 
```html
<my-dynamic-loader component="lazy-comp"></my-dynamic-loader>
```

And your component is lazy loaded :tada:


## 3. Refactoring continues..
Now lets register the lazy-components outside the loader-component itself, so that its a bit *more* dynamic. (Now `DynamicLoaderComponent` can be used from a library and additional lazy-components can be added from everywhere else)


```ts
DynamicLoaderComponent.LazyComponents = {
  'lazy-comp': () => import('./lazy-comp/lazy-comp.component'),
  'other-comp': () => import('./lazy-comp/other-comp.component')
};
```
[Refactored Version](https://gist.github.com/negue/5f4435c7e1d2c11449691d342b39cdd5/b4307735eda415606e5c035e7d631d9dda69527a)


to be continued / tried / tested:
- Inject services into lazy components
- `@Input()`/`@Output()`
- prevent loading the same component multiple times / loaded component cache
- events on Component loaded / created / others
- example repo / project

Any thoughts / suggestions / ideas ?
