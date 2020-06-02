import React from "react";
import {get} from "lodash"; 

class ListRow extends React.Component {
  componentWillMount() {
    this.load = performance.now();
    //console.log('List-row before :>> ',performance.now());
  }
  componentDidMount() {
    console.log('render time :>> ',performance.now()-this.load);
  }

  render() {
    const { item } = this.props;
    return (
      <div className="container">
        <span>{item.id}</span>
        <span>{item.name}</span>
        <span>{get(item, "favorites.color")}</span>
      </div>
    );
  }
  
};

export default ListRow;
