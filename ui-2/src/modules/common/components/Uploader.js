import React, { Component } from 'react';
import uploadcare from 'uploadcare-widget';
import PropTypes from 'prop-types';

class Uploader extends Component {
  static propTypes = {
    validateUpload: PropTypes.func,
    onLoading: PropTypes.func,
    label: PropTypes.string,
    crop: PropTypes.string,
    tabs: PropTypes.instanceOf(Array),
    onUploaded: PropTypes.func,
    className: PropTypes.string,
  };

  static defaultProps = {
    onLoading: () => {},
    label: 'Upload',
    crop: '300x300',
    tabs: ['file', 'camera', 'url'],
    validateUpload: () => {},
    onUploaded: () => {},
    className: 'btn btn-primary',
  };

  state = {
    isUploading: false,
    progress: 0,
  };

  imagesOnly = (fileInfo) => {
    const { isImage, mimeType } = fileInfo;
    const { validateUpload } = this.props;
    if (isImage === false) {
      validateUpload();
      this.setState({
        isUploading: false,
        progress: 0,
      });
      throw new Error('image');
    }

    if (['image/gif'].indexOf(mimeType) > -1) {
      validateUpload();
      this.setState({
        isUploading: false,
        progress: 0,
      });
      throw new Error('image');
    }
  };

  handleUpload = (e) => {
    e.preventDefault();
    const { tabs, onLoading, crop } = this.props;
    const { isUploading } = this.state;

    if (isUploading) {
      return;
    }

    uploadcare
      .openDialog(null, {
        publicKey: process.env.REACT_APP_UPLOADCARE_KEY,
        tabs,
        crop,
        imagesOnly: true,
        validators: [this.imagesOnly],
      })
      .done((file) => {
        onLoading(true);
        file.progress(this.handleProgress).done(this.handleDone);
      });
  };

  handleDone = ({ cdnUrl }) => {
    const { onUploaded } = this.props;
    onUploaded(cdnUrl);
  };

  handleProgress = ({ state, progress }) => {
    const { onLoading } = this.props;
    if (state === 'uploading') {
      this.setState({
        isUploading: true,
        progress: Math.ceil(progress * 100),
      });
    }
    if (state === 'uploaded') {
      this.setState({
        isUploading: true,
        progress: 100,
      });
    }

    if (state === 'ready') {
      onLoading(false);
      this.setState({
        isUploading: false,
        progress: 0,
      });
    }
  };

  render() {
    const { className, label } = this.props;
    const { isUploading, progress, btnCaption } = this.state;
    const Progress = () => {
      if (isUploading) {
        return (
          <div>
            <span>({progress}%)...</span>
          </div>
        );
      }
      return <span />;
    };

    return (
      <button type="button" id="uploaded_photo" onClick={this.handleUpload} className={className}>
        <i className="fas fa-camera d-inline-block mr-2" />
        {isUploading ? (
          <Progress />
        ) : (
          <div className="d-inline-block ml-1">{btnCaption || label}</div>
        )}
      </button>
    );
  }
}

export default Uploader;
