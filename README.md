# fjump

<img title="fjump" src="/assets/tutorial.gif" width="480">

fjump is a simple, light-weight web app that makes navigating to URLs faster, it does so utilizing Chrome's tab-to-search feature.

Say you want to create a new Google document, instead of navigating to https://docs.google.com/, waiting for it to load and become responsive and clicking on "Start a new document", you simply type `fj`, hit `Tab`, type `docs new` (or just `dn`, if you're lazy) and hit `Enter`.

Chrome will then open https://fjump.to/?q=docs+new which in turn will parse the query string and redirect you to https://docs.google.com/document/u/0/create.

This can be useful in any number of cases where reaching some URL can be a bit convoluted.

## develop

```
yarn start
```

## deploy

```
yarn deploy
```
