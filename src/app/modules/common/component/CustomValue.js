import React, { PureComponent } from "react";

export default class customValue extends PureComponent {

    render(){
        const { value } = this.props

        return(
            <div
                id={ this.props.id } 
                className="Select-value">
                <span className="Select-value-label">
                    <img
                        src={ value.logo }
                        alt={ value.label }
                        className="img-fluid rounded-circle mr-1"
                        style={{
                            width:25,
                            height:25,
                            marginBottom:3,
                        }}
                    />
                    { value.label }
                </span>
            </div>
        )
    }
}