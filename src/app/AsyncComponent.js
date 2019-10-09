import React, { Component } from "react";

export default function asyncComponent(importComponent) {
    class AsyncComponent extends Component {
        constructor(props) {
            super(props);
            this.state = {
                component: null
            };
        }

        async componentDidMount() {
            const { default: component } = await importComponent();
            this.setState({
                component: component
            });
        }

        render() {
            const C = this.state.component;
            return C ? <C {...this.props} /> : <div className="loader-wrapper">
                <div id="loader" className="loaded">
                    <div className='bar'></div>
                    <div className='bar'></div>
                    <div className='bar'></div>
                    <div className='bar'></div>
                    <div className='bar'></div>
                </div>
            </div>;
            /*return C ? <C {...this.props} /> :
                <ul className="loading-box">
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>

                </ul>;*/
        }
    }
    return AsyncComponent;
}