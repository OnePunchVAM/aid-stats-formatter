# AID Stats Formatter Plugin

[![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)

A plugin that allows you to format the stats UI in AID. Through the configuration object found in `shared.js` you can change how the stats are ordered, aligned and/or whether the label should be displayed.

```js
const statsFormatterConfig = {
  order: ["Author's Note", "Scene", "Think", "Focus", "World Info"], // an array of strings corresponding with the label of the stats
  alignVertical: true,
  truncateLabels: true
}
```  

![Stats Formatter in Action](https://media.discordapp.net/attachments/717764081058185316/818082296711479306/unknown.png?width=1610&height=846)

## Usage

This is meant to be used in conjunction with other scripts that actually "do" something with the `state.displayStats` functionality built within AID.

If you are creating your own script that modifies the `state.displayStats` array, consider using this plugin to help you display it nicely.

To use, simply call the `statsFormatterPlugin.execute(statsFormatterConfig)` after you have made changes to `state.displayStats`.