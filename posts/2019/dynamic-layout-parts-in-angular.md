---
tags: [angular, optimization, performance]
published: true
date: 2019-12-27
title: Dynamic Layout parts in Angular
---

## The "Problem"

While working on a simple application I wanted to show some content in the title / header bar, but this should be only visible on a specific route.

*header.component.html*:
```html
<div class="header">
  <ng-container *ngIf="!showSuperSelection">{{ title }}</ng-container>
  <!-- this component is only needed in an "/selected-page" - route -->
  <app-your-big-component *ngIf="showSuperSelection">
  </app-your-big-component>
</div>
```

## 1st solution: `*ngIf`

- "just" hide (`*ngIf="showSuperSelection"`, exampled in the problem) the content in the header-bar until the specific route was opened

|Pro's|Con's|
|--------------|-----|
| easy to use, just an `*ngIf` | its "bad" if this content is a bigger component (byte size), which adds a lot of to the first loading time (every byte counts), which is only "ok" if you are building an intranet-application |

## 2nd solution: Service - ng-template - template outlet

- You could create a directive to get `TemplateRef`
- then using a service to save that reference
- then in your target view, get this reference and use it like 
  ```html
  <ng-container *ngIf="templateToShow$ | async as templateRef"
                [ngTemplateOutlet]="templateRef">
  </ng-container>
  ``` 

There you have your dynamic templates / layout parts in your app.


|Pro's|Con's|
|--------------|-----|
| now this template would be only visible when you need it, and also not adding additional bytes to load | you would've to do it for every part you need |


## My solution: :rocket: <br /> `npm install @gewd/ng-utils -S` 

Building up on the 2nd's solution, I kinda wanted to have it a bit more dynamic, so I refacted it to be used on a ID per portal/source.

```ts
import { DynamicPortalModule } from '@gewd/ng-utils/dynamic-portal';

@NgModule({
  imports: [
    // ...
    DynamicPortalModule
  ]
})
```

*header.component.html*:
```html
<div class="header">
  <dynamic-portal key="headerSelection" class="your-style">
    {{ title }}
  </dynamic-portal>
</div>
```

*selected-page.component.html*: which is a lazy-loaded route
```html
<div class="stuff">
  Much stuff, details, you name it :-)
</div>

<ng-template dynamicPortalSource="headerSelection">
   <app-your-big-component></app-your-big-component>
</ng-template>
```

[> Demo <](https://gewd-packages-demo.netlify.com/) -> Open the `Dynamic Portal Component` Part

|Pro's|Con's|
|--------------|-----|
| portal's / portal-sources can be placed anywhere | you'd need to use this package or copy it :grin: |


{% github negue/gewd no-readme %}

Any ideas / issues / suggestions, write here or open an issue :)
