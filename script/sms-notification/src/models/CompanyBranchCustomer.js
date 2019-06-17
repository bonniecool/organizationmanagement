'use strict'

import MySQL from '../database/mysql';
import _ from 'lodash';
import moment from 'moment';

class CompanyBranchCustomer{

    constructor() {
        this.db = MySQL;
        this.table = 'company_branch_customers';
    }

    getAllCustomer(payload) {
      return new Promise((resolve, reject) => {
        let model = this.db
                .select('*')
                // .where('mobile_number','09777080347')
                .whereNull('company_branch_customer_settings.setting_id')
                .andWhere('companies.id',payload.company_id)
                .andWhere('company_branch_customers.company_service_id',payload.company_service_id)
                .from(this.table)
                .innerJoin('company_branches', 'company_branch_customers.company_branch_id', 'company_branches.id')
                .innerJoin('companies', 'company_branches.company_id', 'companies.id')
                .leftJoin('company_branch_customer_settings', 'company_branch_customers.id', 'company_branch_customer_settings.company_branch_customer_id');
        resolve(model);
      });
    }

    getBranchCustomer(payload) {
      return new Promise((resolve, reject) => {
        let model = this.db
                .select('*')
                .whereNull('company_branch_customer_settings.setting_id')
                .andWhere('companies.id',payload.company_id)
                .andWhere('company_branches.id',payload.company_branch_id)
                .andWhere('company_branch_customers.company_service_id',payload.company_service_id)
                .from(this.table)
                .innerJoin('company_branches', 'company_branch_customers.company_branch_id', 'company_branches.id')
                .innerJoin('companies', 'company_branches.company_id', 'companies.id')
                .leftJoin('company_branch_customer_settings', 'company_branch_customers.id', 'company_branch_customer_settings.company_branch_customer_id');
                
        resolve(model);
      });
    }

}

export default new CompanyBranchCustomer;