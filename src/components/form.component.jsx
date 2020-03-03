import React from "react";

const Form = props => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-3">
                    <input
                        type="text"
                        className="form-control"
                        name="city"
                        autoComplete="off"
                    />
                </div>
                <div className="col-md-3"></div>
                <div className="col-md-3"></div>
            </div>
        </div>
    );
};
