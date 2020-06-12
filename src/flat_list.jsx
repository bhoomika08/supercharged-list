import React from "react";
import isEqual from "lodash.isequal";

const timeoutMilliSec = 10;

const itemChecker = (prevProps, nextProps) => {
  return isEqual(prevProps, nextProps);
};

const ItemRenderer = React.memo(({ item, renderItem }) => renderItem(item), itemChecker);

class FlatList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentDidMount() {
    const { data, batchCount, isVirtual } = this.props;
    if(isVirtual) {
      this.setState({
        items: data.slice(0, batchCount)
      });
    }
  }

  componentDidUpdate({ data: oldData }) {
    const { data, batchCount, isVirtual } = this.props;
    const { items } = this.state;

    if (isVirtual) {
      if (oldData.length == data.length && itemChecker({ data: oldData }, { data })) {
        clearTimeout(this.timeoutId);
        const hasMore =
          items.length + batchCount <= data.length ||
          (data.length - items.length <= batchCount && data.length !== items.length);
        if (hasMore) {
          this.timeoutId = setTimeout(() => {
            this.setState(prevState => ({
              items: [...items, ...data.slice(prevState.items.length, prevState.items.length + batchCount)]
            }));
          }, timeoutMilliSec);
        }
      } else {
        this.setState({ items: [] });
      }
    }
  }

  render() {
    const { data, renderItem, itemKey, isVirtual } = this.props;
    const { items } = this.state;
    return (isVirtual ? items : data).map(item => (
      <ItemRenderer
        key={`List-${typeof item == "object" ? item[itemKey] : item}`}
        item={item}
        renderItem={renderItem}
      />
    ));
  }
}

FlatList.defaultProps = {
  batchCount: 50,
  itemKey: "id",
  isVirtual: false
};

export default FlatList;
