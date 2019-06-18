import React, { PureComponent } from "react";

export default class customOptions extends PureComponent {

    handleMouseDown = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.props.onSelect(this.props.option, e);
    }

    handleMouseEnter = (e) => {
        this.props.onFocus(this.props.option, e);
    }

    handleMouseMove = (e) => {
        if (this.props.isFocused) return;
        this.props.onFocus(this.props.option, e);
    }

    render(){

        const { option } = this.props;

        return(
            <div 
                className={`${this.props.className} d-flex align-items-center`}
                onMouseDown={ this.handleMouseDown }
                onMouseEnter={ this.handleMouseEnter }
                onMouseMove={ this.handleMouseMove }>
                <img
                    src={ option.logo }
                    alt={ option.label }
                    className="img-fluid rounded-circle mr-3"
                    style={{
                        width:50,
                        height:50,
                    }}
                />
                { option.label }
            </div>
        )
    }
}