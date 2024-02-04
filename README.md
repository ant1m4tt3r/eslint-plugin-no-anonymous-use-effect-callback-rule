# @antimatter-labs/eslint-plugin-no-anonymous-use-effect-callback-rule

This package provides an opinionated eslint rule that enhances the readability and maintainability of `React.useEffect` usage, by suggesting the usage
of names functions for `useEffect` callbacks.

This was inspired by this [tweet](https://twitter.com/housecor/status/1750980809874436431) of [Cory House](https://twitter.com/housecor). Thanks!

### TLDR

It will make eslint scream at you if you write
```js
useEffect(() => {
   fetch('...').then(() => console.log("Complete!"))
}, [])
```

instead of writing
```js
useEffect(function initialComponentFetch() {
   fetch('...').then(() => console.log("Complete!"))
}, [])
```


### Usage

Install it using your package manager:
```
npm i -D @antimatter-labs/eslint-plugin-no-anonymous-use-effect-callback-rule
```
```
yarn add -D @antimatter-labs/eslint-plugin-no-anonymous-use-effect-callback-rule
```
```
pnpm add -D @antimatter-labs/eslint-plugin-no-anonymous-use-effect-callback-rule
```

In your eslint config file add the following (remeber to replace <severity> with the desired value: `"error"`, `"warn"`...)

```json
{
  ...
  "plugins": [
    ...,
    "@antimatter-labs/eslint-plugin-no-anonymous-use-effect-callback-rule"
  ],
  "rules": {
    ...,
    "@antimatter-labs/no-anonymous-use-effect-callback-rule/base": ["<severity>"]
  },
}
```

The rule act on the following expressions and will trigger a message with the severity specified by you in your eslint config.

```js
import * as React from 'react'

function MyComponent() {
  React.useEffect(function () {})
  React.useEffect(() => {})

  return ...
}
```

```js
import * as React from 'react'

function MyComponent() {
  useEffect(function () {})
  useEffect(() => {})

  return ...
}
```