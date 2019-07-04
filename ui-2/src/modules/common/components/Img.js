/* eslint-disable */
import React from 'react';
import _ from 'lodash';
import defaultPhoto from 'assets/images/default-user.jpg';
import './style.css';
import { createPortal } from 'react-dom';

const imgRoot = document.getElementById('img-root');

class ModalWrapper extends React.Component {
  render() {
    return createPortal(
      this.props.children,
      imgRoot,
    );
  }
}

export default class Img extends React.Component {

  static defaultProps = {
    defaultSrc: defaultPhoto,
    loadingLabel: '',
    style: {}
  }

  state = {
    src: this.props.defaultSrc,
    loaded: false,
    preview: false
  }

  componentWillMount() {
    this.setState({
      src: this.props.src
    })
  }

  componentWillReceiveProps(props) {
    if (!_.isEqual(this.props.src, props.src)) {
      this.setState({
        src: props.src,
        loaded: false
      })
    }
  }

  handleOnLoaded = () => {
    this.setState({
      loaded: true
    })
  }

  handleOnError = () => {
    this.setState({
      src: this.props.defaultSrc
    })
  }

  handleTogglePreview = (e) => {
    e.preventDefault();
    this.setState({
      preview: !this.state.preview
    })
  }

  render() {
    const { ...rest } = this.props;

    const newStyle = {
      cursor: 'pointer',
      ...this.props.style
    }
    console.log(this.props.defaultSrc, ' here')
    return (
      <div className="align-self-center">
        <div style={{ position: 'relative' }}>
          {!this.state.loaded && //true &&
            <div style={{ position: 'absolute', left: 'calc(50% - 10px)', top: 'calc(50% - 18px)' }}>
              <div className="loader-wrapper loader-small">
                <div className="box"></div>
                <div className="box"></div>
                <div className="box"></div>
                <div className="box"></div>
              </div>
              <p>{this.props.loadingLabel}</p>
            </div>
          }
          <img
            onLoad={this.handleOnLoaded} {..._.omit(rest, ['defaultSrc', 'loadingLabel'])}
            src={this.state.src || this.props.defaultSrc}
            alt=""
            onError={this.handleOnError}
            style={newStyle}
            onClick={this.handleTogglePreview} />
          {this.state.preview &&
            <ModalWrapper>
              <div className="image-preview" onClick={this.handleTogglePreview}>
                <div className="image-preview-image" style={{ background: `url(${this.state.src})` }} />
                <a href="/" onClick={this.handleTogglePreview} className="image-preview-close">&#10006;</a>
              </div>
            </ModalWrapper>
          }
        </div>
      </div>
    )
  }
}