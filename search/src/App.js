import React from "react";
import data from "./data";
import "./App.css";

class App extends React.Component {
  state = {
    number: 0,
    message: ""
  };

  linearSearch = input => {
    let tries = 0;

    for (const num of data) {
      tries++;
      if (input == num) {
        return this.setState({
          message: `It took ${tries} tries to find ${input}!`
        });
      }
    }
    this.setState({ message: `After ${tries} tries, ${input} was not found.` });
    return;
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <input
            name="number"
            value={this.state.number}
            onChange={e => this.setState({ number: e.target.value })}
          ></input>
          <button
            type="button"
            onClick={e => this.linearSearch(this.state.number)}
          >
            Linear search
          </button>
          <button>Binary search</button>

          <p>{this.state.message}</p>
        </header>
      </div>
    );
  }
}

export default App;
