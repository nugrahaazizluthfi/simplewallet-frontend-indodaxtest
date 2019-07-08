import React from "react";
import searchImg from "../images/gear.svg";

export default function Loading(props) {
    if (props.open) {
        return (
            <div className="loading">
                <div>
                    <img src={searchImg} alt={searchImg} />
                    <p>Please wait, load data...</p>
                </div>
            </div>
        );
    }

    return "";
}
