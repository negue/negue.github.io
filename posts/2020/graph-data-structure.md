---
tags: [javascript, graph, gundb, datastructure]
published: true
date: 2020-05-18
title: Working with graph structures
series: Graph-Structures
devTo: true
---

> Preamble: I'm not that experienced in graph-theory or like getting the shortest path to a node. :) This article is rather a short introduction into "How to re-create your usual list-states into a graph/object structure - in addition: with some examples using [GunDB/GunJS][gunDbLink]" 

## What is GunDB/GunJS ?

Its an offline-first, distributed, p2p synced graph-database created by [Mark Nadal][amark]. You can also create accounts (offline) and encrypt data nodes. Enough buzzwords but also true. More info's at the [repo][gunDbLink].

## Example of working with the API and simple data 

```js
const gun = Gun();

gun.get('node').put({
  someString: "Mark",
  someNumber: 42,
});

gun.get('othernode').get('sub').put({
  // ...some other props
});
// sets the data in put, to the node "othernode.sub"
```

You have the following api's:
- `.get('YOUR_NODE')` - just says "go to the node of YOUR_NODE" , and all other operations will be done from this one 
  > note: this does not get the actual value
- `.put()` - sets the data in the current node-context
- `.once(callback)` - gets the data `once`
- there are also other callback types which get the updates all the time - or like normal promises using `.then`
  > [see Docs][docsUrl]

## Working with lists in a object/graph-world

Gun can't really work with lists, due to the syncing between peers is based on properties. 

> This part can be theoretically also used with any redux-like state outside of gun.

Your usual lists look (probably) this:

```js
const myList = [ 
  {
    id: 'someId',
    data: 'string'
  },
  {
    id: 'otherId',
    data: 'other string' // or object
  },
]
```

If you want to move an item in your list or edit this item, you'd either:
- create a new array, which has the items order / new value
- or move item A to new pos X, and the re-set all other affected items to their new pos
- maybe some other way I forgot

A better graph-way would be something like this:

```js
const state = { 
  "yourlist": {
    "nodes": {
      "someId": {
                    id: 'someId',
                    data: 'string'
                },  // or just use the data, if you want to optimize
      "otherId": {
                     id: 'otherId',
                     data: 'other string'
                   },
    },
    "order": {
      "someId": 1,
      "otherId": 2,
    }
  }
}
```

At first glance it looks like a lot of unneeded / redundant stuff right?

But you probably ask yourself, "what If I just set the whole `yourlist`-node, wouldn't that just work?" - Yes, if you just subscribe only to this one node, you don't need any optimization. Then you could just add the order property to node. 

With this type of state:
- you only have 2 operations when switching a position of two items
- you only have 1 operation when changing the data of a node

> Note: Less operations, means less data to sync => faster

I choose this structure, because I had encrypted data nodes and when the whole list changed, I had to de-crypt all nodes on each new callback - which is wasted CPU / Page performance. But with that optimized structure, I could handle this much easier, without having to use something like an "object-differ":
- Subscription: "the order changed" => just move item to different place
- Subscription: "the data changed" => load the newest update -> decrypt -> show it

Sure, this still is not the "perfect" solution, for example: When you have 100 items, and you want to move Item 44 to 55, you'd have to do 12 operations.

If you want to optimize this even further, you could implement a linked list, with this you could even decrease the number operations, to about 3.

> Note: It all depends on the amount of your data.

But how to get the correct order again?

```js
const {nodes, order} = state.yourlist;

const orderedList = Object.values(nodes)
      .sort((a, b) => order[a.id] - order[b.id]);
```

## Working with lists in a GunDB-World

```js
const gun = Gun();

// Saving data
const graphNode = gun.get('your_list');
const nodes = graphNode.get('nodes');
const order = graphNode.get('order');

nodes.get('someId')
      .put({
        id: 'someId',
        data: 'string'
      });

nodes.get('otherId')
      .put({
        id: 'otherId',
        data: 'other string'
      });

order.get('someId')
     .put(1);

order.get('otherId')
     .put(2);

// react on changed data (or reading from gun) 
graphNode.on((listData) => {
  const {nodes, order} = listData;
  
  const orderedList = Object.values(nodes)
        .sort((a, b) => order[a.id] - order[b.id]);

  // work with the list, send it to your views etc
});

```

I hope this was an "easy"-ish intro to list-handling with GunDB and or object-only states, if not please write me on how it could be made better?

[amark]: https://github.com/amark
[gunDbLink]: https://github.com/amark/gun
[docsUrl]: https://github.com/amark/gun/wiki/API
