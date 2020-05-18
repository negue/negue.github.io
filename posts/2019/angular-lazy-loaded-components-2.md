---
tags: [angular, lazyloaded, ivy, performance]
published: true
date: 2019-09-15
title: 'Lazy Loaded Components #2'
series: 'Angular: Lazy Loading Components'
---


Extending the features of the **component-level lazy loader** thanks to :tada: Ivy :tada:

Continue from Part 1:

## 1. Inject services into lazy-loaded components:
Since the loader uses the same injector-Instance we can inject the same services as the parent Component. 

Side-note: The usual lifecycle callbacks are still working on lazy-loaded components.

## 2. `@Input()`
To set the inputs on the loaded component, the loader uses `componentInputs: any` as `@Input()` 

```ts
  private setInputs() {
    if (this.componentInstance && this.componentInputs) {
      const inputs = Object.keys(this.componentInputs);

      for (const inputKey of inputs) {
        this.componentInstance[inputKey] = this.componentInputs[inputKey];
      }
    }
  }
```

`setInputs` will be called once after the component is created and on each `ngOnChanges` that is called for `componentInputs`. 

Now you can also set inputs to the loaded component :tada:

## 3. `@Output()`
In order to use the outputs of your loaded component, you can just set your callbacks with:

```html
[componentOutputs]="{
 outputName: onYourCallbackMethod
}"
```

Since this object is just a dictionary of `key: Function`, its rather "easy" to subscribe to the loaded component outputs. :tada:

```ts
  private unsubForOutputs$ = new Subject();
  private setOutputs () {
    this.unsubOutputs();

    if (this.componentInstance && this.componentOutputs) {
      const outputs = Object.keys(this.componentOutputs);

      for (const outputKey of outputs) {
        if (this.componentInstance[outputKey]) {
          const emitter = this.componentInstance[outputKey] as EventEmitter<any>;
            emitter.pipe(
              takeUntil(this.unsubForOutputs$),
            ).subscribe(this.componentOutputs[outputKey]);
        }
      }
    }
  }

  private unsubOutputs () {
    this.unsubForOutputs$.next();
  }
```

## 4. Prevent loading the same components multiple times

The prior example had this:
```ts
const imported = await DynamicLoaderComponent.LazyComponents[this.component]();
``` 

That way the requested component would be loaded (HTTP-call) every time.

To prevent this we can just add a simple cache - object which holds the resolved-promises (in the same way I refactored the registration (again :sweat_smile:)):

```ts
export class DynamicLoaderRegistry {
  // Registry
  public static LazyComponents: { [key: string]: () => Promise<any> } = {};
  // Loaded-Cache
  public static AlreadyLoaded: { [key: string]: Promise<any> } = {};
}


// cache the promises
    const importComponent = DynamicLoaderRegistry.AlreadyLoaded[this.component]
      || (DynamicLoaderRegistry.AlreadyLoaded[this.component] = DynamicLoaderRegistry.LazyComponents[this.component]());

    const imported = await importComponent;
```

Now if the same component is requested, its only loaded once :tada:

## Finalizing the component-loader :tada: (.. for now :sweat_smile:)

See: [Current Version](https://gist.github.com/negue/5f4435c7e1d2c11449691d342b39cdd5/d4a061ca399dc0c3ea0ff7149ffc765c0cbd9dfa)


to be continued / tried / tested:
- example repo / project
- show that the component is loading
- lazy-loaded module (and one of its components)


Any thoughts / suggestions / ideas ?
