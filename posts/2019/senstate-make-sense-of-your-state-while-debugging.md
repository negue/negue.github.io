---
tags: [javascript, typescript, node]
published: true
date: 2019-10-29
title: 'Senstate - Make sense of your state while debugging'
---

Having sometimes multiple `console.log`s while trying to find a bug that only happens with a weird state, you kinda get lost scrolling the log up and down. Or adding a bunch of break-points and then stepping into multiple ones. In the past years this happened quite often to me, and last month I thought it needs be easier to debug / see important variables while working on your project.

Fast forward until today.

![Example Senstate Gif](https://thepracticaldev.s3.amazonaws.com/i/zmtm5zab2vlu51qnnnda.gif)
<figcaption>Senstate "Debug" Dashboard</figcaption>

## :confetti_ball: Introducing `@senstate/cli` :tada:

The cli acts as an hub to accept client-events (via WebSockets) and send them to the dashboard. 

Current features:
- watch variables / state of your application
- send logs
- send errors
- open dashboard via qr-code on a phone / tablet (to free up a monitor/space)


Current available client libraries:
- [:link: JS/TS](https://github.com/senstate/platform/blob/master/libs/client/README.md) (exampled in this article)
- [:link: Rust](https://github.com/dnaka91/senstate-rs) (by [:link: dnaka91][dnaka_profile])
- [:link: Go](https://github.com/dnaka91/senstate-go) (by [:link: dnaka91][dnaka_profile])

more libraries in progress:
- C#
- Kotlin (by [:link: dnaka91][dnaka_profile])

[dnaka_profile]: https://dnaka91.netlify.com

## Add it to your project

### 1. Install the client
`npm install @senstate/client` contains the utils / methods, not actually sending anything to the hub

`npm install @senstate/client-connection` is used to send the data to the hub. I wanted to have it separately if for example it would send to other hubs / or different protocols.

### 2. Register your app:
```ts
import {setSenstateConnection} from "@senstate/client-connection";

setSenstateConnection({
  name: 'My Example App',
  // appId: 'customShortId' optional
}  /* , ws://localhost:3333 */); // custom hub-address, working locally you won't need to change the target address
```
Without calling `setStenstateConnection` all watchers/senders won't send anything to the Dashboard.


### 3. Low-Level Watcher / Senders
You can create a sender and call it how often you like to push the values to the Dashboard:

**Watch** (for variables): Sends a value of a tag:

```ts
const watcher = createWatchSender("myTag");

watcher(yourVariableOrValueToSend) // where you need it

```

**Log**
```ts
const logger = createLogSender(LogLevel.Info, "optional log name")


logger("message to send", {optionalObject: 'can be empty :)'})
```

**Errors**

Un-caught window errors will be send to the hub with:
`registerWindowErrorHandler()` (call once)

<hr>
You can use the senders above, but there is also some code-candy :lollipop:

### 4. Field decorators
Automatically sends the value on a change to the hub :tada:
 
```ts
class YourClass {
  @PropertyWatcher()
  public watchProperty = 0;

  @PropertyWatcher('otherKey')
  public watchOtherProperty = 0;
}
```

### 5. RXJS pipes

```ts
import { SenstateOperators } from '@senstate/client';

myObservable$.pipe(
   SenstateOperators.watch('Watcher Tag'), // Watcher
)

other$.pipe(
   SenstateOperators.log('Log Name')
)

// Measure time between pipe-operators
const time = new TimeMeasurer(tag);

trigger$.pipe(
   SenstateOperators.measureStart(time),
   mergeMap(() => longerObservableExecution$),
   SenstateOperators.measureStep(time)
)

```

## :construction: Whats next?

The project is still WIP, but I hope it'll help you.

The Dashboard isn't that polished yet, but I'm sure it'll be better after a few iterations.

If there are any ideas / feature requests / issues, please tell me :)

