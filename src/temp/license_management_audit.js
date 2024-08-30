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
  CWidgetStatsF,
  CSpinner,
  CAlert,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {
  cilCloudDownload,
  cilReload,
  cilList,
  cilSearch,
  cilChartPie,
} from "@coreui/icons";

import GenerateModalAudit from "../temp/components/GenerateModalAudit";
import FilteredSmartTable from "./components/FilteredSmartTable";

const Tenants_licensing_audit = () => {
  var config = require("../util/config.json");
  const [mounted, setMounted] = useState(true);
  const [refreshed, setRefreshed] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [jobList, setJobList] = useState([]);
  const [showOnlyTenants, setShowOnlyTenants] = useState([]);
  const [tenantList, setTenantList] = useState([]);
  const [selectedTenantCount, setSelectedTenantCount] = useState(0);
  const [isGenerateModalAuditOpen, setIsGenerateModalAuditOpen] =
    useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedTenants, setSelectedTenants] = useState([]);
  const [alertList, setAlertList] = useState([]);
  const [statsLoaded, setStatsLoaded] = useState(false);
  const [totalOperations, settotalOperations] = useState("");
  const [totalGenerateLicense, settotalGenerateLicense] = useState("");
  const [totalEditLicense, settotalEditLicense] = useState("");
  const [totalEnable, settotalEnable] = useState("");
  const [totalDisable, settotalDisable] = useState("");

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

  const getLicenseAudit = async (search = false, key = false) => {
    let payload = {
      audit: true,
    };
    const tenantlist = await license_audit(payload);
    setShowSpinner(true);

    let total_operations = 0;
    let total_generate_license = 0;
    let total_edit_license = 0;
    let total_enable = 0;
    let total_disable = 0;
    try {
      const filteredList = tenantlist.map((item) => {
        const timestamp = Date.now();
        total_operations += 1;
        if (item.operation === "generate_license") {
          total_generate_license += 1;
        } else if (item.operation === "renew_license") {
          total_edit_license += 1;
        } else if (item.operation === "enable_license") {
          total_enable += 1;
        } else if (item.operation === "disable_license") {
          total_disable += 1;
        }
        return {
          Cluster: item.cluster,
          "Tenant ID": item.tenantid,
          "Tenant Name": item.tenantname,
          Operation: item.operation,
          Status: item.status,
          Version: item.version,
          Plan: item.plan,
          Validity: item.validity,
          "Start Date UTC": item.start_date,
          "Expiry Date UTC": item.end_date,
          "Grace Period": item.grace_period,
          "Licensed Users": item.licensed_users,
          Features: item.features,
          "User Email": item.useremail,
          "Jira Ticket": item.jira_ticket,
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
          features_dict: item.features_dict,
        };
      });
      setTenantList(filteredList);
      localStorage.setItem("tenantCount", JSON.stringify(filteredList.length));
      settotalOperations(total_operations);
      settotalGenerateLicense(total_generate_license);
      settotalEditLicense(total_edit_license);
      settotalEnable(total_enable);
      settotalDisable(total_disable);
      setStatsLoaded(true);
    } catch (e) {
      console.log("Could not fetch tenant list.");
      setShowSpinner(false);
    }
    setShowSpinner(false);
  };

  const license_audit = async (payload) => {
    let url = 'http://172.20.13.59:5004/get_snypr_license_audit?audit="true"';
    try {
      const response = await fetch(url);
      const tenantlist = await response.json();
      return tenantlist;
    } catch (e) {
      console.log(e);
    }
  };

  const tenant_list_columns = [
    "Cluster",
    "Tenant ID",
    "Tenant Name",
    "Operation",
    "Status",
    "Version",
    "Plan",
    "Validity",
    "Start Date UTC",
    "Expiry Date UTC",
    // 'Grace Period',
    // 'Licensed Users',
    "Features",
    "User Email",
    "Jira Ticket",
    "Last Updated",
    "Time UTC",
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
      getLicenseAudit();
      setMounted(false);
    }
    if (refreshed) {
      getLicenseAudit();
      setTimeout(() => {
        setRefreshed(false);
      }, 400);
    }
  }, [refreshed, selectedTenants]);

  //JOB DETAIL MODAL FROM TABLE
  const onGenerateModalAuditOpen = (rowData) => {
    const actionContent = {
      title: "license_audit",
      pod: rowData["Cluster"],
      tenantid: rowData["Tenant ID"],
      selected_plan: rowData["Plan"],
      features_dict: rowData["features_dict"],
      rowData,
    };

    setIsGenerateModalAuditOpen(actionContent);
  };

  const onGenerateModalAuditClose = () => setIsGenerateModalAuditOpen(false);

  const generate_license = async (payload) => {
    // let url = 'http://192.168.12.212:5004/generate_snypr_license'
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
      return response;
    } catch (e) {
      console.log(e);
      return "";
    }
  };

  return (
    <CContainer fluid style={{ backgroundColor: "white", paddingTop: "1rem" }}>
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
      <CRow>
        <CCol s={2}>
          <CWidgetStatsF
            className="mb-3"
            color="primary"
            icon={<CIcon icon={cilChartPie} height={24} />}
            title={"Total Operations"}
            value={statsLoaded ? totalOperations : "Loading..."}
          />
        </CCol>
        <CCol s={2}>
          <CWidgetStatsF
            className="mb-3"
            color="success"
            icon={<CIcon icon={cilChartPie} height={24} />}
            title={"Generate License"}
            value={statsLoaded ? totalGenerateLicense : "Loading..."}
          />
        </CCol>
        <CCol s={2}>
          <CWidgetStatsF
            className="mb-3"
            color="warning"
            icon={<CIcon icon={cilChartPie} height={24} />}
            title={"Edit/Renew License"}
            value={statsLoaded ? totalEditLicense : "Loading..."}
          />
        </CCol>
        <CCol s={2}>
          <CWidgetStatsF
            className="mb-3"
            color="danger"
            icon={<CIcon icon={cilChartPie} height={24} />}
            title={"Disable License"}
            value={statsLoaded ? totalDisable : "Loading..."}
          />
        </CCol>
        <CCol s={2}>
          <CWidgetStatsF
            className="mb-3"
            color="info"
            icon={<CIcon icon={cilChartPie} height={24} />}
            title={"Enable License"}
            value={statsLoaded ? totalEnable : "Loading..."}
          />
        </CCol>
      </CRow>
      <CRow>
        <CCol sm={4}></CCol>

        <CCol sm={7}>
          <CButton
            style={{ margin: 5 }}
            color="primary"
            size="sm"
            variant="outline"
            className="float-end d-flex align-items-center"
          >
            <CSVLink style={{ fontFamily: "inherit" }} data={jobList}>
              {" "}
              <CIcon icon={cilCloudDownload} className="pr-2" size="lg" />
            </CSVLink>
          </CButton>

          <CDropdown className="float-end"></CDropdown>
          <CDropdown className="float-end">
            <CDropdownMenu></CDropdownMenu>
          </CDropdown>
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
        </CCol>
      </CRow>
      <CRow>
        <CContainer style={{ overflow: "auto" }}>
          <FilteredSmartTable
            items={tenantList}
            noItemsLabel=""
            columnFilter
            setSelectedItems={setSelectedTenants}
            selected={selectedTenants}
            setSelectedItemCount={setSelectedTenantCount}
            columnSorter
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
      />
    </CContainer>
  );
};

export default Tenants_licensing_audit;
