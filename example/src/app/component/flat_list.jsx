import React from "react";
import isEqual from "lodash.isequal";

const timeoutMilliSec = 0;

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
    this.lastItemRef = React.createRef();
    this.loadMoreItems = this.loadMoreItems.bind(this);
    this.scrollToElement = this.scrollToElement.bind(this);
  }

  componentDidMount() {
    const { data, batchCount, isVirtual, isScroll, scrollParent } = this.props;
    const { items } = this.state;

    if (isVirtual) {
      this.setState({
        items: data.slice(0, batchCount)
      });
    } else if (isScroll) {
      if (data.length > 0 && items.length == 0) {
        this.setState({
          items: data.slice(0, batchCount)
        });
      }
      const parent = scrollParent ? document.querySelector(scrollParent) : window;
      const parentHeight = scrollParent ? parent.clientHeight : window.innerHeight;
      parent.addEventListener("scroll", () => {
        if (this.lastItemRef.current.getBoundingClientRect().bottom - 300 <= parentHeight) {
          this.loadMoreItems();
        }
      });
    }
  }

  componentDidUpdate({ data: oldData }) {
    const { data, batchCount, isVirtual, isScroll, itemToScrollPosition } = this.props;
    const { items } = this.state;
    if (isVirtual) {
      if (oldData.length == data.length && itemChecker({ data: oldData }, { data })) {
        this.loadMoreItems();
      } else {
        this.setState({ items: [] });
      }
    } else if (isScroll) {
      if (oldData.length == data.length && itemChecker({ data: oldData }, { data })) {
        if (items.length == 0)
          this.setState({
            items: data.slice(0, batchCount)
          });
      } else {
        this.setState({ items: [] });
      }
    }
    if (itemToScrollPosition >= 0 && itemToScrollPosition != null) {
      if (itemToScrollPosition > items.length) {
        this.loadMoreItems();
      } else {
        this.scrollToElement(itemToScrollPosition);
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleOnScroll);
  }

  loadMoreItems() {
    const { data, batchCount } = this.props;
    const { items } = this.state;
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
  }

  scrollToElement(itemPosition) {
    const { onScrollEnd } = this.props;
    const { items } = this.state;
    const referenceElement = itemPosition == items.length - 1 ? this.lastItemRef.current : this.refs[`Ref-${itemPosition}`];
    clearTimeout(this.scrollEnd);
    referenceElement.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
    this.scrollEnd = setTimeout(() => onScrollEnd(), 3000);
  }

  render() {
    const { data, renderItem, itemKey, isVirtual, isScroll, ListItemType } = this.props;
    const { items } = this.state;
    const lastIndex = items.length - 1;
    return (isVirtual || isScroll ? items : data).map((item, idx) => (
      <React.Fragment key={`List-${typeof item == "object" ? item[itemKey] : item}`}>
        <ItemRenderer item={item} renderItem={renderItem} />
        <ListItemType ref={lastIndex == idx ? this.lastItemRef : `Ref-${idx}`}></ListItemType>
      </React.Fragment>
    ));
  }
}

FlatList.defaultProps = {
  batchCount: 50,
  itemKey: "id",
  isVirtual: false,
  isScroll: false,
  ListItemType: "span",
  itemToScrollPosition: null,
  onScrollEnd: () => {}
};

export default FlatList;
