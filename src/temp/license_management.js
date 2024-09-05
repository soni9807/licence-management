import React, { useEffect, useState } from "react";
import { CSVLink, CSVDownload } from "react-csv";
import {
  CContainer,
  CRow,
  CButton,
  CCol,
  CFormInput,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CBadge,
  CInputGroupText,
  CInputGroup,
  CSpinner,
  CAlert,
  CWidgetStatsF,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {
  cilCloudDownload,
  cilReload,
  cilList,
  cilSearch,
  cilChartPie,
} from "@coreui/icons";
import GenerateModal from "../temp/components/GenerateModal";
import GenerateModalAudit from "../temp/components/GenerateModalAudit";
import DisableModal from "../temp/components/DisableModal";
import RefreshModal from "../temp/components/RefreshModal";
import FilteredSmartTable from "./components/FilteredSmartTable";
import Caption from "../components/Atoms/typography/Caption";

const Tenants = () => {
  var config = require("../util/config.json");
  const [mounted, setMounted] = useState(true);
  //api states
  const [refreshed, setRefreshed] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [jobList, setJobList] = useState([]);
  const [tenantList, setTenantList] = useState([]);
  // selected tenant view count
  const [selectedTenantCount, setSelectedTenantCount] = useState(0);
  const [selectedRow, setSelectedRow] = useState(null);
  // const [listSelectedRow, setlistSelectedRow] = useState([])
  //SELECTED TENANTS
  const [selectedTenants, setSelectedTenants] = useState([]);
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [isGenerateModalAuditOpen, setIsGenerateModalAuditOpen] =
    useState(false);
  const [isDisableModalOpen, setIsDisableModalOpen] = useState(false);
  const [isRefreshModalOpen, setIsRefreshModalOpen] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);
  const [alertList, setAlertList] = useState([]);
  const [statsLoaded, setStatsLoaded] = useState(false);
  const [totalTenants, setTotalTenants] = useState("");
  const [epsCount, setEpsCount] = useState("");
  const [planBasic, setplanBasic] = useState("");
  const [planAdvanced, setplanAdvanced] = useState("");
  const [planStandard, setplanStandard] = useState("");
  const [planEla, setplanEla] = useState("");
  const [planUeba, setplanUeba] = useState("");

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

  const getLicenseInfo = async (search = false, key = false) => {
    setShowSpinner(true);
    let tenant_list_api_url =
      "http://172.20.13.59:5004/get_snypr_license_audit";

    if (search === true) {
      tenant_list_api_url =
        config.VM_OPERATIONS_URL + `/list_tenants?search_key=${key}`;
    }

    try {
      const response = await fetch(tenant_list_api_url);
      const tenantlist = await response.json();
      // var row = 0
      let total_tenants = 0;
      let eps_count = 0;
      let plan_basic = 0;
      let plan_standard = 0;
      let plan_advanced = 0;
      let plan_ela = 0;
      let plan_ueba = 0;
      const filteredList = tenantlist.map((item) => {
        total_tenants += 1;
        if (item.eps != "") {
          eps_count += parseInt(item.eps, 10);
        }
        if (item.plan === "basic") {
          plan_basic += 1;
        } else if (item.plan === "standard") {
          plan_standard += 1;
        } else if (item.plan === "advanced") {
          plan_advanced += 1;
        } else if (item.plan === "ela") {
          plan_ela += 1;
        } else if (item.plan === "ueba_only") {
          plan_ueba += 1;
        }

        const timestamp = Date.now();
        console.log(timestamp);
        return {
          Cluster: item.cluster,
          "Tenant ID": item.tenantid,
          "Tenant Name": item.tenantname,
          Status: item.status,
          Version: item.version,
          "Snypr Refreshed?": item.refresh_snypr,
          Plan: item.plan,
          Validity: item.validity,
          "Start Date UTC": item.start_date,
          "Expiry Date UTC": item.end_date,
          "Grace Period": item.grace_period,
          "Licensed Users": item.licensed_users,
          Features: item.features,
          "User Email": item.useremail,
          "Last Updated": msToTime(timestamp - parseInt(item.logtime)),
          "Time UTC": item.timeutc,
          "Licensed Resources": item.licensed_resources,
          Holder: item.holder,
          "Expiry Action": item.expiry_action,
          "License Type": item.license_type,
          "Consumer Type": item.consumer_type,
          "Consumer Amount": item.consumer_amount,
          "Warn Period": item.warn_period,
          "Lifecycle Status": item.lifecycle_status,
          Issuer: item.issuer,
          "Events Per Day": item.events_per_day,
          "Allocated Disk Space (GB)": item.disk_space,
          Name: item.name,
          "Policy Allowed Count": item.policy_allowed_count,
          "Cold Storage": item.cold_storage,
          "Cold Storage Days": item.cold_storage_days,
          "Billing Type": item.billing_type,
          "GB Per Day": item.gb_per_day,
          EPS: item.eps,
          "EPS Percent": item.eps_percent,
          "Jira Ticket": item.jira_ticket,
          features_dict: item.features_dict,
        };
      });
      setTenantList(filteredList);
      setTotalTenants(total_tenants);
      setEpsCount(eps_count);
      setplanBasic(plan_basic);
      setplanAdvanced(plan_advanced);
      setplanStandard(plan_standard);
      setplanEla(plan_ela);
      setplanUeba(plan_ueba);
      setStatsLoaded(true);
      localStorage.setItem("tenantCount", JSON.stringify(filteredList.length));
    } catch (e) {
      console.log("Could not fetch tenant list.");
      setShowSpinner(false);
    }
    setShowSpinner(false);
  };

  const tenant_list_columns = [
    "Cluster",
    "Tenant ID",
    "Tenant Name",
    "Status",
    "Version",
    "Snypr Refreshed?",
    "Plan",
    "Validity",
    "Start Date UTC",
    "Expiry Date UTC",
    // 'Grace Period',
    // 'Licensed Users',
    "Features",
    // 'User Email',
    "Last Updated",
    "Time UTC",
    // 'features_dict',
    // 'Licensed Resources',
    // 'Holder',
    // 'Expiry Action',
    // 'License Type',
    // 'Consumer Type',
    // 'Consumer Amount',
    // 'Warn Period',
    // 'Lifecycle Status',
    // 'Issuer',
    // 'Events Per Day',
    // 'Allocated Disk Space (GB)',
    // 'Name',
    // 'Policy Allowed Count',
    // 'Cold Storage',
    // 'GB Per Day',
    // 'EPS',
  ];

  const handleRowClick = (rowDat) => {
    setSelectedRow(rowDat);
  };

  const handleRefreshClick = () => {
    setRefreshed(true);
  };

  function msToTime(ms) {
    let seconds = (ms / 1000).toFixed(1);
    let minutes = (ms / (1000 * 60)).toFixed(1);
    let hours = (ms / (1000 * 60 * 60)).toFixed(1);
    let days = (ms / (1000 * 60 * 60 * 24)).toFixed(1);
    if (seconds < 60) return seconds + " Sec";
    else if (minutes < 60) return minutes + " Min";
    else if (hours < 24) return hours + " Hrs";
    else return days + " Days";
  }

  function epochToTime(ms) {
    if (ms) {
      var myDate = new Date(ms);
      return myDate.toLocaleString();
    } else {
      return "N/A";
    }
  }

  const MINUTE_MS = 60000;
  useEffect(() => {
    if (mounted) {
      getLicenseInfo();
      setMounted(false);
    }
    if (refreshed) {
      getLicenseInfo();
      setTimeout(() => {
        setRefreshed(false);
      }, 400);
    }
  }, [refreshed, selectedTenants]);

  const jobsActions = [
    {
      key: "generate-license",
      label: "Generate License",
      title: "generate_license",
    },
    {
      key: "renew-license",
      label: "Edit / Renew License",
      title: "renew_license",
    },
    {
      key: "enable-license",
      label: "Enable License",
      title: "enable_license",
    },
    {
      key: "disable-license",
      label: "Disable License",
      title: "disable_license",
    },
    {
      key: "refresh-license",
      label: "Refresh Snypr License",
      title: "refresh_license",
    },
  ];

  const onDisableModalOpen = (action, rowData) => {
    // const actionContent = {
    //   title: action.title,
    //   selectedTenants,
    // }

    // setIsDisableModalOpen(actionContent)
    let allowed_status = "";
    let error_msg = "";
    if (action.title === "disable_license") {
      allowed_status = "valid";
      error_msg =
        "Please select valid license to perfrom disable license operation.";
    } else if (action.title === "enable_license") {
      allowed_status = "invalid";
      error_msg =
        "Please select invalid license to perfrom enable license operation.";
    }
    // Iterate over the keys of selectedTenants
    let validSelectedTenants = [];
    Object.keys(selectedTenants).forEach((key) => {
      // Check if the status is not equal to 'valid'
      if (selectedTenants[key].Status == allowed_status) {
        // If not valid, remove the record
        validSelectedTenants.push(selectedTenants[key]);
      }
    });
    if (validSelectedTenants.length > 0) {
      const actionContent = {
        title: action.title,
        validSelectedTenants,
      };

      setIsDisableModalOpen(actionContent);
    } else {
      alertList.push({
        alertMessage: error_msg,
        alertVisible: true,
        color: "danger",
      });
      setAlertList([...alertList]);
    }
  };

  const onDisableModalClose = () => setIsDisableModalOpen(false);

  // Refresh Modal
  const onRefreshModalOpen = (action, rowData) => {
    let allowed_status = "";
    let error_msg = "";
    if (action.title === "refresh_license") {
      allowed_status = "no";
      error_msg =
        'Please select tenants on which edit / renew operation is performed and whose Snypr Refreshed? value is "NO".';
    }
    // Iterate over the keys of selectedTenants
    let validSelectedTenants = [];
    Object.keys(selectedTenants).forEach((key) => {
      // Check if the status is not equal to 'valid'
      if (selectedTenants[key]["Snypr Refreshed?"] == allowed_status) {
        // If not valid, remove the record
        validSelectedTenants.push(selectedTenants[key]);
      }
    });
    if (validSelectedTenants.length > 0) {
      const actionContent = {
        title: action.title,
        validSelectedTenants,
      };

      setIsRefreshModalOpen(actionContent);
    } else {
      alertList.push({
        alertMessage: error_msg,
        alertVisible: true,
        color: "danger",
      });
      setAlertList([...alertList]);
    }
  };

  const onRefreshModalClose = () => setIsRefreshModalOpen(false);

  //JOB DETAIL MODAL FROM TABLE
  const onGenerateModalAuditOpen = (rowData) => {
    const actionContent = {
      title: "generate_license", // AK
      pod: rowData["Cluster"],
      tenantid: rowData["Tenant ID"],
      selected_plan: rowData["Plan"],
      features_dict: rowData["features_dict"],
      rowData,
    };

    setIsGenerateModalAuditOpen(actionContent);
  };

  const onGenerateModalAuditClose = () => setIsGenerateModalAuditOpen(false);

  const onGenerateTenantModalOpen = (action, buttonName) => {
    let actionContent = {};
    let selectedRowData = selectedTenants[0];
    if (
      buttonName === "renew-license" &&
      selectedRowData["Status"] === "invalid"
    ) {
      let message =
        "License is invalid. Please enable the license for editing/renewing.";
      let color = "danger";

      alertList.push({
        alertMessage: message,
        alertVisible: true,
        color: color,
      });
      setAlertList([...alertList]);
      return;
    }
    if (buttonName === "renew-license") {
      actionContent = {
        title: action.title,
        rowdata_cluster: selectedRowData["Cluster"],
        rowdata_tenantid: selectedRowData["Tenant ID"],
        rowdata_plan: selectedRowData["Plan"],
        rowdata_features: selectedRowData["features_dict"],
        selectedRowData,
      };
    } else {
      actionContent = {
        title: action.title,
      };
    }

    setIsGenerateModalOpen(actionContent);
  };

  // Refresh page on close
  const onGenerateModalClose = () => {
    if (isSubmitted === true) {
      getLicenseInfo();
      setSubmitted(false);
    }
    setIsGenerateModalOpen(false);
  };

  const generate_license = async (payload) => {
    let url = config.SNYPR_OMC_API + "/generate_snypr_license";
    try {
      const response = await fetch(url, {
        method: "post",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });
      setSubmitted(true);
      let data = await response.json();
      return [response, data];
    } catch (e) {
      console.log(e);
      return "";
    }
  };

  const change_license_status = async (payload, operation) => {
    let url = config.SNYPR_OMC_API + "/update_snypr_license_status";
    try {
      // const response = { status: 200 }
      const response = await fetch(url, {
        method: "post",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });

      let message,
        color,
        operation_name = "";
      if (operation === "enable") {
        operation_name = "Enable";
      } else if (operation === "disable") {
        operation_name = "Disable";
      }

      if (response) {
        if (response.status === 200) {
          message = operation_name + " license operation was successful.";
          color = "success";
        } else {
          message = operation_name + " license operation failed.";
          color = "danger";
        }
      } else {
        message = "Error while submitting request";
        color = "danger";
      }
      alertList.push({
        alertMessage: message,
        alertVisible: true,
        color: color,
      });
      setAlertList([...alertList]);
      setSubmitted(true);
      setSelectedTenants([]);
      getLicenseInfo();
      return response;
    } catch (e) {
      console.log(e);
      return "";
    }
  };

  const refresh_license_details = async (payload, operation) => {
    let url = config.SNYPR_OMC_API + "/refresh_snypr_license";
    try {
      // const response = { status: 200 }
      const response = await fetch(url, {
        method: "post",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });

      let response_data = await response.json();

      let message, color;

      if (response) {
        if (response.status === 200) {
          message = response_data; //'Refresh license operation was successful.'
          color = "success";
        } else {
          message = response_data; //'Refresh license operation failed.'
          color = "danger";
        }
      } else {
        message = "Error while submitting request";
        color = "danger";
      }
      alertList.push({
        alertMessage: message,
        alertVisible: true,
        color: color,
      });
      setAlertList([...alertList]);
      setSubmitted(true);
      setSelectedTenants([]);
      getLicenseInfo();
      return response;
    } catch (e) {
      console.log(e);
      return "";
    }
  };

  const widgetData = [
    {
      title: "Total Tenants",
      value: statsLoaded ? totalTenants : "Loading...",
      color: "primary",
    },
    {
      title: "Valid License",
      value: statsLoaded ? totalTenants : "Loading...", // Assuming this is the same as Total Tenants
      color: "info",
    },
    {
      title: "Basic",
      value: statsLoaded ? planBasic : "Loading...",
      color: "warning",
    },
    {
      title: "Standard",
      value: statsLoaded ? planStandard : "Loading...",
      color: "info",
    },
    {
      title: "Advanced",
      value: statsLoaded ? planAdvanced : "Loading...",
      color: "secondary",
    },
    {
      title: "ELA",
      value: statsLoaded ? planEla : "Loading...",
      color: "dark",
    },
    {
      title: "UEBA",
      value: statsLoaded ? planUeba : "Loading...",
      color: "black",
    },
  ];

  return (
    <CContainer fluid style={{ backgroundColor: "white", paddingTop: "1rem" }}>
      <div>
        {alertList?.map((item, index) => (
          <CAlert
            key={index}
            fade
            dismissible
            visible={item.alertVisible}
            show={item.alertVisible}
            onClose={() => (item.alertVisible = false)}
            color={item.color}
          >
            {item.alertMessage}
          </CAlert>
        ))}
      </div>
      <CRow>
        {widgetData.map((widget, index) => (
          <CCol key={index} style={{ fontSize: "12px" }}>
            <CWidgetStatsF
              className="mb-3 "
              color={widget.color}
              icon={
                <CIcon
                  className="p-0 m-0"
                  icon={cilChartPie}
                  height={20}
                  color="black"
                />
              }
              title={widget.title}
              value={widget.value}
            />
          </CCol>
        ))}
      </CRow>
      <div className="flex justify-end">
        <CButton
          style={{ margin: 5 }}
          size="sm"
          color="primary"
          className="float-end d-flex align-items-center"
          variant="outline"
          onClick={() => setRefreshed(true)}
        >
          {refreshed || showSpinner ? (
            <>
              <CSpinner size="sm" className="pr-2" />
              &nbsp;Refreshing
            </>
          ) : (
            <>
              <CIcon icon={cilReload} className="pr-2" />
              &nbsp;Refresh
            </>
          )}
        </CButton>
        <CDropdown className="float-end">
          <CDropdownToggle
            href="#"
            style={{ margin: 5 }}
            size="sm"
            color="primary"
            className="float-end"
            variant="outline"
            // disabled={selectedTenants?.length === 0 || getAccess(userRole)[0] >= 3}
          >
            Actions
          </CDropdownToggle>
          <CDropdownMenu>
            {jobsActions?.map((action) => (
              <>
                {["generate-license"].includes(action.key) ? (
                  <>
                    {" "}
                    <CDropdownItem
                      disabled={selectedTenants?.length > 0}
                      key={action.key}
                      // onClick={() => toggleModal(action)}
                      onClick={() =>
                        onGenerateTenantModalOpen(action, "generate-license")
                      }
                    >
                      {action.label}{" "}
                      {action?.new ? (
                        <CBadge color="success">new</CBadge>
                      ) : (
                        <></>
                      )}
                    </CDropdownItem>
                  </>
                ) : action.key === "renew-license" ? (
                  <>
                    {" "}
                    <CDropdownItem
                      disabled={selectedTenants?.length !== 1}
                      key={action.key}
                      onClick={() =>
                        onGenerateTenantModalOpen(action, "renew-license")
                      }
                    >
                      {action.label}
                    </CDropdownItem>
                  </>
                ) : action.key === "disable-license" ? (
                  <>
                    {" "}
                    <CDropdownItem
                      disabled={selectedTenants?.length === 0}
                      key={action.key}
                      onClick={() =>
                        onDisableModalOpen(action, "disable-license")
                      }
                    >
                      {action.label}
                    </CDropdownItem>
                  </>
                ) : action.key === "enable-license" ? (
                  <>
                    {" "}
                    <CDropdownItem
                      disabled={selectedTenants?.length === 0}
                      key={action.key}
                      onClick={() =>
                        onDisableModalOpen(action, "enable-license")
                      }
                    >
                      {action.label}
                    </CDropdownItem>
                  </>
                ) : action.key === "refresh-license" ? (
                  <>
                    {" "}
                    <CDropdownItem
                      disabled={selectedTenants?.length !== 1}
                      key={action.key}
                      onClick={() =>
                        onRefreshModalOpen(action, "refresh-license")
                      }
                    >
                      {action.label}
                    </CDropdownItem>
                  </>
                ) : (
                  <CDropdownItem
                    disabled={selectedTenants?.length > 1}
                    key={action.key}
                    // onClick={() => onModalOpen(action)}
                  >
                    {action.label}
                  </CDropdownItem>
                )}
              </>
            ))}
          </CDropdownMenu>
        </CDropdown>
        <CButton
          style={{ margin: 5 }}
          color="primary"
          size="sm"
          variant="outline"
        >
          <CSVLink style={{ fontFamily: "inherit" }} data={jobList}>
            <CIcon icon={cilCloudDownload} className="pr-2" size="lg" />
          </CSVLink>
        </CButton>
        <CDropdown className="float-end">
          <CDropdownMenu>
            <CDropdownItem
              href={`ssh://${localStorage.getItem("username")}@${
                selectedTenants?.[0]?.["Spark Server IP"]
              }`}
            >
              Spark Server
            </CDropdownItem>
            <CDropdownItem
              href={`ssh://${localStorage.getItem("username")}@${
                selectedTenants?.[0]?.["App Server IP"]
              }`}
            >
              Application Server
            </CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
      </div>
      <CRow>
        <CContainer
          style={{ overflow: "auto", fontSize: "12px", marginBottom: "10px" }}
        >
          <FilteredSmartTable
            key={isSubmitted}
            items={tenantList}
            noItemsLabel=""
            setSelectedItems={setSelectedTenants}
            selected={selectedTenants}
            setSelectedItemCount={setSelectedTenantCount}
            pagination
            loading={showSpinner}
            selectable
            active
            clickableRows
            itemsPerPageSelect
            itemsPerPage={20}
            onRowClick={handleRowClick}
            tableProps={{ hover: true, responsive: true, striped: true }}
            scopedColumns={{
              Features: (item) => (
                <td>
                  <span
                    onClick={() => onGenerateModalAuditOpen(item)}
                    style={{
                      borderBottom: "1px dashed #321fdb",
                      color: "#321fdb",
                      cursor: "pointer",
                    }}
                  >
                    {item?.["Features"]}
                  </span>
                </td>
              ),
              "Snypr Refreshed?": (item) => (
                <td
                  style={{
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CBadge
                    style={{
                      color:
                        item["Snypr Refreshed?"] === "no"
                          ? "white"
                          : item["Snypr Refreshed?"] === "yes"
                          ? "white"
                          : item["Snypr Refreshed?"] === "NA"
                          ? "white"
                          : "black",
                      backgroundColor:
                        item["Snypr Refreshed?"] === "no"
                          ? "#FC5D78"
                          : item["Snypr Refreshed?"] === "yes"
                          ? "#00A92E"
                          : item["Snypr Refreshed?"] === "NA"
                          ? "orange"
                          : "transparent",
                      textAlign: "center",
                      textTransform: "uppercase",
                      fontWeight: "bold",
                      width: "75px",
                      height: "30px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span>{item?.["Snypr Refreshed?"]}</span>
                  </CBadge>
                </td>
              ),
              features_dict: (item) => <td hidden={true}></td>,
              "Grace Period": (item) => <td hidden={true}></td>,
              "Licensed Users": (item) => <td hidden={true}></td>,
              "Licensed Resources": (item) => <td hidden={true}></td>,
              Holder: (item) => <td hidden={true}></td>,
              "Expiry Action": (item) => <td hidden={true}></td>,
              "License Type": (item) => <td hidden={true}></td>,
              "Consumer Type": (item) => <td hidden={true}></td>,
              "Consumer Amount": (item) => <td hidden={true}></td>,
              "Warn Period": (item) => <td hidden={true}></td>,
              "Lifecycle Status": (item) => <td hidden={true}></td>,
              Issuer: (item) => <td hidden={true}></td>,
              "Events Per Day": (item) => <td hidden={true}></td>,
              "Allocated Disk Space (GB)": (item) => <td hidden={true}></td>,
              Name: (item) => <td hidden={true}></td>,
              "Policy Allowed Count": (item) => <td hidden={true}></td>,
              "Cold Storage": (item) => <td hidden={true}></td>,
              "GB Per Day": (item) => <td hidden={true}></td>,
              EPS: (item) => <td hidden={true}></td>,
            }}
            columns={tenant_list_columns}
          />
        </CContainer>
      </CRow>

      <GenerateModal
        title={isGenerateModalOpen?.title}
        rowdata_cluster={isGenerateModalOpen?.rowdata_cluster}
        rowdata_tenantid={isGenerateModalOpen?.rowdata_tenantid}
        rowdata_plan={isGenerateModalOpen?.rowdata_plan}
        rowdata_features={isGenerateModalOpen?.rowdata_features}
        selectedRow={isGenerateModalOpen?.selectedRowData}
        body={isGenerateModalOpen?.body}
        onClose={onGenerateModalClose}
        isOpen={isGenerateModalOpen}
        onConfirmGenerateLicense={generate_license}
      />

      <GenerateModalAudit
        title={isGenerateModalAuditOpen?.title}
        cluster={isGenerateModalAuditOpen?.pod}
        tenantid={isGenerateModalAuditOpen?.tenantid}
        plan={isGenerateModalAuditOpen?.selected_plan}
        features={isGenerateModalAuditOpen?.features_dict}
        rowData={isGenerateModalAuditOpen?.rowData}
        body={isGenerateModalAuditOpen?.body}
        onClose={onGenerateModalAuditClose}
        isOpen={isGenerateModalAuditOpen}
        // onConfirmTenantExclusion={tenant_exclusion}
      />

      <DisableModal
        title={isDisableModalOpen?.title}
        listSelectedRow={isDisableModalOpen?.validSelectedTenants}
        body={isDisableModalOpen?.body}
        onClose={onDisableModalClose}
        isOpen={isDisableModalOpen}
        onConfirmLicenseStatusChange={change_license_status}
      />

      <RefreshModal
        title={isRefreshModalOpen?.title}
        listSelectedRow={isRefreshModalOpen?.validSelectedTenants}
        body={isRefreshModalOpen?.body}
        onClose={onRefreshModalClose}
        isOpen={isRefreshModalOpen}
        onConfirmRefreshLicense={refresh_license_details}
      />
    </CContainer>
  );
};

export default Tenants;
