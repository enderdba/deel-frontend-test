import React from "react";

class SuggestionList extends React.Component {

    getHighlightedText(text, highlight) {
        const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
        return <span> {parts.map((part, i) =>
            <span key={i} className={part.toLowerCase() === highlight.toLowerCase() ? "highlight" : ""}>
                {part}
            </span>)
        } </span>;
    }

    render() {
        const { props } = this;
        const { suggestions, show, input, onClick, index: activeSuggestion } = props;

        if (show && input) {
            if (suggestions.length) {
                return (
                    <ul className="suggestions-list">
                        {suggestions.map((suggestion, index) => {
                            let className;
                            if (index === activeSuggestion) {
                                className = "suggestion-active";
                            }
                            return (
                                <li className={className} key={suggestion} onClick={onClick}>
                                    {this.getHighlightedText(suggestion, input)}
                                </li>
                            );
                        })}
                    </ul>
                );
            } else {
                return (
                    <div className="suggestions-not-available">
                        <b>No suggestions available for the moment.</b>
                    </div>
                );
            }
        }
        return null
    }


}

export default SuggestionList