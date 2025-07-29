 import React from "react";

function Container({ children }) {
    return (
        <div className="container my-1">
            {children}
        </div>
    );
}

export default Container;
