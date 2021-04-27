import React from 'react';

import classes from './Text.module.css';

/*
    This component takes a string of text and splits it up into
    numberOfLines. If no numberOfLines was specified, 
    this component will return the unformatted text that was passed in.

    Props:
        - text: the original text to format and display
        - numberOfLines: number of lines to split the text into
        - ellipsis: whether or not to add ... to the end of the last line
*/

const text = (props) => {
    const text = props.text;

    if (!text) {
        console.log("string length is 0");
        return (null);
    }

    const lines = [];
    let start = 0;
    let end = 49;
    
    if (props.numberOfLines && props.numberOfLines > 0) {
        let line;
        
        for (let i = 0; i < props.numberOfLines; i++) {
            if (start >= text.length) {
                break;
            }
            line = text.substring(start, end);
            lines.push(line);
            start = end + 1;
            end = end + 50;
        }
    }
    else {
        lines.push(text);
    }

    if (props.ellipsis) {
        const lastLine = lines[lines.length - 1];
        if (lastLine.length < 50) {
            // add ... to the last line
            lines[lines.length - 1] = lastLine + "...";
        }
    }

    const display = lines.map((line, index) => (
        <p key={index}>{line}</p>
    ));
    
    return (
        <div className={classes.Text}>
            {display}
        </div>
    );
};

export default text;