
import React from "react"
import AutoCompleteInput from "./components/AutoCompleteInput"

class Demo extends React.Component {
  render() {
    return (<div>
      <h1>Deel Frontend Demo</h1>
      <AutoCompleteInput suggestions={["Sandwich", "Fried Egg", "Cheetos", "Beer"]} />
    </div>
    );
  }
}

export default Demo;
