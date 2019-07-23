import React from 'react';
import InputMask from 'react-input-mask';
import _get from 'lodash/get';
import _isNil from 'lodash/isNil';
import _isEmpty from 'lodash/isEmpty';
import Uploader from '../components/Uploader';

const parseNumber = (val) => {
  try {
    return parseFloat(val);
  } catch (err) {
    return NaN;
  }
};

const count = (s1, letter) => s1.split(letter).length - 1;

export default WrappedComponent => (
  class WithForm extends React.Component {
    state = {
      _key: '1',
    };

    form = {
      createInput: this.createInput,
    }

    handleChangeValue = key => (value) => {
      this.setState({ [key]: value });
    }

    handleChangeInput = key => ({ target }) => {
      this.setState({ [key]: target.value });
    }

    handleChangeInputNumber = key => ({ target }) => {
      const svalue = target.value;
      const value = parseNumber(svalue);
      if ((Number.isNaN(value) && !_isEmpty(value)) || (count(`${svalue}`, '.') > 1)) return;
      this.setState({ [key]: svalue.replace(/[^0-9\.]/g, "") }); // eslint-disable-line
    }

    renderLabel = ({ label, note }, props) => (
      <label className="d-flex align-items-center">
        <span>{ label } { props.required && <span className="text-danger">*</span> }</span>
        { note && <small className="ml-auto mr-0 text-muted"><i>{ note }</i></small> }
      </label>
    )

    setFormData = (state) => {
      this.setState({
        _key: '2', // new Date().getTime(),
        ...state,
      });
    }

    createInput = (data, props = {}) => (
      <React.Fragment>
        {this.renderLabel(data, props)}
        <input className="form-control" onChange={this.handleChangeInput(data.key)} value={_get(this, `state.${data.key}`) || ''} {...props} />
      </React.Fragment>
    )

    createTextArea = (data, props = {}) => (
      <React.Fragment>
        {this.renderLabel(data, props)}
        <textarea className="form-control" rows="3" onChange={this.handleChangeInput(data.key)} value={_get(this, `state.${data.key}`) || ''} {...props} style={{ resize: 'none' }} />
      </React.Fragment>
    )

    createInputNumber = (data, props = {}) => (
      <React.Fragment>
        {this.renderLabel(data, props)}
        <input className="form-control" type="number" onChange={this.handleChangeInputNumber(data.key)} value={_get(this, `state.${data.key}`) || ''} {...props} />
      </React.Fragment>
    )

    createInputMask = (data, mask, maskChar, props = {}) => (
      <React.Fragment>
        {this.renderLabel(data, props)}
        <InputMask
          mask={mask}
          maskChar={maskChar}
          alwaysShowMask={!_isNil(maskChar)}
          className="form-control"
          onChange={this.handleChangeInput(data.key)}
          value={_get(this, `state.${data.key}`) || ''}
          {...props}
        />
      </React.Fragment>
    )

    createSelect = (data, options, props = {}) => (
      <React.Fragment>
        {this.renderLabel(data, props)}
        <select className="form-control" onChange={this.handleChangeInput(data.key)} value={_get(this, `state.${data.key}`) || ''} {...props}>
          <option value="" disabled>{props.placeholder || '- SELECT -'}</option>
          { options
            .map(item => (
              <option key={item.value} value={item.value} disabled={item.disabled}>
                { item.label }
              </option>
            ))
          }
        </select>
      </React.Fragment>
    );

    createReadOnly = (data, props = {}) => (
      <React.Fragment>
        {this.renderLabel(data, props)}
        <input readOnly className="form-control-plaintext" value={_get(this, `state.${data.key}`) || 'n/a'} tabIndex="-1" />
      </React.Fragment>
    );

    createUploader = (data, props = {}) => (
      <React.Fragment>
        {/* {this.renderLabel(data, props)} */}
        <Uploader
          label={data.label}
          className="btn btn-block btn-primary"
          icon={<i className="far fa-image" />}
          onChange={this.handleChangeValue(data.key)}
          {...props}
        />
      </React.Fragment>
    )

    render() {
      const { _key } = this.state;
      return (
        <WrappedComponent
          key={_key}
          {...this.props}
          formData={this.state}
          setFormData={this.setFormData}
          createInput={this.createInput}
          createTextArea={this.createTextArea}
          createInputNumber={this.createInputNumber}
          createSelect={this.createSelect}
          createReadOnly={this.createReadOnly}
          createInputMask={this.createInputMask}
          createUploader={this.createUploader}
        />
      );
    }
  }
);
