
import React from "react"
import AutoCompleteInput from "./components/AutoCompleteInput"

class Demo extends React.Component {
  render() {
    return (
      <div className="demobox">
        <h1>Deel Frontend Demo</h1>
        <p>Type something in the textbox to see the autocompletion function.</p>
        <AutoCompleteInput suggestions={["Sandwich", "Fried Egg", "Cheetos", "Beer"]} />
      </div>
    );
  }
}

export default Demo;
