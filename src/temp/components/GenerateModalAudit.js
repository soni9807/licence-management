import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  CButton,
  CContainer,
  CRow,
  CCol,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CTabContent,
  CTabPane,
  CAlert,
} from "@coreui/react";
import "./GenerateModal.css";
import { plan_config } from "./plan_config.js";
import { config_gb_per_day } from "./plan_config.js";
// import { plan_config } from './test_plan.js'
import { CSmartTable } from "@coreui/react-pro";

const GenerateModalAudit = ({
  isOpen,
  onClose,
  title = "Generate License",
  cluster,
  tenantid,
  plan,
  features,
  rowData,
  body = "",
  onConfirmGenerateLicense,
}) => {
  var config = require("../../util/config.json");
  const [isSubmitted, setIsSubmitted] = useState(true);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertProps, setAlertProps] = useState({
    message: "none",
    stat: "success",
    color: "success",
  });

  // const [cluster, setCluster] = useState('')
  // const [tenantid, setTenantId] = useState('')
  // const [userCount, setUserCount] = useState('')
  // const [validity, setValidity] = useState('30-days')
  const [gracePeriod, setgracePeriod] = useState("");
  // const [companyList, setCompanyList] = useState([{ ' name ': '', ' id ': '' }])
  // const [startDate, setStartDate] = useState('')
  // const [endDate, setEndDate] = useState('')

  const [licensedUsers, setlicensedUsers] = useState("");
  const [licensedResources, setlicensedResources] = useState("");
  const [holder, setHolder] = useState("SECURONIX");
  const [expiryAction, setexpiryAction] = useState("");
  const [licenseType, setlicenseType] = useState("");
  const [consumerType, setconsumerType] = useState("");
  const [consumerAmount, setconsumerAmount] = useState("");
  const [warnPeriod, setwarnPeriod] = useState("");
  const [lifecycleStatus, setlifecycleStatus] = useState("");
  const [issuer, setIssuer] = useState("");
  const [eventsPerDay, seteventsPerDay] = useState("");
  const [diskSpace, setdiskSpace] = useState("");
  const [name, setName] = useState("");
  const [policyAllowedCount, setpolicyAllowedCount] = useState("");
  const [coldStorage, setcoldStorage] = useState("");
  const [coldStorageDays, setcoldStorageDays] = useState("");
  const [billingType, setbillingType] = useState("");
  const [gbPerDay, setgbPerDay] = useState("");
  const [eps, seteps] = useState("");
  const [epsPercent, setepsPercent] = useState("");
  const [jiraTicket, setJiraTicket] = useState("");

  console.log("Title: ", title);
  let data;
  const handleSelectValueChange = (updated_featureName, selectedValue) => {};

  const table = document.getElementById("dynamic-table");

  const [activeKey, setActiveKey] = useState(0);

  const [userRole, setUserRole] = useState(localStorage.getItem("role"));
  function getAccess(role) {
    switch (role) {
      case "su":
        return [0, "Super User"];
      case "au":
        return [1, "Admin User"];
      case "ea":
        return [1.5, "Early Adopter"];
      case "ru":
        return [2, "Regular User"];
      case "r":
        return [3, "Read Only"];
      case "ro":
        return [3, "Read Only"];
      default:
        return [3, "Read Only"];
    }
  }

  function getFeatureData() {
    if (rowData) {
      data = features;
    }
  }
  getFeatureData();

  function fetchFeatureInputs() {
    if (rowData) {
      // data = features
      setlicensedUsers(rowData["Licensed Users"]);
      setlicensedResources(rowData["Licensed Resources"]);
      setHolder(rowData["Holder"]);
      setexpiryAction(rowData["Expiry Action"]);
      setgracePeriod(rowData["Grace Period"]);
      setlicenseType(rowData["License Type"]);
      setconsumerType(rowData["Consumer Type"]);
      setconsumerAmount(rowData["Consumer Amount"]);
      setwarnPeriod(rowData["Warn Period"]);
      setlifecycleStatus(rowData["Lifecycle Status"]);
      setIssuer(rowData["Issuer"]);
      seteventsPerDay(rowData["Events Per Day"]);
      setdiskSpace(rowData["Allocated Disk Space (GB)"]);
      setName(rowData["Name"]);
      setpolicyAllowedCount(rowData["Policy Allowed Count"]);
      setcoldStorage(rowData["Cold Storage"]);
      setcoldStorageDays(rowData["Cold Storage Days"]);
      // setbillingType(rowData['Billing Type'])
      setbillingType(
        rowData["Billing Type"] === "" ? "gb_per_day" : rowData["Billing Type"]
      );
      setgbPerDay(rowData["GB Per Day"]);
      seteps(rowData["EPS"]);
      setepsPercent(rowData["EPS Percent"]);
      setJiraTicket(rowData["Jira Ticket"]);
    }
  }
  useEffect(() => {
    if (rowData) {
      fetchFeatureInputs();
    }
  }, [rowData]);

  useEffect(() => {}, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch(`http://192.168.12.212:5004/get_license`)
  //     const newData = await response.json()
  //     setCompanyList(newData)
  //     // console.log(newData)
  //   }
  //   fetchData()
  // }, [])

  function setAlertMessage(response, message) {
    if (!response) {
      setAlertProps({
        message,
        stat: "error",
        color: "danger",
      });
    } else if (response.status === 200) {
      console.log("ok");
      setAlertProps({
        message,
        stat: "success",
        color: "success",
      });
    } else {
      setAlertProps({
        message,
        stat: "error",
        color: "danger",
      });
    }
    setAlertVisible(true);
  }

  // async function onSubmit() {
  //   const timestamp = Date.now()
  //   let payload = {
  //     app_key: 'b0l2ndgk_8EhVZB57aTPfj83NP9YTVP8yBH4AkxSg',
  //     useremail: localStorage.getItem('email'),
  //     operation: title,
  //     cluster: cluster,
  //     tenant_id: tenantid,
  //     jira_ticket: jiraTicket,
  //   }
  //   console.log('PAYLOAD', payload)

  //   let response = await onConfirmGenerateLicense(payload)
  //   console.log('RESPONSEEEE')
  //   console.log(response.json())
  //   let message = ''
  //   if (response) {
  //     if (response.status === 200) {
  //       setIsSubmitted(true)
  //       message = 'License Details Approved.'
  //     } else {
  //       message = 'Operation failed.'
  //     }
  //   } else {
  //     message = 'Error while approving license details'
  //   }
  //   setAlertMessage(response, message)
  //   sessionStorage.clear()
  // }

  // const handleOnApprove = () => {
  //   const isConfirmed = window.confirm('Are you sure you want to Approve?')

  //   if (isConfirmed) {
  //     onSubmit()
  //   } else {
  //     alert('Approval cancelled.')
  //   }
  // }

  function onClose1() {
    onClose("");
    sessionStorage.clear();
  }

  return (
    <CModal scrollable visible={isOpen} size="xl" onClose={onClose1}>
      <CAlert
        color={alertProps["color"]}
        dismissible
        fade
        visible={alertVisible}
        onClose={() => setAlertVisible(false)}
      >
        {alertProps["message"]}
      </CAlert>
      <CModalHeader onClose={onClose}>
        <CModalTitle>
          <strong>
            {cluster}-{tenantid}
          </strong>
        </CModalTitle>
      </CModalHeader>
      <CTabContent>
        <CTabPane
          role="tabpanel"
          aria-labelledby="job-details"
          visible={activeKey === 0}
        >
          {"a" !== "" ? (
            <>
              <CModalBody style={{ maxHeight: "70vh", overflowY: "auto" }}>
                {/* <CModalTitle>Please fill the below details:</CModalTitle> */}
                <CContainer style={{ paddingTop: 0, marginTop: 0 }}>
                  <CRow>
                    <CCol>
                      <h4>
                        <strong style={{ color: "red" }}>
                          Plan: {plan}
                          <br></br>
                          <br></br>
                        </strong>
                      </h4>
                      <div>
                        <div>
                          <div className="container-fluid">
                            {/* <h2 className="alert alert-warning">Generate License</h2> */}
                            <div className="background-image">
                              <form
                                className="myForm"
                                method="get"
                                encType="application/x-www-form-urlencoded"
                                action="/html/codes/html_form_handler.cfm"
                              >
                                <p>
                                  <label>
                                    Jira Ticket:
                                    <input
                                      type="text"
                                      name="jira_ticket"
                                      value={jiraTicket}
                                      style={{
                                        color: "black",
                                        "background-color": "#F2F2F2",
                                      }}
                                      disabled={true}
                                      // onChange={(e) => setlicensedUsers(e.target.value)}
                                      required
                                    ></input>
                                  </label>
                                </p>

                                <p>
                                  <label>
                                    Grace Period:
                                    <select
                                      id="grace_period"
                                      value={gracePeriod}
                                      disabled={true}
                                      required
                                      className="custom-select"
                                      style={{
                                        color: "black",
                                        "background-color": "#F2F2F2",
                                      }}
                                      // onChange={(e) => setgracePeriod(e.target.value)}
                                    >
                                      <option value=""></option>
                                      <option value="10-days">10-days</option>
                                      <option value="20-days">20-days</option>
                                      <option value="30-days">30-days</option>
                                      <option value="60-days">60-days</option>
                                    </select>
                                  </label>
                                </p>

                                <p>
                                  <label>
                                    Licensed Users:
                                    <input
                                      type="text"
                                      name="user_count"
                                      value={licensedUsers}
                                      style={{
                                        color: "black",
                                        "background-color": "#F2F2F2",
                                      }}
                                      disabled={true}
                                      // onChange={(e) => setlicensedUsers(e.target.value)}
                                      required
                                    ></input>
                                  </label>
                                </p>

                                <p>
                                  <label>
                                    Licensed Resources:
                                    <input
                                      type="text"
                                      name="licensed_resources"
                                      value={licensedResources}
                                      disabled={true}
                                      style={{
                                        color: "black",
                                        "background-color": "#F2F2F2",
                                      }}
                                      // onChange={(e) => setlicensedResources(e.target.value)}
                                      required
                                    ></input>
                                  </label>
                                </p>

                                <p>
                                  <label>
                                    Holder:
                                    <input
                                      type="text"
                                      name="holder"
                                      value={holder}
                                      disabled={true}
                                      style={{
                                        color: "black",
                                        "background-color": "#F2F2F2",
                                      }}
                                      // onChange={(e) => setHolder(e.target.value)}
                                      required
                                    ></input>
                                  </label>
                                </p>

                                <p>
                                  <label>
                                    Expiry Action:
                                    <select
                                      id="expiry_action"
                                      value={expiryAction}
                                      disabled={true}
                                      style={{
                                        color: "black",
                                        "background-color": "#F2F2F2",
                                      }}
                                      // onChange={(e) => setexpiryAction(e.target.value)}
                                      required
                                      className="custom-select"
                                    >
                                      <option value="warn">WARN</option>
                                      {/* <option value="standard">Standard</option> */}
                                    </select>
                                  </label>
                                </p>

                                <p>
                                  <label>
                                    License Type:
                                    <select
                                      id="license_type"
                                      value={licenseType}
                                      disabled={true}
                                      style={{
                                        color: "black",
                                        "background-color": "#F2F2F2",
                                      }}
                                      // onChange={(e) => setlicenseType(e.target.value)}
                                      required
                                      className="custom-select"
                                    >
                                      {["mssp", "enterprise"].includes(
                                        licenseType
                                      ) && (
                                        <>
                                          <option value="mssp">MSSP</option>
                                          <option value="enterprise">
                                            Enterprise
                                          </option>
                                        </>
                                      )}
                                      {!["enterprise", "mssp"].includes(
                                        licenseType
                                      ) && (
                                        <>
                                          <option value={licenseType}>
                                            {licenseType}
                                          </option>
                                          <option value="mssp">MSSP</option>
                                          <option value="enterprise">
                                            Enterprise
                                          </option>
                                        </>
                                      )}
                                    </select>
                                  </label>
                                </p>

                                <p>
                                  <label>
                                    Consumer Type:
                                    <select
                                      id="consumer_type"
                                      value={consumerType}
                                      disabled={true}
                                      style={{
                                        color: "black",
                                        "background-color": "#F2F2F2",
                                      }}
                                      // onChange={(e) => setconsumerType(e.target.value)}
                                      required
                                      className="custom-select"
                                    >
                                      <option value="user">User</option>
                                      {/* <option value="standard">Standard</option> */}
                                    </select>
                                  </label>
                                </p>

                                <p>
                                  <label>
                                    Consumer Amount:
                                    <input
                                      type="text"
                                      name="consumer_amount"
                                      value={consumerAmount}
                                      disabled={true}
                                      style={{
                                        color: "black",
                                        "background-color": "#F2F2F2",
                                      }}
                                      // onChange={(e) => setconsumerAmount(e.target.value)}
                                      required
                                    ></input>
                                  </label>
                                </p>

                                <p>
                                  <label>
                                    Warn Period:
                                    <select
                                      id="warn_period"
                                      value={warnPeriod}
                                      disabled={true}
                                      required
                                      style={{
                                        color: "black",
                                        "background-color": "#F2F2F2",
                                      }}
                                      className="custom-select"
                                      // onChange={(e) => setwarnPeriod(e.target.value)}
                                    >
                                      <option value="60-days">60-days</option>
                                      <option value="30-days">30-days</option>
                                      <option value="90-days">90-days</option>
                                    </select>
                                  </label>
                                </p>

                                <p>
                                  <label>
                                    Lifecycle Status:
                                    <select
                                      id="lifecycle_status"
                                      value={lifecycleStatus}
                                      disabled={true}
                                      // onChange={(e) => setlifecycleStatus(e.target.value)}
                                      required
                                      style={{
                                        color: "black",
                                        "background-color": "#F2F2F2",
                                      }}
                                      className="custom-select"
                                    >
                                      <option value="noworries">
                                        No Worries
                                      </option>
                                      {/* <option value="standard">Standard</option> */}
                                    </select>
                                  </label>
                                </p>

                                <p>
                                  <label>
                                    Issuer:
                                    <input
                                      type="text"
                                      name="issuer"
                                      value={issuer}
                                      disabled={true}
                                      style={{
                                        color: "black",
                                        "background-color": "#F2F2F2",
                                      }}
                                      // onChange={(e) => setIssuer(e.target.value)}
                                      required
                                    ></input>
                                  </label>
                                </p>

                                <p>
                                  <label>
                                    Events Per Day:
                                    <input
                                      type="text"
                                      name="events_per_day"
                                      value={eventsPerDay}
                                      disabled={true}
                                      style={{
                                        color: "black",
                                        "background-color": "#F2F2F2",
                                      }}
                                      // onChange={(e) => seteventsPerDay(e.target.value)}
                                      required
                                    ></input>
                                  </label>
                                </p>

                                <p>
                                  <label>
                                    Allocated Disk Space In Gb:
                                    <input
                                      type="text"
                                      name="disk_space"
                                      value={diskSpace}
                                      disabled={true}
                                      style={{
                                        color: "black",
                                        "background-color": "#F2F2F2",
                                      }}
                                      // onChange={(e) => setdiskSpace(e.target.value)}
                                      required
                                    ></input>
                                  </label>
                                </p>

                                <p>
                                  <label>
                                    Name:
                                    <input
                                      type="text"
                                      name="name"
                                      value={name}
                                      disabled={true}
                                      style={{
                                        color: "black",
                                        "background-color": "#F2F2F2",
                                      }}
                                      // onChange={(e) => setName(e.target.value)}
                                      required
                                    ></input>
                                  </label>
                                </p>

                                <p>
                                  <label>
                                    Policy Allowed Count:
                                    <input
                                      type="text"
                                      name="policy_allowed_count"
                                      value={policyAllowedCount}
                                      disabled={true}
                                      style={{
                                        color: "black",
                                        "background-color": "#F2F2F2",
                                      }}
                                      // onChange={(e) => setpolicyAllowedCount(e.target.value)}
                                      required
                                    ></input>
                                  </label>
                                </p>

                                <p>
                                  <div className="form-group">
                                    <label>Cold Storage:</label>
                                    <div className="input-container">
                                      <input
                                        type="text"
                                        name="cold_storage"
                                        value={coldStorage}
                                        disabled={true}
                                        style={{
                                          color: "black",
                                          "background-color": "#F2F2F2",
                                        }}
                                        // onChange={(e) => setcoldStorage(e.target.value)}
                                        required
                                      ></input>
                                      <span className="unit">years</span>
                                      <input
                                        type="text"
                                        name="cold_storage_days"
                                        value={coldStorageDays}
                                        disabled={true}
                                        // onChange={(e) => setcoldStorageDays(e.target.value)}
                                        required
                                      ></input>
                                      <span className="unit">days</span>
                                    </div>
                                  </div>
                                </p>

                                <p>
                                  <label>
                                    Billing Type:
                                    <select
                                      id="billing_type"
                                      value={billingType}
                                      disabled={isSubmitted}
                                      style={{
                                        color: "black",
                                        "background-color": "#F2F2F2",
                                      }}
                                      onChange={(e) =>
                                        setbillingType(e.target.value)
                                      }
                                      // required
                                      className="custom-select"
                                    >
                                      <option value="gb_per_day">
                                        GB Per Day
                                      </option>
                                      <option value="95th_%_eps">
                                        95th % EPS
                                      </option>
                                      <option value="avg_eps">
                                        Average EPS
                                      </option>
                                    </select>
                                  </label>
                                </p>

                                <p>
                                  <label hidden={billingType !== "gb_per_day"}>
                                    GB Per Day:
                                    <select
                                      id="gb_per_day"
                                      value={gbPerDay}
                                      disabled={isSubmitted}
                                      style={{
                                        color: "black",
                                        "background-color": "#F2F2F2",
                                      }}
                                      onChange={(e) =>
                                        setgbPerDay(e.target.value)
                                      }
                                      className="custom-select"
                                    >
                                      {config_gb_per_day.map((item, index) => (
                                        <option key={index} value={item}>
                                          {item}
                                        </option>
                                      ))}
                                    </select>
                                  </label>
                                </p>

                                <p>
                                  <label hidden={billingType !== "avg_eps"}>
                                    Average EPS:
                                    <input
                                      type="text"
                                      name="eps"
                                      value={eps}
                                      // hidden={billingType === 'gb_per_day'}
                                      disabled={isSubmitted}
                                      style={{
                                        color: "black",
                                        "background-color": "#F2F2F2",
                                      }}
                                      onChange={(e) => seteps(e.target.value)}
                                      // required
                                    ></input>
                                  </label>
                                </p>

                                <p>
                                  <label hidden={billingType !== "95th_%_eps"}>
                                    95th % EPS:
                                    <input
                                      type="text"
                                      name="eps"
                                      value={epsPercent}
                                      // hidden={billingType === 'gb_per_day'}
                                      disabled={isSubmitted}
                                      style={{
                                        color: "black",
                                        "background-color": "#F2F2F2",
                                      }}
                                      onChange={(e) =>
                                        setepsPercent(e.target.value)
                                      }
                                      // required
                                    ></input>
                                  </label>
                                </p>
                              </form>
                            </div>
                            <div className="vertical-gap"></div>
                            <table
                              className="custom-table"
                              readOnly={isSubmitted}
                            >
                              <thead>
                                <tr>
                                  <th className="custom-th">Category</th>
                                  <th className="custom-th">Feature Name</th>
                                  <th className="custom-th">Value</th>
                                </tr>
                              </thead>
                              <tbody>
                                {data &&
                                  plan &&
                                  data[plan] &&
                                  Object.keys(data[plan]).map(
                                    (subcategory, subcategoryIndex) => (
                                      <React.Fragment
                                        key={`${subcategoryIndex}`}
                                      >
                                        <td
                                          className="custom-td"
                                          rowSpan={
                                            Object.keys(data[plan][subcategory])
                                              .length + 1
                                          }
                                        >
                                          {
                                            Object.keys(data[plan])[
                                              subcategoryIndex
                                            ]
                                          }
                                        </td>
                                        {Object.keys(
                                          data[plan][subcategory]
                                        ).map(
                                          (
                                            subsubcategory,
                                            subsubcategoryIndex
                                          ) => (
                                            <React.Fragment
                                              key={`${subcategoryIndex}-${subsubcategory}`}
                                            >
                                              <tr
                                                key={`${subcategoryIndex}-${subsubcategory}`}
                                              >
                                                <td className="custom-td">
                                                  {subsubcategory}
                                                </td>
                                                <td className="custom-td">
                                                  {
                                                    data[plan][subcategory][
                                                      subsubcategory
                                                    ]
                                                  }
                                                </td>
                                              </tr>
                                            </React.Fragment>
                                          )
                                        )}
                                      </React.Fragment>
                                    )
                                  )}
                              </tbody>
                            </table>
                            <br></br>
                            <div className="d-flex justify-content-end">
                              <CButton color="secondary" onClick={onClose1}>
                                Close
                              </CButton>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CCol>
                  </CRow>
                </CContainer>
              </CModalBody>
            </>
          ) : (
            <></>
          )}
          <>
            <CModalFooter></CModalFooter>
          </>
        </CTabPane>
      </CTabContent>
    </CModal>
  );
};

export default GenerateModalAudit;

GenerateModalAudit.defaultProps = {
  title: "Generate License",
  body: "",
};

GenerateModalAudit.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  cluster: PropTypes.string,
  tenantid: PropTypes.string,
  plan: PropTypes.string,
  features: PropTypes.object,
  rowData: PropTypes.object,
  body: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  onConfirmGenerateLicense: PropTypes.func.isRequired,
};
