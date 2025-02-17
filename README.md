# Erratic Keys

Web app to make a custom keyboard layout changing the output of every key.

>Note: this web app only works properly on a computer, since smartphones' keyboards don't raise keyboard events the same way. Also, it depends on the `getLayoutMap()` method which is experimental (it's not crucially needed).

## Features

- Set a string (like: `"😃👍"`) as the output of a key: every time you press that key, instead of printing its default value (key `a` print string `"a"`), prints the set string.
- Set a different string when the key is pressed with `shift` (`shift+a`).
- Keyboard configuration is saved automatically in `localStorage`.
- Save as a JSON file the keyboard configuration.
- Load the keyboard configuration from a JSON file.
- Detect the physical keyboard layout to show the modified keys in the configuration (this use the `getLayoutMap()` method).

## Local deployment

```
npm i
npm run dev
```

