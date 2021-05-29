import React from "react";

class SuggestionList extends React.Component {

    render() {
        const { props } = this;
        const { suggestions, show, input, onClick, index: activeSuggestion } = props;

        if (show && input) {
            debugger;
            if (suggestions.length) {
                return (
                    <ul class="suggestions-list">
                        {suggestions.map((suggestion, index) => {
                            let className;
                            if (index === activeSuggestion) {
                                className = "suggestion-active";
                            }
                            return (
                                <li className={className} key={suggestion} onClick={onClick}>
                                    {suggestion}
                                </li>
                            );
                        })}
                    </ul>
                );
            } else {
                return (
                    <div class="suggestions-not-available">
                        <b>No suggestions available for the moment.</b>
                    </div>
                );
            }
        }
        return null
    }


}

export default SuggestionList