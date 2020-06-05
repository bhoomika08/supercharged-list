import React from "react";
import isEqual from "lodash.isequal";

const itemChecker = (prevProps, nextProps) => {
  return isEqual(prevProps, nextProps);
};

const ItemRenderer = React.memo(({ item, renderItem }) => renderItem(item), itemChecker);

class FlatList extends React.Component {
  render() {
    const { data, renderItem, customClass = "", itemKey = "id" } = this.props;
    return data.map(item => <ItemRenderer key={`List-${item[itemKey]}`} item={item} renderItem={renderItem} />);
  }
}

export default FlatList;
