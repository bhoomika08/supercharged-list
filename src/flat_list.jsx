import React from "react";
import isEqual from "lodash.isequal";

const itemChecker = (prevProps, nextProps) => {
  return isEqual(prevProps, nextProps);
};

const ItemRenderer = React.memo(({ item, index, renderItem }) => renderItem(item, index), itemChecker);

class FlatList extends React.Component {
  render() {
    const { data, renderItem, customClass, itemKey = "id" } = this.props;
    return (
      <div className={`list-container ${customClass}`}>
        {data.map(item => (
          <ItemRenderer key={`List-${item[itemKey]}`} item={item} renderItem={renderItem} />
        ))}
      </div>
    );
  }
}

export default FlatList;
