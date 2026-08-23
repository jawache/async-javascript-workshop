# This code has moved

**The course is now Advanced JavaScript. Its home is [learn.asim.dev/advjs](https://learn.asim.dev/advjs).**

This is the workshop repo for **Asynchronous JavaScript**, a course I made in 2018. That
course has been rebuilt and folded into a bigger one, **Advanced JavaScript**, and all of
the code has moved with it. Start at the link above: it is the course's home, and everything
else lives from there.

## The code is here now

https://github.com/jawache/advanced-javascript

That is the maintained repo. It has everything this one had, plus the rest of the course:
every file I put on screen, in the folders the videos show, verified against current Node.
Its README walks you through the four ways code runs on the course, which is a file and
`node`, select a block and press F8 in VS Code, a Chrome DevTools snippet, and a small
local server for the two lectures that need a real `http://` origin.

```bash
git clone https://github.com/jawache/advanced-javascript.git
cd advanced-javascript
node hello.js
```

## Nothing here has been deleted

The 2018 files are exactly where they have always been, on the `master` branch. If you are
part way through the old course, or you have this repo cloned already, carry on. Nothing
you have breaks.

```bash
git clone --branch master https://github.com/jawache/async-javascript-workshop.git
```

You are reading this on `main`, which is now the branch you land on. That is the only
change: the front door tells you where the current code is, instead of quietly handing you
files from 2018 as though they were up to date.

## Which one do you want?

- Doing **Advanced JavaScript** (or anything I have made since): clone
  `jawache/advanced-javascript`.
- Doing the old **Asynchronous JavaScript** course: `master`, above. Its handouts are all
  in the new repo as well, unchanged, under `node/` and `browser/`.

Asim
