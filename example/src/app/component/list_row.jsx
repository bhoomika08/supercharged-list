import React from "react";

class ListRow extends React.Component {
  render() {
    const { item } = this.props;
    return (
      <tr className="container">
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.favorites.color}</td>
      </tr>
    );
  }
};

export default ListRow;
