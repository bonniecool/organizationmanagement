/* eslint-disable */
import React, { PureComponent } from 'react';
import _ from 'lodash';
<<<<<<< HEAD
=======
import thumbnail from 'assets/images/500x500.png';
>>>>>>> 09eb3b6a8b8895fc43f0167ad287a5ee56d72ecb

class TransactionList extends PureComponent {
  render() {
    const { data } = this.props;
<<<<<<< HEAD
=======
    console.log(data.toJS())
>>>>>>> 09eb3b6a8b8895fc43f0167ad287a5ee56d72ecb
    return (
      <table className="table table-hover mg-b-0">
        <thead className="pt-2 pb-2">
          <tr>
            <th width="20%">
              <div className="mt-3">
<<<<<<< HEAD
                Reference No.
=======
                Member
>>>>>>> 09eb3b6a8b8895fc43f0167ad287a5ee56d72ecb
              </div>
            </th>
            <th width="20%">
              <div className="mt-3">
<<<<<<< HEAD
                Organization
=======
                Date
>>>>>>> 09eb3b6a8b8895fc43f0167ad287a5ee56d72ecb
              </div>
            </th>
            <th width="20%">
              <div className="mt-3">
<<<<<<< HEAD
                Amount
              </div>
            </th>
            <th width="40px">
              <div className="mt-3">
                Status
              </div>
            </th>
            <th width="20%">
              <div className="mt-3">
                Transaction Date
              </div>
            </th>
=======
                Time
              </div>
            </th>
            
>>>>>>> 09eb3b6a8b8895fc43f0167ad287a5ee56d72ecb
          </tr>
        </thead>
        <tbody>
          {
            data.map( (item, key) => {
              return(
                <tr key={`key-${key}${item.id}`} >
<<<<<<< HEAD
                  <td><small>{_.get(item,'refno')}</small></td>
                  <th><small>{_.get(item,'amount')}</small></th>
                  <td><small>{_.get(item,'status')}</small></td>
                  <td><small>{_.get(item,'remarks')}</small></td>
                  <td><small>{_.get(item,'created_date_readable')}</small></td>
=======
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

>>>>>>> 09eb3b6a8b8895fc43f0167ad287a5ee56d72ecb
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
