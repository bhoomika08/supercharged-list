import React from "react";
import { connect } from "react-redux";
import actions from "../actions";
import { GenerateUserData } from "../helpers/generator";
import ListRow from "./list_row";
import FlatList from "./flat_list";

const usersData = [
  {
    id: "1",
    name: "abc",
    favorites: {
      color: "red"
    }
  },
  {
    id: "2",
    name: "pqr",
    favorites: {
      color: "red"
    }
  },
  {
    id: "3",
    name: "xyz",
    favorites: {
      color: "red"
    }
  },
  {
    id: "4",
    name: "klm",
    favorites: {
      color: "red"
    }
  },
  {
    id: "5",
    name: "qwe",
    favorites: {
      color: "red"
    }
  },
  {
    id: "6",
    name: "abc",
    favorites: {
      color: "red"
    }
  },
  {
    id: "7",
    name: "pqr",
    favorites: {
      color: "red"
    }
  },
  {
    id: "8",
    name: "xyz",
    favorites: {
      color: "red"
    }
  },
  {
    id: "9",
    name: "klm",
    favorites: {
      color: "red"
    }
  },
  {
    id: "10",
    name: "qwe",
    favorites: {
      color: "red"
    }
  },
  {
    id: "11",
    name: "abc",
    favorites: {
      color: "red"
    }
  },
  {
    id: "12",
    name: "pqr",
    favorites: {
      color: "red"
    }
  },
  {
    id: "13",
    name: "xyz",
    favorites: {
      color: "red"
    }
  },
  {
    id: "14",
    name: "klm",
    favorites: {
      color: "red"
    }
  },
  {
    id: "15",
    name: "qwe",
    favorites: {
      color: "red"
    }
  },
  {
    id: "16",
    name: "abc",
    favorites: {
      color: "red"
    }
  },
  {
    id: "17",
    name: "pqr",
    favorites: {
      color: "red"
    }
  },
  {
    id: "18",
    name: "xyz",
    favorites: {
      color: "red"
    }
  },
  {
    id: "19",
    name: "klm",
    favorites: {
      color: "red"
    }
  },
  {
    id: "20",
    name: "qwe",
    favorites: {
      color: "red"
    }
  }
];

class ReduxCounter extends React.Component {
  componentWillMount() {
    let data2 = [];
    for (let i = 0; i < 50; i++) {
      let newKeys = {};
      const refData = usersData.map(ele => {
        for (let j = 0; j < 100; j++) {
          newKeys[`newKey-${j}`] = `newKey-${j}`;
        }
        return {
          ...ele,
          id: `${ele.id}-${i}`,
          ...newKeys,
          arrKey: [
            { id: 1, type: "spree" },
            { id: 2, type: "spree" },
            { id: 3, type: "spree" },
            { id: 4, type: "spree" }
          ],
          objKey: { a: 1, b: 2, c: 3, d: 4, e: 5 }
        };
      });
      data2 = [...data2, ...refData];
    }
    console.log("data2 :>> ", data2);
    this.props.updateUsers(GenerateUserData(data2));
    console.log("Before redux-counter", performance.now());
  }

  addUser = () => {
    this.props.updateUsers({ ["4-0"]: { ...this.props.users["4-0"], name: "asdf", favorites: { color: "blue" } } });
  };

  render() {
    const users = GenerateUserData(this.props.users || []);
    return (
      <div>
        <div className="counter-component">
          <label>Counter: {this.props.counter}</label>
          <button type="submit" className="btn btn-default" onClick={this.props.increaseActionCreator}>
            {" "}
            +{" "}
          </button>
          <button type="submit" className="btn btn-default" onClick={this.props.decreaseActionCreator}>
            {" "}
            -{" "}
          </button>
        </div>
        <button onClick={this.addUser}>Add user</button>
        {/* {Object.values(users).map(user => {
          return <ListRow key={user.id} item={user} />;
        })} */}
        <FlatList data={Object.values(users)} customClass="" renderItem={(item) => <ListRow item={item} />} />
      </div>
    );
  }
}

function mapStateToProps({ counter, users }) {
  return { counter, users };
}

const mapDispatchToProps = {
  increaseActionCreator: actions.increaseActionCreator,
  decreaseActionCreator: actions.decreaseActionCreator,
  updateUsers: actions.updateUsers
};

export default connect(mapStateToProps, mapDispatchToProps)(ReduxCounter);