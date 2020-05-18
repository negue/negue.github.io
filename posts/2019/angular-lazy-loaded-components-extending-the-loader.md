---
tags: [angular, lazyloaded, ivy, performance]
published: true
date: 2019-10-01
title: 'Lazy Loaded Components - #3 Extending the Loader'
series: 'Angular: Lazy Loading Components'
---

## Adding a loading Placeholder

With the current Loader, you can set a placeholder (e.g. a button to trigger the loading) and once it's loaded + created the content of the loader will be switched to the loaded component.

But what if the connection is slow? (Well .. thats the main goal of this Series :smile:, to improve the initial load performance of an angular app :sweat_smile:) What if the Device is slow? 

You could switch the placeholder content in your host-component (The component that uses the loader and sets the placeholder). But I kinda want to have a simpler way (less duplicate code for all of your host-components.)

So let's extend the loader with another `<ng-content>` which only is visible during the load.


```html
      <ng-content *ngIf="componentLoading | async"
                  select="[isLoading]"></ng-content>
```

The `select` here uses an element attribute (`isLoading`) to select what has to be projected there.

```ts
  @Output()
  public componentLoading = new EventEmitter();
```

`componentLoading` just emits `true`/`false` before and after the component is loading. Sadly I needed to add ```ts
  private cd: ChangeDetectorRef

  // and

  this.cd.detectChanges();
```

otherwise the `EventEmitter` / or rather the template, didn't do anything.

Example how to use it in your hosting-component:

```html
<helpers-dynamic-loader component="my-own">
  This is a placeholder, while nothing is loading, could also have a button to trigger the load :)

  <div isLoading>
    <mat-progress-spinner mode="indeterminate" [diameter]="24"></mat-progress-spinner>
    Component loading...
  </div>
</helpers-dynamic-loader>

```


[Click here](https://gist.github.com/negue/5f4435c7e1d2c11449691d342b39cdd5) for the latest version :tada:


### Current limitations:
The component-loader works fine for custom components, but the lazy-loaded-components can't use any other components. (This weirdly happens without an error).



### to be (also) done... 

- an example repo (started :tada:) 
- maybe export the loader as a bit component? 
