
import React from "react"
import AutoCompleteInput from "./components/AutoCompleteInput"
import SourceSelector from "./components/SourceSelector"

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      source: "json"
    };
  }

  changeSource = (source) => {
    this.setState({ source })
  }

  render() {
    const { source } = this.state
    return (
      <div className="demobox">
        <h1>Deel Frontend Demo</h1>
        <p>Type something in the textbox to see the autocompletion function.</p>
        <SourceSelector source={source} changeSource={this.changeSource} />
        <AutoCompleteInput source={source} />
      </div>
    );
  }
}

export default Demo;
