import React from "react";
import SuggestionList from "./SuggestionList"
class Autocomplete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            suggestionIndex: 0,
            showList: false,
            suggestions: [],
            input: ""
        };
    }

    onClick = e => {
        const input = e.currentTarget.innerText
        this.setState({
            suggestionIndex: 0,
            showList: false,
            suggestions: [],
            input,
        });
    };

    onChange = e => {
        debugger;
        const { suggestions } = this.props;
        const input = e.currentTarget.value;
        const filtered = suggestions.filter(
            suggestion =>
                suggestion.toLowerCase().indexOf(input.toLowerCase()) > -1
        )

        this.setState({
            suggestionIndex: 0,
            showList: true,
            suggestions: filtered,
            input,
        });
    }

    onKeyDown = e => {
        const { suggestionIndex, suggestions } = this.state;
        const { keyCode } = e
        //check on "Enter" or "Tab" key to select the first suggestion
        if (keyCode === 13 || keyCode === 9) {
            this.setState({
                suggestionIndex: 0,
                showList: false,
                input: suggestions[suggestionIndex]
            });
        }
        // check on "Down Arrow" key to choose a different selection
        else if (keyCode === 40) {
            if (suggestionIndex + 1 === suggestions.length) {
                return;
            }
            this.setState({ suggestionIndex: suggestionIndex + 1 });

            //check on "Up arrow" key to choose a different selection
        } else if (keyCode === 38) {
            if (suggestionIndex === 0) {
                return;
            }
            this.setState({ suggestionIndex: suggestionIndex - 1 });
        }

    };

    render() {
        const { onClick, onChange, onKeyDown, state } = this;
        const {
            suggestionIndex,
            showList,
            suggestions,
            input
        } = state

        return (
            <div className="auto-complete">
                <input
                    type="text"
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    value={input}
                />
                <SuggestionList
                    onClick={onClick}
                    suggestions={suggestions}
                    index={suggestionIndex}
                    input={input}
                    show={showList}
                />
            </div>
        );
    }


}

export default Autocomplete