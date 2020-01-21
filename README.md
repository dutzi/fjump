# fjump

<img title="fjump" src="/assets/tutorial.gif" width="480">

fjump is a simple, light-weight web app that makes navigating to URLs faster, it does so utilizing Chrome's tab-to-search feature.

Say you want to create a new Google document, instead of navigating to https://docs.google.com/, waiting for it to load and become responsive and clicking on "Start a new document", you simply type `fj`, hit `Tab`, type `docs new` (or just `dn`, if you're lazy) and hit `Enter`.

Chrome will then open https://fjump.to/?q=docs+new which in turn will parse the query string and redirect you to https://docs.google.com/document/u/0/create.

This can be useful in any number of cases where reaching some URL can be a bit convoluted.

## Why fjump?

F and j keys are easily accessible when [touch typing](https://en.wikipedia.org/wiki/Touch_typing) thanks to their raised dot or bar.

Also, because of how the keys are laid out, typing f, followed by j, followed by tab is pretty fast.

## fjump is fast

Your fjump configurations (i.e., the commands you have defined) are stored within your local storage. No need to wait for server authentication (you don't even need to set up an account).

Also, as soon as the main html file gets loaded, the URL is parsed so you get redirected almost instantly.

## fjump is free

fjump is [open source](https://github.com/dutzi/fjump) and free (and will always be free).

## Also...

### Fuzzy Search

fjump uses fuzzy search when looking up which command to run, if no command found it will serve you a list of the closest commands available, and will redirect you to the closest one within 1 second. Within that 1 second you can use the arrow keys to choose a different command, or refine your query by retyping the trigger.

### Adding Commands

You can add commands by navigating to [fjump.to](https://fjump.to/) and clicking on Add Command, _or_ you can save some clicks by copying the URL you want the command to redirect you to and hitting `f`, `j` and `Tab`, pasting the URL and then hitting `Enter`. fjump will offer creating a new command with that URL so all you need to do is enter a trigger and hit `Enter` to submit.

## develop

```
yarn start
```

## deploy

```
yarn deploy
```
