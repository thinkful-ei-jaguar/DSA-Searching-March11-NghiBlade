import React from "react";
import data from "./data";
import "./App.css";


let sortedData = data.slice().sort((a, b) => a - b)



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

  binarySearch = (start, end, counter = 1) => {
    let value = this.state.number;
    let array = sortedData;
    

    var start = start === undefined ? 0 : start;
    var end = end === undefined ? array.length : end;

    console.log('Start:', start, 'End:', end)

    if (start > end) {
      this.setState({message: `After ${counter} tries, ${value} was not found :(`})  
      return -1;
    }

    const index = Math.floor((start + end) / 2);
    const item = array[index];

    console.log(start, end);
    if (item == value) {
        this.setState({message: `It took ${counter} tries to find ${value}!`})
        return index;
    }
    else if (item < value) {
        counter++
        return this.binarySearch(index + 1, end, counter);
    }
    else if (item > value) {
        counter++
        return this.binarySearch(start, index - 1, counter);
    }
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
          <button
            type="button"
            onClick={e => this.binarySearch()}
          >Binary search</button>

          <p>{this.state.message}</p>
        </header>
      </div>
    );
  }
}

export default App;
