/* eslint-disable */
import React, { PureComponent } from 'react';
import _ from 'lodash';
import thumbnail from 'assets/images/500x500.png';

class TransactionList extends PureComponent {
  render() {
    const { data } = this.props;
    console.log(data.toJS())
    return (
      <table className="table table-hover mg-b-0">
        <thead className="pt-2 pb-2">
          <tr>
            <th width="20%">
              <div className="mt-3">
                Member
              </div>
            </th>
            <th width="20%">
              <div className="mt-3">
                Date
              </div>
            </th>
            <th width="20%">
              <div className="mt-3">
                Time
              </div>
            </th>
            
          </tr>
        </thead>
        <tbody>
          {
            data.map( (item, key) => {
              return(
                <tr key={`key-${key}${item.id}`} >
                  <td>
                    <div key={`branch-${key}`} className={`az-contact-item p-0`}>
                      <div className={`az-img-user ${item.getIn(['member','has_logged']) && 'online'}`}><img src={ item.getIn(['member','photo'])|| thumbnail } alt="" /></div>
                      <div className={`az-contact-body `}>
                      {item.getIn(['member','last_name'])} {item.getIn(['member','suffix'])} , {item.getIn(['member','first_name'])} {item.getIn(['member','middle_name'])} {item.getIn(['member','suffix'])}
                      </div>
                      
                    </div>
                  </td>
                  <th><small>{item.get('date')}</small></th>
                  <th><small>{item.get('time')}</small></th>

                </tr>
              )
            })
          }
        </tbody>
      </table>
    );
  }
}

export default TransactionList;
