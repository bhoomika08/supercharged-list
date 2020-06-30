# Supercharged-List

A High Performance List for React Applications.

## What's this all About ?

A memoized component which means that it will not re-render if props remain shallow-equal. But here come a twist, if the prop in list is an object and its content remain same, then also it will re-render as it will not remain shallow-equal due to different memory assigned to objects. So here comes the supercharged-list to overcome this situation. In this it will perform the diff checker of the previous and next props object. It will render only if there is diffrence in the content of object. This will not re-render the entire list with props as object.

### The List could be rendered in either of 3 ways:

1. <b>Default Behaviour:</b> Entire List to be rendered in one go. (autoLoad=false && loadOnScroll=false) 
2. The List items rendered in batches automatically. (autoLoad=true)
3. The List Items rendered in batches on scrolling. (loadOnScroll=true)

### Features:

1. Diff checker to render only those list items whose props is changed.
2. Can scroll to a particular List Item in the List to be rendered.

## Install

With npm:
```bash
npm install --save supercharged-list
```

or with yarn:
```bash
yarn add supercharged-list
```

## Props

| Prop | Type | Description | Default | Required |
| --- | --- | --- | --- | --- |
| `data` | array | Data to be rendered in the list | null | Required |
| `renderItem` | function that return a JSX element | Template of a row in supercharged-list | null | Required |
| `itemKey` | String if data is array of object | To assign React key to each List Item | "id" | Required if data is array of object |
| `autoLoad` | boolean | To render List in batches automatically | false | Optional |
| `batchCount` | number | Number of List Items to be rendered in one batch | 50 | Required if autoLoad or loadOnScroll is true |
| `loadOnScroll` | boolean | To render List in batches on scroll | false | Optional |
| `scrollParent` | selector | View Port in which the List is scrolled | window | Required if loadOnScroll is true |
| `isTabular` | boolean | Used to create an extra html tag for reference to each List Item.<br> It should be true if List Item is a table row of Table.<br> If isTabular is true, "tr" tag is used for reference else "span" tag is used. | false | Required |
| `positionToScroll` | Number | Array Index of List Item to be scrolled to in data to be rendered | null | Optional |
| `onScrollToElementEnd` | function | Function to be called after scrolled to particular List Item | empty function | Optional |

## Usage

Here is a basic usage:

```jsx
import React from "react";
import FlatList from "supercharged-list";

const usersData = [
  { id: 1, name: "xyz", age: 12 },
  { id: 2, name: "abc", age: 24 },
  { id: 3, name: "pqr", age: 18 },
  { id: 4, name: "klm", age: 35 }
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
          autoLoad / loadOnScroll
          scrollParent={"[data-scroll-parent]"}
          isTabular //---------- true if ListItem is a row of table ---------------//
          positonToScroll="2" //----------- To scroll to a particular List Item index -------//
          batchCount={100}
          renderItem={this.renderItem}
        />
      </div>
    );
  }
}
```

## React Dependency
lodash.isequal: "^4.5.0"

## Versions required
node version : >=10 <br/>
react: "^16.0.0"
 

## Contributors ✨
#### Bhoomika Gupta
#### Gash
