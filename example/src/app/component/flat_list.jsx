import React from "react";
import isEqual from "lodash.isequal";

const itemChecker = (prevProps, nextProps) => {
  return isEqual(prevProps, nextProps);
};

const ItemRenderer = React.memo(({ item, index, renderItem }) => renderItem(item, index), itemChecker);

class FlatList extends React.Component {
  componentDidMount() {
    {console.log("After redux-counter",performance.now())}
  }
  render() {
    const { data, renderItem, customClass, itemKey } = this.props;
    return (
      <div className={`list-container ${customClass}`}>
        {data.map(item => (
          <ItemRenderer key={`List-${itemKey}`} item={item} renderItem={renderItem} />
        ))}
      </div>
    );
  }
}

export default FlatList;
