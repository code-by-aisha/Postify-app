 import React from "react";

function Container({ children }) {
    return (
        <div className="container my-4">
            {children}
        </div>
    );
}

export default Container;
