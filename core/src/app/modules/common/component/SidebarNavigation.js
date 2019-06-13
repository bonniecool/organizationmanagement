import React, { Component } from "react";
import nbiLogo from "assets/img/nbi-main-logo.png";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import _ from "lodash";

import {
  IconDashboard,
  IconAnnouncement,
  IconRequestApproval,
  IconEmployee,
  IconRecruitment,
  IconApplicantHistory,
  IconJobVacancy,
  IconDTR,
  IconPlantilla,
  IconTraining,
  IconOrganization,
  IconAuditTrail,
  IconMedical,
  IconReports,
  IconLeave,
  IconUserManagement,
  IconSalarySchedules,
  IconDataSets,
  IconPosition,
  IconQuestionnaire,
  IconLibrary,
  IconForms,
  IconRecruitmentSettings,
  IconPayrollPayroll,
  IconPayrollDeductions,
  IconPayrollRemittance,
  IconIPCR,
  IconSALN,
  IconLeaveMonetization,
  IconDisciplinaryAction,
  IconPayrollLogs,
  IconPinCode,
  IconTranche
} from "./Icons";

class SidebarNavigation extends Component {
  state = {
    isOpenDropdown: false
  };

  componentDidMount() {
    document.body.addEventListener("click", this.handleClickBody);
  }

  handleClickBody = e => {
    if (!_.has(e.target.attributes["data-toggle"])) {
      this.setState({
        isOpenDropdown: false
      });
    }
  };

  handleToggle = e => {
    const { isShinked, dispatch } = this.props;
    dispatch({
      type: "GET_NAV_SIZE",
      data: !isShinked
    });
  };

  render() {
    const { isShinked, location } = this.props;
    const path = location.pathname.split("/")[1];

    const getClassName = name => {
      if (path === name) return "active";
      return "";
    };
    return (
      <nav className={`sidebar-navigation ${!isShinked && "shrinked"}`}>
        <div className="sidebar-header">
          <div
            style={{ display: isShinked ? "block" : "none" }}
            className="mr-auto"
          >
            <img className="brand-logo" src={nbiLogo} alt="NBI HRIS" />
            <strong className="brand-text" onClick={this.handleToggle}>
              NBI HRIS
            </strong>
          </div>
          <a
            onClick={this.handleToggle}
            id="toggle-btn"
            className={`brand-menu brand-menu-icon ${!isShinked && "active"}`}
          >
            <span />
            <span />
            <span />
          </a>
        </div>
        <div className="sidebar-menu-list">
          <ul className="sidebar-list list-unstyled">
            <li
              className={`sidebar-menu ${getClassName("")}`}
              data-tooltip="Dashboard"
            >
              <Link to="/" className="link collapsed">
                <IconDashboard /> <span className="menu-text">Dashboard</span>
              </Link>
            </li>
          </ul>
          <span className="sidebar-title">Employee Menu</span>
          <ul className="sidebar-list list-unstyled">
            <li className={`sidebar-menu ${getClassName("employee")}`}>
              <Link to="/employee" className="link collapsed">
                <IconEmployee />
                <span className="menu-text">201 Files</span>
              </Link>
            </li>
            <li className={`sidebar-menu ${getClassName("request")}`}>
              <Link to="/request/leave" className="link collapsed">
                <IconRequestApproval />{" "}
                <span className="menu-text">Request Approval</span>
              </Link>
            </li>
            <li className={`sidebar-menu ${getClassName("ipcr")}`}>
              <Link to="/ipcr" className="link collapsed">
                <IconIPCR /> <span className="menu-text">IPCR</span>
              </Link>
            </li>
            <li className={`sidebar-menu ${getClassName("saln")}`}>
              <Link to="/saln" className="link collapsed">
                <IconSALN /> <span className="menu-text">SALN</span>
              </Link>
            </li>
          </ul>
          <span className="sidebar-title">HR Menu</span>
          <ul className="sidebar-list list-unstyled">
            <li className={`sidebar-menu ${getClassName("plantilla")}`}>
              <Link to="/plantilla" className="link collapsed">
                <IconPlantilla /> <span className="menu-text">Plantilla</span>
              </Link>
            </li>
            <li className={`sidebar-menu ${getClassName("leave")}`}>
              <Link to="/leave/transaction" className="link collapsed">
                <IconLeave /> <span className="menu-text">Leave</span>
              </Link>
            </li>
            <li
              className={`sidebar-menu ${getClassName("leave-monetization")}`}
            >
              <Link to="/leave-monetization" className="link collapsed">
                <IconLeaveMonetization />{" "}
                <span className="menu-text">Leave Monetization</span>
              </Link>
            </li>
            <li className={`sidebar-menu ${getClassName("dtr")}`}>
              <Link to="/dtr" className="link collapsed">
                <IconDTR /> <span className="menu-text">Daily Time Record</span>
              </Link>
            </li>
            <li
              className={`sidebar-menu ${getClassName("disciplinary-action")}`}
            >
              <Link to="/disciplinary-action" className="link collapsed">
                <IconDisciplinaryAction />{" "}
                <span className="menu-text">Disciplinary Action</span>
              </Link>
            </li>
          </ul>

          <span className="sidebar-title">Payroll Menu</span>
          <ul className="sidebar-list list-unstyled">
            <li className={`sidebar-menu ${getClassName("payroll")}`}>
              <Link to="/payroll/salary" className="link collapsed">
                <IconPayrollPayroll />{" "}
                <span className="menu-text">Payroll</span>
              </Link>
            </li>
            <li className={`sidebar-menu ${getClassName("deductions")}`}>
              <Link to="/deductions" className="link collapsed">
                <IconPayrollDeductions />{" "}
                <span className="menu-text">Deductions</span>
              </Link>
            </li>
            <li className={`sidebar-menu ${getClassName("remittance")}`}>
              <Link to="/remittance" className="link collapsed">
                <IconPayrollRemittance />{" "}
                <span className="menu-text">Remittance</span>
              </Link>
            </li>
            <li className={`sidebar-menu ${getClassName("payroll-logs")}`}>
              <Link to="/payroll-logs" className="link collapsed">
                <IconPayrollLogs />{" "}
                <span className="menu-text">Payroll Logs</span>
              </Link>
            </li>
          </ul>

          <span className="sidebar-title">Recruitment</span>
          <ul className="sidebar-list list-unstyled">
            <li className={`sidebar-menu ${getClassName("recruitment")}`}>
              <Link to="/recruitment/applicant-201" className="link collapsed">
                <IconRecruitment />{" "}
                <span className="menu-text">Recruitment</span>
              </Link>
            </li>
            <li className={`sidebar-menu ${getClassName("vacancy")}`}>
              <Link to="/vacancy" className="link collapsed">
                <IconJobVacancy />{" "}
                <span className="menu-text">Job Vacancies</span>
              </Link>
            </li>
            <li className={`sidebar-menu ${getClassName("history")}`}>
              <Link to="/history" className="link collapsed">
                <IconApplicantHistory />{" "}
                <span className="menu-text">Applicant History</span>
              </Link>
            </li>
          </ul>

          <span className="sidebar-title">Other Menu</span>
          <ul className="sidebar-list list-unstyled">
            <li className={`sidebar-menu ${getClassName("training")}`}>
              <Link to="/training" className="link collapsed">
                <IconTraining /> <span className="menu-text">Training</span>
              </Link>
            </li>

            <li className={`sidebar-menu ${getClassName("announcement")}`}>
              <Link to="/announcement" className="link collapsed">
                <IconAnnouncement />{" "}
                <span className="menu-text">Announcement</span>
              </Link>
            </li>
            <li className={`sidebar-menu ${getClassName("organization")}`}>
              <Link to="/organization" className="link collapsed">
                <IconOrganization />{" "}
                <span className="menu-text">Organization</span>
              </Link>
            </li>
            <li className={`sidebar-menu ${getClassName("audittrail")}`}>
              <Link to="/audittrail" className="link collapsed">
                <IconAuditTrail />{" "}
                <span className="menu-text">Audit Trail</span>
              </Link>
            </li>
            <li className={`sidebar-menu ${getClassName("medical")}`}>
              <Link
                to="/medical/group-hospitalization"
                className="link collapsed"
              >
                <IconMedical /> <span className="menu-text">Medical</span>
              </Link>
            </li>
            <li className={`sidebar-menu ${getClassName("forms")}`}>
              <Link to="/forms/special-order" className="link collapsed">
                <IconForms /> <span className="menu-text">Forms</span>
              </Link>
            </li>
            <li className={`sidebar-menu ${getClassName("report")}`}>
              <Link
                to="/reports/employee/master-list"
                className="link collapsed"
              >
                <IconReports /> <span className="menu-text">Reports</span>
              </Link>
            </li>
          </ul>

          <span className="sidebar-title">Settings</span>
          <ul className="sidebar-list list-unstyled">
            <li className={`sidebar-menu ${getClassName("user-management")}`}>
              <Link to="/user-management" className="link collapsed">
                <IconUserManagement />{" "}
                <span className="menu-text">User Management</span>
              </Link>
            </li>
            <li className={`sidebar-menu ${getClassName("approver-pincode")}`}>
              <Link to="/approver-pincode" className="link collapsed">
                <IconPinCode />{" "}
                <span className="menu-text">Approver Pin Code</span>
              </Link>
            </li>
            <li className={`sidebar-menu ${getClassName("action-override")}`}>
              <Link to="/action-override" className="link collapsed">
                <IconPinCode />{" "}
                <span className="menu-text">Action Overrides</span>
              </Link>
            </li>
            <li className={`sidebar-menu ${getClassName("salaryschedule")}`}>
              <Link to="/salaryschedule" className="link collapsed">
                <IconSalarySchedules />{" "}
                <span className="menu-text">Salary Schedules</span>
              </Link>
            </li>
            <li className={`sidebar-menu ${getClassName("tranche")}`}>
              <Link to="/tranche" className="link collapsed">
                <IconTranche /> <span className="menu-text">Tranche</span>
              </Link>
            </li>
            <li className={`sidebar-menu ${getClassName("dataset")}`}>
              <Link to="/dataset" className="link collapsed">
                <IconDataSets /> <span className="menu-text">Data Sets</span>
              </Link>
            </li>
            <li className={`sidebar-menu ${getClassName("position")}`}>
              <Link to="/position" className="link collapsed">
                <IconPosition /> <span className="menu-text">Position</span>
              </Link>
            </li>
            <li className={`sidebar-menu ${getClassName("settings")}`}>
              <Link to="/settings/matrix" className="link collapsed">
                <IconRecruitmentSettings />{" "}
                <span className="menu-text">Recruitment</span>
              </Link>
            </li>
            <li className={`sidebar-menu ${getClassName("questionnaire")}`}>
              <Link to="/questionnaires" className="link collapsed">
                <IconQuestionnaire />{" "}
                <span className="menu-text">Questionnaire</span>
              </Link>
            </li>
            <li className={`sidebar-menu ${getClassName("training-category")}`}>
              <Link to="/training-category" className="link collapsed">
                <IconQuestionnaire />{" "}
                <span className="menu-text">Training Categories</span>
              </Link>
            </li>
            <li className={`sidebar-menu ${getClassName("library")}`}>
              <Link
                to="/library/employee/work-schedule"
                className="link collapsed"
              >
                <IconLibrary /> <span className="menu-text">Library</span>
              </Link>
            </li>
          </ul>
        </div>
        <div
          className="sidebar-poweredby"
          style={{ display: !isShinked ? "block" : "none" }}
        />
        <div
          className="sidebar-poweredby"
          style={{ display: isShinked ? "block" : "none" }}
        />
      </nav>
    );
  }
}

const mapStateToProps = (state, routeParams) => {
  const { isShinked } = state.nav.toJS();
  const { auth } = state;

  return {
    isShinked,
    profile: auth.get("profile"),
    user_type: auth.get("user_type")
  };
};

export default withRouter(connect(mapStateToProps)(SidebarNavigation));
