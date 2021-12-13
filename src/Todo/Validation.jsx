import React from "react";

export default function Validation(props) {
    let element = null;
    let style = {
        color: 'red'
    }

    if (props.length <= 10 && props.length > 0 ) {
        element = <p style={style}>Text too short</p>;
    } else if (props.length > 20) {
        element = <p style={style}>Text too long</p>;
    }
    return (
        <div>
            {element}
        </div>
    )
}
