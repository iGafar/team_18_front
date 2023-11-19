import "./Scenarios.css";
import editWhite from "../../assets/images/edit-white.svg";
import React from "react";

export default function Scenarios() {

    return (
        <div className="scenarios-container">
            <div className="create-scenario-button">
                <div className="create-button-label-container">
                    <span className="create-button-label">создать сценарий</span>
                </div>
            </div>


            <div className="scenario">
                <span className="scenario-title">Усы Печкина</span>

                <div className="edit-scenario">
                    <img src={editWhite}></img>
                </div>
            </div>
        </div>
    );
}
