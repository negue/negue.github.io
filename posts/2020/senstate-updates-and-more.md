---
tags: [javascript, angular, csharp, senstate]
published: true
date: 2020-06-11
title: 'Senstate - Updates, C#-Client and a future look'
series: Senstate - Debug Dashboard
devTo: true
---

[![Example Senstate Gif](https://thepracticaldev.s3.amazonaws.com/i/zmtm5zab2vlu51qnnnda.gif) <br/> Demo](https://senstate-dashboard-master.netlify.app/#/)


Finally after some months I worked a bit on Senstate again. I had some features already "done", but only some days ago I merged the PR. :smile:

# :confetti_ball: Senstate v0.3 :tada:

New features:
- Group Watchers

  ![group_feature](https://user-images.githubusercontent.com/842273/84432637-610d7880-ac2d-11ea-8cd1-cefa4177b9c8.PNG)

- List Watchers (instead of a masonry-grid, still need some more stying, ideas? thoughts?)
- You can add "difference"-View to see the change of the previous value

  ![example of the difference feature](https://user-images.githubusercontent.com/842273/84432324-f65c3d00-ac2c-11ea-9dc6-f84a4328e5d3.png)

- Errors can be searched on multiple sites, opens a new tab:
  - DuckDuckGo
  - Github
  - Google
  - StackOverflow
  
Also see [CHANGELOG.md](https://github.com/senstate/platform/blob/master/CHANGELOG.md)

# :construction: Whats next?

## In-Web-App-Overlay
Began working on an overlay to use inside your Web-App.

This will be done with Angular Elements (which can be used even without Angular).

Only the "target" connection will be changed (instead of the Hub-Connection), everything else will stay the same.

Repo / wip-changes will be pushed soon

## Now finally working on the C# client:

My goal is to create a library that could be used with, initial tests worked with:
- .Net Standard (I hope this would be all possible targets?)
- Unity
- Blazor Server / WebAssembly

The Library(ies) will be splitted into:
- The main logic, watchers/logger
- separated WebSockets implementation
- separated Json implementation

So that way every possible Target / Platform can have their own Json/WebSocket implementation.

[Repo](https://github.com/senstate/csharp-client) 

I'll post an article on how to use it, once the first version  is published

## Misc

- Try if react-native "just" works ?
- Save Dashboard settings to localStorage
- Extend the Dashboard (all the time, suggestions welcomed)
- Add instructions to the Dashboard itself (if no app is connected) - maybe just show the markdown-file of the client-library? - ideas?
- Creating an example repo for all possible libraries / targets
- Bug fixes

# Feedback

If there are any ideas / feature requests / issues / use-cases, please tell me :)

