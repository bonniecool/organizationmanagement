import React from 'react';
import InputMask from 'react-input-mask';
import moment from 'moment';
import _ from 'lodash';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';

const formatDate = (date, def = '', format = 'YYYY-MM-DD') => {
  try {
    if (_.isEmpty(date)) {
      return '';
    }

    const endDate = moment(new Date(date)).format(format);
    return endDate === 'Invalid date' ? def : endDate;
  } catch (err) {
    return def;
  }
};

class CustomRender extends React.Component {
  static propTypes = {
    disabled: PropTypes.bool,
    onClick: PropTypes.instanceOf(Function),
  };

  static defaultProps = {
    disabled: false,
    onClick: () => { },
  };

  render() {
    const {
      disabled,
      onClick,
    } = this.props;
    return (
      <button
        className="rs-element rs-button rs-button--medium rs-button--icon rs-button--value text-white"
        type="button"
        disabled={disabled}
        onClick={onClick}
      >
        <i className="rs-button__icon fa fa-calendar" />
      </button>
    );
  }
}

export default class DateInputPicker extends React.Component {
  static propTypes = {
    value: PropTypes.string,
    withTime: PropTypes.bool,
    disabled: PropTypes.bool,
    placeholder: PropTypes.string,
    onChange: PropTypes.instanceOf(Function),
    isRequired: PropTypes.bool,
    maxDate: PropTypes.instanceOf(Object),
    minDate: PropTypes.instanceOf(Object),
  };

  static defaultProps = {
    value: '',
    withTime: false,
    disabled: false,
    placeholder: '',
    onChange: () => { },
    isRequired: false,
    maxDate: moment('3000-01-01', 'YYYY-MM-DD'),
    minDate: moment('1900-01-01', 'YYYY-MM-DD'),
  };

  state = {
    selected: '',
    actual: '',
  };

  componentWillMount() {
    const { value } = this.props;
    this.setState({
      actual: value,
    }, () => {
      this.updateSelected(value);
    });
  }

  componentWillReceiveProps(props) {
    const { value } = this.props;
    if (!_.isEqual(props.value, value)) {
      this.setState({
        actual: props.value,
      }, () => {
        this.updateSelected(props.value);
      });
    }
  }

  updateSelected = (value) => {
    this.setState({
      selected: value,
    });
  };

  handleChangeInput = key => (e) => {
    const { value } = e.target;
    this.setState({
      [key]: value,
    });
  };

  handleUpdateActual = (e) => {
    const { withTime, onChange } = this.props;
    const { actual } = this.state;
    const { value } = e.target;

    const newVal = formatDate(
      value,
      actual,
      withTime ? 'YYYY-MM-DD HH:mm' : 'YYYY-MM-DD',
    );

    this.setState({
      selected: newVal,
    }, () => {
      onChange({ target: { value: newVal } });
    });
  };

  handleChangePicker = (e) => {
    const { withTime, onChange } = this.props;
    const newVal = formatDate(
      e,
      '',
      withTime ? 'YYYY-MM-DD HH:mm' : 'YYYY-MM-DD',
    );
    onChange({ target: { value: newVal } });
  };

  render() {
    const {
      withTime,
      disabled,
      placeholder,
      isRequired,
      maxDate,
      minDate,
    } = this.props;
    const { actual, selected } = this.state;

    const renderPlaceHolder = (data) => {
      let placeHolder = '';
      if (data.length > 0) {
        placeHolder = data;
        return placeHolder;
      }

      placeHolder = withTime ? 'YYYY-MM-DD HH:mm' : 'YYYY-MM-DD';
      return placeHolder;
    };

    return (
      <div className="input-group">
        <InputMask
          onChange={this.handleChangeInput('selected')}
          onBlur={this.handleUpdateActual}
          maskChar=" "
          disabled={disabled}
          required={isRequired}
          placeholder={renderPlaceHolder(placeholder)}
          mask={withTime ? '9999-99-99 99:99' : '9999-99-99'}
          className="form-control rs-element"
          value={selected}
        />
        <span className="ml-2 input-group-btn">
          <DatePicker
            customInput={<CustomRender />}
            showYearDropdown
            disabled={disabled}
            showTimeSelect={withTime}
            timeFormat="HH:mm"
            timeIntervals={15}
            maxDate={maxDate}
            minDate={minDate}
            openToDate={moment()}
            selected={moment(
              formatDate(
                moment(new Date(actual)),
                moment('1900-01-01'),
                withTime ? 'YYYY-MM-DD HH:mm' : 'YYYY-MM-DD',
              ),
            )}
            onChange={this.handleChangePicker}
          />
        </span>
      </div>
    );
  }
}
