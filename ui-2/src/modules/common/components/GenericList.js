import React from 'react';
import PropTypes from 'prop-types';
import MiniLoading from 'modules/common/components/MiniLoading';
import EmptyStateFile from 'modules/common/components/EmptyStateFile';
import _ from 'lodash';

const getCell = (item, key) => {
  try {
    return (typeof key === 'function')
      ? key(item)
      : _.get(item, key);
  } catch (err) {
    return '-';
  }
};

export default class GenericList extends React.Component {
  static propTypes = {
    data: PropTypes.instanceOf(Array),
    labelKey: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
    ]),
    onSelectRow: PropTypes.oneOfType([
      PropTypes.instanceOf(Object),
      PropTypes.func,
      PropTypes.bool,
    ]),
    selected: PropTypes.string,
    label: PropTypes.string,
    height: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    selectedKey: PropTypes.string,
    noRowsLabel: PropTypes.string,
    isLoading: PropTypes.bool,
    rowsCount: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.number,
    ]),
  }

  static defaultProps = {
    data: [],
    labelKey: 'name',
    onSelectRow: false,
    selected: '',
    height: '100%',
    selectedKey: 'id',
    label: 'List',
    noRowsLabel: 'There are no items found.',
    isLoading: false,
    rowsCount: false,
  }

  handleSelectRow = data => (e) => {
    e.preventDefault();
    const { onSelectRow } = this.props;
    if (onSelectRow) {
      onSelectRow(data);
    }
  }

  render() {
    const {
      data, labelKey, label, selected, height, selectedKey,
      noRowsLabel, isLoading, rowsCount,
    } = this.props;

    if (isLoading) {
      return (
        <MiniLoading />
      );
    }

    return (
      <>
        <div className="sub-header">
          <p className="total-group-title">{ label } { +rowsCount > 0 && ` (${rowsCount})`}</p>
        </div>
        <div
          className="user-listing"
          style={{
            overflowY: 'scroll',
            height,
            display: 'block',
            flexGrow: '1',
          }}
        >
          {data.length < 1
            ? (
              <EmptyStateFile message={noRowsLabel} />
            )
            : data.map((item) => {
              const isSelected = `${selected}` === `${_.get(item, selectedKey)}`;
              const key = item[selectedKey];
              return (
                <div
                  key={key}
                  className={`user-item ${isSelected ? 'selected' : ''}`}
                  onClick={this.handleSelectRow(item)}
                  style={{ cursor: 'pointer' }}
                  role="presentation"
                >
                  {getCell(item, labelKey)}
                </div>
              );
            })}
        </div>
      </>
    );
  }
}
