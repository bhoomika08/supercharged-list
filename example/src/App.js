import React from 'react';
import ReduxCounterComponent from "./app/component/redux_counter";
import "./App.scss";

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <ReduxCounterComponent />
      </div>
    );
  }
}

export default App;