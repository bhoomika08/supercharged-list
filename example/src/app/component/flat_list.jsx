import React from "react";
import isEqual from "lodash.isequal";

const timeoutMilliSec = 0;

const itemChecker = (prevProps, nextProps) => {
  return isEqual(prevProps, nextProps);
};

class ItemRenderer extends React.Component {
  shouldComponentUpdate() {
    return !itemChecker();
  }
  render() {
    const { item, renderItem } = this.props;
    return renderItem(item);
  }
}

class FlatList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
    this.getLastElementHeight = this.getLastElementHeight.bind(this);
    this.getKey = this.getKey.bind(this);
    this.loadMoreItems = this.loadMoreItems.bind(this);
    this.scrollToItem = this.scrollToItem.bind(this);
  }

  componentDidMount() {
    const { data, batchCount, autoLoad, loadOnScroll, scrollParent } = this.props;
    const { items } = this.state;

    if (autoLoad) {
      if (data.length > 0) {
        this.setState({
          items: data.slice(0, batchCount)
        });
      }
    } else if (loadOnScroll) {
      if (data.length > 0 && items.length == 0) {
        this.setState({
          items: data.slice(0, batchCount)
        });
      }
      const parent = scrollParent ? document.querySelector(scrollParent) : window;
      const parentHeight = scrollParent ? parent.clientHeight : window.innerHeight;
      parent.addEventListener("scroll", () => {
        if (this.getLastElementHeight() - 300 <= parentHeight) {
          this.loadMoreItems();
        }
      });
    }
  }

  componentDidUpdate({ data: oldData }) {
    const { data, batchCount, autoLoad, loadOnScroll, positionToScroll } = this.props;
    const { items } = this.state;

    //---------- To Load Items Automatically -----------//
    if (autoLoad) {
      if (oldData.length == data.length && itemChecker({ data: oldData }, { data })) {
        this.loadMoreItems();
      } else {
        this.setState({ items: [] });
      }
    }

    //---------- To Load first batch of Items if items length is 0 before scrolling ---------//
    else if (loadOnScroll) {
      if (oldData.length == data.length && itemChecker({ data: oldData }, { data })) {
        if (items.length == 0)
          this.setState({
            items: data.slice(0, batchCount)
          });
      } else {
        this.setState({ items: [] });
      }
    }

    //------ To Scroll to a particular Item -----------//
    if (positionToScroll != null && positionToScroll >= 0) {
      if (positionToScroll > items.length) {
        this.loadMoreItems();
      } else {
        this.scrollToItem(data[positionToScroll], positionToScroll);
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleOnScroll);
  }

  getLastElementHeight() {
    const { items } = this.state;
    return this.refs[`separator-ref-${this.getKey(items[items.length - 1])}`].getBoundingClientRect().bottom;
  }

  getKey(item) {
    const { itemKey } = this.props;
    return typeof item == "object" ? item[itemKey] : item;
  }

  loadMoreItems() {
    const { data, batchCount } = this.props;
    const { items } = this.state;
    clearTimeout(this.timeoutId);
    const hasMore = data.length - items.length > 0;
    if (hasMore) {
      this.timeoutId = setTimeout(() => {
        this.setState(prevState => ({
          items: [...items, ...data.slice(prevState.items.length, prevState.items.length + batchCount)]
        }));
      }, timeoutMilliSec);
    }
  }

  scrollToItem(item) {
    const { onScrollToElementEnd } = this.props;
    const referenceElement = this.refs[`separator-ref-${this.getKey(item)}`];
    clearTimeout(this.scrollEnd);
    referenceElement.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
    this.scrollEnd = setTimeout(onScrollToElementEnd, 3000);
  }

  render() {
    const { data, renderItem, autoLoad, loadOnScroll, SeparatorType } = this.props;
    const { items } = this.state;
    return (autoLoad || loadOnScroll ? items : data).map((item, idx) => (
      <React.Fragment key={`List-${this.getKey(item)}`}>
        <ItemRenderer item={item} renderItem={renderItem} />
        {loadOnScroll && <SeparatorType ref={`separator-ref-${this.getKey(item)}`} />}
      </React.Fragment>
    ));
  }
}

FlatList.defaultProps = {
  batchCount: 50,
  itemKey: "id",
  autoLoad: false,
  loadOnScroll: false,
  SeparatorType: "span",
  positionToScroll: null,
  onScrollToElementEnd: () => {}
};

export default FlatList;
