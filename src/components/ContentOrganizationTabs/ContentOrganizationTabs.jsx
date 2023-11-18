import "./ContentOrganizationTabs.css";
import React from "react";
import NewsFilter from "../NewsFilter/NewsFilter";

export default function ContentOrganizationTabs() {
    return (
        <div className="contentOrganizationTabs">
            <NewsFilter/>
        </div>
    );
}
