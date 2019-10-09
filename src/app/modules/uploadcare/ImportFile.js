import React from "react";
import Alert from "react-s-alert";

const upload = (url, formdata, onProgress) => {
  const token = sessionStorage.getItem("token");
  return new Promise((resolve, reject) => {
    try {
      var xhr = new XMLHttpRequest();
      xhr.open(
        "POST",
        `${process.env.REACT_APP_END_POINT}agn/payroll/deduction/import?token=${token}`
      );
      xhr.onload = () => {
        try {
          const { status } = xhr;
          const response = JSON.parse(xhr.response);
          if (status !== 200) {
            resolve(false);
          }
          resolve(response);
        } catch (err) {
          resolve(false);
        }
      };
      if (xhr.upload) {
        xhr.upload.onprogress = onProgress;
      }
      xhr.send(formdata);
    } catch (err) {
      resolve(false);
    }
  });
};

export default class LocalUploader extends React.Component {
  static defaultProps = {
    onLoading: () => {},
    className: "btn btn-primary",
    label: "Upload",
    fileName: "file",
    onUploaded: () => {},
    fileType:
      "application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    instruction: null
  };

  state = {
    progress: 0,
    isUploading: false,
    showInstruction: false
  };

  onProgress = e => {
    const { loaded, total } = e;
    const percentage = loaded / total;

    const getPercentage = p => {
      try {
        return p * 100;
      } catch (err) {
        return 0;
      }
    };

    this.setState({
      progress: getPercentage(percentage)
    });
  };

  handleOnUpload = async e => {
    this.setState({ showInstruction: false });
    this.props.onLoading(true);

    const file_blob = e.target.files[0] || "";
    const name = e.target.name;

    const args = {
      name,
      file_blob
    };

    let formdata = new FormData();
    formdata.append("file_import", args.file_blob);

    const token = localStorage.getItem("token");
    this.setState({ isUploading: true, progress: 0 });

    const response = await upload(
      `file?token=${token}`,
      formdata,
      this.onProgress
    );
    if (!response) {
      this.setState({ isUploading: false, progress: 100 });
      return Alert.warning(
        "Unable to upload! check your internet connection and limit your file size to 1MB"
      );
    }

    const { data=[], message } = response;

    if (!data) {
      this.setState({ isUploading: false, progress: 100 });
      return Alert.danger(message || "Url not found!...Please try again...");
    }

    const { onUploaded } = this.props;

    this.setState({ isUploading: false, progress: 100 });
    this.props.onLoading(false);
    onUploaded(message);
  };

  handleShowInstruction = showInstruction => e => {
    e.preventDefault();

    this.setState({ showInstruction });
  };

  render() {
    const { label, fileName, className, fileType } = this.props;
    const { progress, isUploading } = this.state;

    const Instruction = () => {
      return (
        <div
          style={{
            position: "absolute",
            display: this.state.showInstruction ? "block" : "none"
          }}
        >
          <div
            className="modal fade show"
            style={{ display: "block", zIndex: 1051, pointerEvents: "none" }}
          >
            <div
              className="modal-dialog modal-lg"
              style={{ pointerEvents: "initial" }}
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Upload Instructions</h4>
                  <div className="pull-right">
                    <label key="label" className="btn btn-primary mr-2 mt-2">
                      <input
                        name={fileName}
                        type="file"
                        onChange={this.handleOnUpload}
                        value=""
                        style={{ visibility: "hidden", position: "absolute" }}
                        accept={fileType}
                      />
                      <span>Proceed</span>
                    </label>
                    <button
                      className="btn btn-outline-danger"
                      onClick={this.handleShowInstruction(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
                <div className="modal-body">{this.props.instruction}</div>
                <div className="modal-footer">
                  <label key="label" className="btn btn-primary mr-2 mt-2">
                    <input
                      name={fileName}
                      type="file"
                      // onChange={ this.handleOnUpload }
                      onChange={this.handleOnUpload}
                      value=""
                      style={{ visibility: "hidden", position: "absolute" }}
                      accept={fileType}
                    />
                    <span>Proceed</span>
                  </label>
                  <button
                    className="btn btn-outline-danger"
                    onClick={this.handleShowInstruction(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal-backdrop fade show"
            style={{ zIndex: 1050, pointerEvents: "initial" }}
          />
        </div>
      );
    };

    if (isUploading)
      return (
        <button className={className} disabled>
          Uploading( {progress.toFixed(2)}% )
        </button>
      );

    return [
      <label
        key="label"
        className={className}
        onClick={
          this.props.instruction ? this.handleShowInstruction(true) : () => {}
        }
      >
        <input
          name={fileName}
          type="file"
          // onChange={ this.handleOnUpload }
          onChange={
            this.props.instruction
              ? this.handleShowInstruction(true)
              : this.handleOnUpload
          }
          value=""
          style={{ visibility: "hidden", position: "absolute" }}
          accept={fileType}
        />
        {typeof label === "function" ? (
          label()
        ) : (
          <span>
          </span>
        )}
      </label>,
      this.state.showInstruction ? (
        <Instruction key="upload-instruction" />
      ) : null
    ];
  }
}
