Supercharged-List
====================
A High Performance List for React Applications.

What's this all About ?
--------
A memoized component which means that it will not re-render if props remain shallow-equal. But here come a twist, if the prop in list is an object and its content remain same, then also it will re-render as it will not remain shallow-equal due to different memory assigned to objects.
So here comes the supercharged-list to overcome this situation. In this it will perform the diff checker of the previous and next props object. It will render only if there is diffrence in the content of object. This will not re-render the entire list with props as object.

Features: 
1. Diff checker to render only those list items whose props object content is changed.
2. For long lists, the items could render in batches automatically.

## Install

```bash
npm install --save supercharged-list
```

or with yarn:

```bash
yarn add supercharged-list
```
## Props

|Prop|Type|Description|Default|Required|
|----|----|-----------|-------|--------|
|`data`|array |Data to be rendered in the list|null|Required|
|`renderItem`|function that return a JSX element|Template of a row in supercharged-list|null|Required|
|`itemKey`|String if data is array of object|For a key prop on each item and uses that for the React key.|"id"|Required if data is array of object|
|`isVirtual`|boolean|if true, the list will be rendered in batches else the complete list will be rendered in one go |false|Optional|
|`batchCount`|number|if isVirtual is true, items count to be rendered in one batch|50|Required if isVirtual is true|

## Usage
Here is a basic usage:
```jsx
import React from "react";
import FlatList from "supercharged-list";

const usersData = [
  { id: 1, name: "xyz", age: 12 },
  { id: 2, name: "abc", age: 24 },
  { id: 3, name: "pqr", age: 18 },
  { id: 4, name: "klm", age: 35 },
];

class Example extends React.Component {
  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
  }
  renderItem(item) {
    return <JSXListElement props={item} />;
  }
  render() {
    return (
      <div className="container">
        <FlatList
          data={usersData}
          itemKey="id"
          isVirtual
          batchCount={100}
          renderItem={this.renderItem}
        />
      </div>
    );
  }
}

```
## More To Come


## Browsers support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Safari |
| --------- | --------- | --------- |
| last 2 versions| last 2 versions| last 2 versions


## Contributors ✨
#### Bhoomika Gupta
#### Gash
