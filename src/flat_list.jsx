import React from "react";
import isEqual from "lodash.isequal";
const loadMoreTimeout = 0;
const heightFromBottom = 300;
const scrollEndTimeout = 3000;

const itemChecker = (prevProps, nextProps) => isEqual(prevProps, nextProps);

const getKey = (item, itemKey) => typeof item == "object" ? item[itemKey] : item;

class ItemRenderer extends React.Component {
  shouldComponentUpdate(nextProps) {
    return !itemChecker(this.props.item, nextProps.item);
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
    this.getFirstBatchOfItems = this.getFirstBatchOfItems.bind(this);
    this.getLastElementHeight = this.getLastElementHeight.bind(this);
    this.loadMoreItems = this.loadMoreItems.bind(this);
    this.scrollToItem = this.scrollToItem.bind(this);
  }

  componentDidMount() {
    const { data, autoLoad, loadOnScroll, scrollParent } = this.props;
    const { items } = this.state;

    if (autoLoad) {
      if (data.length > 0) {
        this.getFirstBatchOfItems();
      }
    } else if (loadOnScroll) {
      if (data.length > 0 && items.length == 0) {
        this.getFirstBatchOfItems();
      }
      const parent = scrollParent ? document.querySelector(scrollParent) : window;
      const parentHeight = scrollParent ? parent.clientHeight : window.innerHeight;
      parent.addEventListener("scroll", () => {
        if (this.getLastElementHeight() - heightFromBottom <= parentHeight) {
          this.loadMoreItems();
        }
      });
    }
  }

  componentDidUpdate({ data: oldData }) {
    const { data, autoLoad, loadOnScroll, positionToScroll } = this.props;
    const { items } = this.state;
    if (autoLoad || loadOnScroll) {
      if (oldData.length == data.length) {
        if (itemChecker({ data: oldData }, { data })) {
          //---------- To Load Items Automatically -----------//
          if (autoLoad) {
            this.loadMoreItems();
          }
          //---------- To Load first batch of Items if items length is 0 before scrolling ---------//
          else if (loadOnScroll && data.length > 0 && items.length == 0) {
            this.getFirstBatchOfItems();
          }
        } else {
          this.setState({
            items: data.slice(0, items.length)
          });
        }
      } else {
        this.setState({
          items: []
        });
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

  getFirstBatchOfItems() {
    const { data, batchCount } = this.props;
    this.setState({
      items: data.slice(0, batchCount)
    });
  }

  getLastElementHeight() {
    const { itemKey } = this.props;
    const { items } = this.state;
    const element = this.refs[`separator-ref-${getKey(items[items.length - 1], itemKey)}`];
    if (element && typeof element.getBoundingClientRect == "function") {
      return element.getBoundingClientRect().bottom;
    }
  }

  loadMoreItems() {
    const { data, batchCount, onScrollToEnd } = this.props;
    const { items } = this.state;
    clearTimeout(this.timeoutId);
    const hasMore = data.length - items.length > 0;
    const equalData = data.length - items.length == 0;
    if (hasMore) {
      this.timeoutId = setTimeout(() => {
        this.setState(prevState => ({
          items: [...items, ...data.slice(prevState.items.length, prevState.items.length + batchCount)]
        }));
      }, loadMoreTimeout);
    } else if (equalData) {
      onScrollToEnd();
    }
  }

  scrollToItem(item) {
    const { onScrollToElementEnd, itemKey } = this.props;
    const referenceElement = this.refs[`separator-ref-${getKey(item, itemKey)}`];
    clearTimeout(this.scrollEnd);
    referenceElement.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
    this.scrollEnd = setTimeout(onScrollToElementEnd, scrollEndTimeout);
  }

  render() {
    const { data, renderItem, autoLoad, loadOnScroll, isTabular, itemKey } = this.props;
    const { items } = this.state;
    return (autoLoad || loadOnScroll ? items : data).map(item => (
      <React.Fragment key={`List-${getKey(item, itemKey)}`}>
        <ItemRenderer item={item} renderItem={renderItem} />
        {isTabular ? (
          <tr ref={`separator-ref-${getKey(item, itemKey)}`} />
        ) : (
          <span ref={`separator-ref-${getKey(item, itemKey)}`} />
        )}
      </React.Fragment>
    ));
  }
}

FlatList.defaultProps = {
  batchCount: 50,
  itemKey: "id",
  autoLoad: false,
  loadOnScroll: false,
  isTabular: false,
  positionToScroll: null,
  onScrollToElementEnd: () => {},
  onScrollToEnd: () => {}
};

export default FlatList;
