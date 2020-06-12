import React from "react";

class ListRow extends React.Component {
  render() {
    const { item } = this.props;
    return (
      <div className="container">
        <span>{item.id}</span>
        <span>{item.name}</span>
        <span>{item.favorites.color}</span>
      </div>
    );
  }
};

export default ListRow;
