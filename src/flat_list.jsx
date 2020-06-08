import React from "react";
import isEqual from "lodash.isequal";

const defaultBatchCount = 50;

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
    this.timeout;
  }

  componentDidMount() {
    const { data, batchCount = defaultBatchCount, isVirtual = false } = this.props;
    this.setState({
      items: isVirtual ? data.slice(0, batchCount) : data
    });
  }

  componentDidUpdate({ data: oldData }) {
    const { data, batchCount = defaultBatchCount } = this.props;
    const { items } = this.state;

    if (oldData.length == data.length) {
      if (itemChecker({ data: oldData }, { data })) {
        clearTimeout(this.timeoutId);
        const hasMore =
          items.length + batchCount <= data.length ||
          (data.length - items.length <= batchCount && data.length !== items.length);
        if (hasMore) {
          this.timeoutId = setTimeout(() => {
            this.setState(prevState => ({
              items: [...items, ...data.slice(prevState.items.length, prevState.items.length + batchCount)]
            }));
          }, 100);
        }
      } else {
        this.setState({ items: [] });
      }
    } else {
      this.setState({ items: [] });
    }
  }

  render() {
    const { renderItem, itemKey = "id" } = this.props;
    const { items } = this.state;
    return items.map(item => (
      <ItemRenderer
        key={`List-${typeof item == "object" ? item[itemKey] : item}`}
        item={item}
        renderItem={renderItem}
      />
    ));
  }
}

export default FlatList;
