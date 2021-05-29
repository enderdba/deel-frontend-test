import React from "react";
import SuggestionList from "./SuggestionList"
import { realFetch, magicFetch } from "../utils/magicFetch"

class Autocomplete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            suggestionIndex: 0,
            showList: false,
            suggestions: [],
            input: "",
            timeOut: {},
            apiLoaded: false
        };
    }

    async componentDidUpdate(prevProps) {
        const { source } = this.props;
        const { input } = this.state;

        if (source !== prevProps.source) {
            this.setState({ apiLoaded: false, showList: false, suggestions: [] })
            if (source === "json") {
                const filtered = await magicFetch(input, source)
                this.setState({
                    suggestionIndex: 0,
                    showList: true,
                    suggestions: filtered,
                });
            } else {
                const filtered = await realFetch(input, source)
                this.setState({
                    suggestionIndex: 0,
                    showList: true,
                    suggestions: filtered,
                    apiLoaded: true
                });
            }
            return false;
        }
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

    onChange = async e => {
        const { timeOut, apiLoaded } = this.state
        const { source } = this.props
        const input = e.currentTarget.value;
        const context = this;

        this.setState({
            input,
            showList: false
        });

        if (input && source === "json") {
            //this is a way for limiting API calls based on time between inputs
            //there should be a better way depending on how the autocompletion works, best way is to bring a fixed amount (like on API call example)
            //of options from API, so we don't have to do an API call each time an input is called.
            //if there's a lot of data coming from API we would have to virtualize or use this hack for it.
            clearTimeout(timeOut)
            this.setState({
                timeOut: setTimeout(async function () {
                    const filtered = await magicFetch(input, source)
                    context.setState({
                        suggestionIndex: 0,
                        showList: true,
                        suggestions: filtered,
                    });
                }, 300)
            }
            )
        } else if (input && source === "api") {
            if (!apiLoaded) {
                const filtered = await realFetch(input, source)
                context.setState({
                    suggestionIndex: 0,
                    showList: true,
                    suggestions: filtered,
                    apiLoaded: true
                });
            }
            else {
                context.setState({
                    suggestionIndex: 0,
                    showList: true,
                });
            }
        }
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