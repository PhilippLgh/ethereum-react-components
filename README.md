[![CircleCI](https://circleci.com/gh/PhilippLgh/ethereum-react-components.svg?style=shield)](https://circleci.com/gh/PhilippLgh/ethereum-react-components)

# Ethereum React Components

A library of frequently used Ethereum React components to display and handle addresses, transactions, accounts...

For a detailed documentation of all available components check out [the generated storybook](https://philipplgh.github.io/ethereum-react-components)

WARNING: this lib is not production ready

# Examples

Two projects using these components are

- [Mist React](https://github.com/ethereum/mist-ui-react)
- [Mist](https://github.com/ethereum/mist)

# Development

## Clone & Storybook

```
git clone https://github.com/PhilippLgh/ethereum-react-components.git
cd ethereum-react-components
yarn
yarn storybook
```

## Local Testing

```
cd ethereum-react-components
yarn link
cd my/project/with/ethereum/components
yarn link "ethereum-react-components"
```

# Installation

Our CI automatically bundles and publishes the latest production version to [NPM](https://www.npmjs.com/package/ethereum-react-components) and
[GitHub Releases](https://github.com/PhilippLgh/ethereum-react-components/releases)

```
yarn add ethereum-react-components
```

# Use in project

```
import { Identicon } from 'ethereum-react-components';

<div>
  <Identicon address="0xF5A5d5c30BfAC14bf207b6396861aA471F9A711D" />
</div>
```

For a detailed documentation check out e.g. the [Identicon story](https://philipplgh.github.io/ethereum-react-components?selectedKind=Widgets%2FIdenticon)
