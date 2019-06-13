import React from "react";
import InputMask from "react-input-mask";
import moment from "moment";
import _ from "lodash";
import DatePicker from "react-datepicker";
import "./style.css";

const formatDate = (date, def = "", format = "YYYY-MM-DD") => {
  try {
    if (_.isEmpty(date)) return "";
    const endDate = moment(new Date(date)).format(format);
    return endDate === "Invalid date" ? def : endDate;
  } catch (err) {
    return def;
  }
};

class CustomRender extends React.Component {
  render() {
    return (
      <button
        className="btn btn-primary px-2"
        type="button"
        disabled={this.props.disabled}
        onClick={this.props.onClick}
      >
        <i className="material-icons">date_range</i>
      </button>
    );
  }
}

export default class DateInputPicker extends React.Component {
  static defaultProps = {
    value: "",
    withTime: false,
    disabled: false,
    onChange: () => {}
  };

  state = {
    selected: "",
    actual: "",
    mdy: ""
  };

  componentWillMount() {
    const { withTime, value } = this.props;
    const mdy = !isNaN(new Date(value).getTime())
      ? moment(new Date(value)).format(
          withTime ? "MM/DD/YYYY HH:mm" : "MM/DD/YYYY"
        )
      : "";
    this.setState(
      {
        actual: this.props.value,
        mdy
      },
      this.updateSelected
    );
  }

  componentWillReceiveProps(props) {
    if (!_.isEqual(props.value, this.props.value)) {
      const { withTime, value } = props;
      const mdy = !isNaN(new Date(value).getTime())
        ? moment(new Date(value)).format(
            withTime ? "MM/DD/YYYY HH:mm" : "MM/DD/YYYY"
          )
        : "";
      this.setState(
        {
          actual: props.value,
          mdy
        },
        this.updateSelected
      );
    }
  }

  updateSelected = () => {
    this.setState({
      selected: this.state.actual
    });
  };

  handleChangeInput = key => e => {
    this.setState({
      [key]: e.target.value,
      mdy: e.target.value
    });
  };

  handleUpdateActual = e => {
    const { withTime } = this.props;
    const newVal = formatDate(
      e.target.value,
      this.state.actual,
      withTime ? "YYYY-MM-DD HH:mm" : "YYYY-MM-DD"
    );
    const newVal2 = formatDate(
      e.target.value,
      !isNaN(new Date(this.state.actual).getTime())
        ? moment(new Date(this.state.actual)).format(
            withTime ? "MM/DD/YYYY HH:mm" : "MM/DD/YYYY"
          )
        : "",
      withTime ? "MM/DD/YYYY HH:mm" : "MM/DD/YYYY"
    );
    this.props.onChange({ target: { value: newVal } });
    this.setState({
      selected: newVal,
      mdy: newVal2
    });
  };

  handleChangePicker = e => {
    const { withTime } = this.props;
    const newVal = formatDate(
      e,
      "",
      withTime ? "YYYY-MM-DD HH:mm" : "YYYY-MM-DD"
    );
    this.props.onChange({ target: { value: newVal } });
  };

  render() {
    const { withTime, disabled, maxDate, minDate, placeholder } = this.props;
    const finalPlaceholder =
      placeholder || (withTime ? "MM/DD/YYYY HH:mm" : "MM/DD/YYYY");

    return (
      <div className="input-group input-group-prepend">
        <DatePicker
          customInput={<CustomRender />}
          openToDate={moment(
            formatDate(
              moment(new Date(this.state.actual)),
              moment(),
              withTime ? "YYYY-MM-DD HH:mm" : "YYYY-MM-DD"
            )
          )}
          showYearDropdown
          disabled={disabled}
          showTimeSelect={withTime}
          maxDate={maxDate}
          minDate={minDate}
          value={this.props.value}
          timeFormat="HH:mm"
          timeIntervals={15}
          selected={moment(
            formatDate(
              moment(new Date(this.state.actual)),
              moment("1970-01-01"),
              withTime ? "YYYY-MM-DD HH:mm" : "YYYY-MM-DD"
            )
          )}
          onChange={this.handleChangePicker}
        />
        <InputMask
          onChange={this.handleChangeInput("selected")}
          onBlur={this.handleUpdateActual}
          maskChar=" "
          disabled={disabled}
          placeholder={finalPlaceholder}
          mask={withTime ? "99/99/9999 99:99" : "99/99/9999"}
          className="form-control normal -small"
          value={this.state.mdy}
        />
      </div>
    );
  }
}