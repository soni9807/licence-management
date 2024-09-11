import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
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
} from '@coreui/react'
import './GenerateModal.css'
import { plan_config } from './plan_config.js'
import { config_gb_per_day } from './plan_config.js'
import { disable_plan_config } from './plan_config.js'
import { CSmartTable } from '@coreui/react-pro'

const GenerateModal = ({
  isOpen,
  onClose,
  title = 'generate_license',
  rowdata_cluster,
  rowdata_tenantid,
  rowdata_plan,
  rowdata_features,
  selectedRow,
  body = '',
  onConfirmGenerateLicense,
}) => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [alertVisible, setAlertVisible] = useState(false)
  const [alertProps, setAlertProps] = useState({
    message: 'none',
    stat: 'success',
    color: 'success',
  })
  const [heading, setHeading] = useState('')
  const [cluster, setCluster] = useState('')
  const [tenantid, setTenantId] = useState('')
  const [tenantname, setTenantName] = useState('')
  const [jiraTicket, setjiraTicket] = useState('')
  const [userCount, setUserCount] = useState('')
  const [validity, setValidity] = useState('30-days')
  const [gracePeriod, setgracePeriod] = useState('')
  const [companyList, setCompanyList] = useState([{ ' name ': '', ' id ': '' }])
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const [licensedUsers, setlicensedUsers] = useState('')
  const [licensedResources, setlicensedResources] = useState('1000000000')
  const [holder, setHolder] = useState('SECURONIX')
  const [expiryAction, setexpiryAction] = useState('warn')
  const [licenseType, setlicenseType] = useState('mssp')
  const [consumerType, setconsumerType] = useState('user')
  const [consumerAmount, setconsumerAmount] = useState('')
  const [warnPeriod, setwarnPeriod] = useState('60-days')
  const [lifecycleStatus, setlifecycleStatus] = useState('noworries')
  const [issuer, setIssuer] = useState('SECURONIX')
  const [eventsPerDay, seteventsPerDay] = useState('0')
  const [diskSpace, setdiskSpace] = useState('0')
  const [name, setName] = useState('')
  const [policyAllowedCount, setpolicyAllowedCount] = useState('1500')
  const [coldStorage, setcoldStorage] = useState('3')
  const [coldStorageDays, setcoldStorageDays] = useState('0')
  const [billingType, setbillingType] = useState('gb_per_day')
  const [gbPerDay, setgbPerDay] = useState('')
  const [epsPercent, setepsPercent] = useState('')
  const [eps, seteps] = useState('')

  const [plan, setPlan] = useState('basic')
  const [defaultData, setDefaultData] = useState({})
  const [data, setData] = useState({})
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const initialize_data = plan_config
  let tenant_data = {}
  if (title === 'renew_license') {
    tenant_data = { ...rowdata_features }
  }

  useEffect(() => {
    setDefaultData(plan_config)
  }, [])

  useEffect(() => {
    if (title === 'generate_license') {
      setHeading('Generate License')
      setData(defaultData)
      setInitialize(false)
      initializeFeatureValues()
    } else if (title === 'renew_license') {
      setHeading('Edit / Renew License')
    }
  }, [title])

  const [initialize, setInitialize] = useState(false)
  const [featureValuesDict, setFeatureValuesDict] = useState({})
  const initializeFeatureValues = () => {
    if (data[plan] && !initialize) {
      let initializeFeatureValuesDict = {}

      Object.keys(data[plan]).forEach((category) => {
        Object.keys(data[plan][category]).forEach((featureName) => {
          const valuesArray = data[plan][category][featureName]
          if (valuesArray && valuesArray.length > 0) {
            initializeFeatureValuesDict[featureName] = valuesArray[0]
          }
        })
      })

      setFeatureValuesDict(initializeFeatureValuesDict)
      setInitialize(true)
    } else if (initialize_data[plan] && !initialize) {
      let initializeFeatureValuesDict = {}

      Object.keys(initialize_data[plan]).forEach((category) => {
        Object.keys(initialize_data[plan][category]).forEach((featureName) => {
          const valuesArray = initialize_data[plan][category][featureName]
          if (valuesArray && valuesArray.length > 0) {
            initializeFeatureValuesDict[featureName] = valuesArray[0]
          }
        })
      })

      setFeatureValuesDict(initializeFeatureValuesDict)
      setInitialize(true)
    }
  }

  useEffect(() => {
    // Reset initialize to false when the dropdown value changes
    setInitialize(false)
  }, [plan])

  useEffect(() => {
    if (!initialize) {
      initializeFeatureValues()
    }
  }, [initialize])

  const [initialize_renew_values, setInitializeRenewValues] = useState(false)

  const initializeRenewValues = () => {
    if (title === 'renew_license') {
      setCluster(selectedRow['Cluster'])
      setTenantId(selectedRow['Tenant ID'])
      setTenantName(selectedRow['Tenant Name'])
      setlicensedUsers(selectedRow['Licensed Users'])
      setValidity(selectedRow['Validity'])
      setgracePeriod(selectedRow['Grace Period'])
      const tenant_start_date = selectedRow['Start Date UTC']
      const start_date = tenant_start_date.split(' ')[0]
      const tenant_end_date = selectedRow['Expiry Date UTC']
      const end_date = tenant_end_date.split(' ')[0]
      setStartDate(start_date)
      setEndDate(end_date)
      setPlan(selectedRow['Plan'])

      setlicensedResources(selectedRow['Licensed Resources'])
      setHolder(selectedRow['Holder'])
      setexpiryAction(selectedRow['Expiry Action'])
      setlicenseType(selectedRow['License Type'])
      setconsumerType(selectedRow['Consumer Type'])
      setconsumerAmount(selectedRow['Consumer Amount'])
      setwarnPeriod(selectedRow['Warn Period'])
      setlifecycleStatus(selectedRow['Lifecycle Status'])
      setIssuer(selectedRow['Issuer'])
      seteventsPerDay(selectedRow['Events Per Day'])
      setdiskSpace(selectedRow['Allocated Disk Space (GB)'])
      setName(selectedRow['Name'])
      setpolicyAllowedCount(selectedRow['Policy Allowed Count'])
      setcoldStorage(selectedRow['Cold Storage'])
      setcoldStorageDays(selectedRow['Cold Storage Days'])
      // setbillingType(selectedRow['Billing Type'])
      setbillingType(
        selectedRow['Billing Type'] === '' ? 'gb_per_day' : selectedRow['Billing Type'],
      )
      setgbPerDay(selectedRow['GB Per Day'])
      seteps(selectedRow['EPS'])
      setepsPercent(selectedRow['EPS Percent'])

      const selected_plan = selectedRow['Plan']
      const temp_data = JSON.parse(JSON.stringify(defaultData))
      Object.keys(tenant_data[selected_plan]).forEach((category) => {
        Object.keys(tenant_data[selected_plan][category]).forEach((featureName) => {
          try {
            const selectedValue = tenant_data[selected_plan][category][featureName]
            let valuesArray = temp_data[selected_plan][category][featureName]
            let temp_valuesArray = valuesArray.filter((value) => value !== selectedValue)
            const newArray = [selectedValue, ...temp_valuesArray]
            temp_data[selected_plan][category][featureName] = newArray
          } catch {}
        })
      })
      setData(temp_data)
      setInitializeRenewValues(true)
    }
  }

  useEffect(() => {
    // Reset initialize to false when new row is selected
    setInitializeRenewValues(false)
  }, [selectedRow])

  useEffect(() => {
    if (!initialize_renew_values) {
      initializeRenewValues()
    }
  }, [selectedRow])

  const handleSelectValueChange = (updated_featureName, selectedValue) => {
    featureValuesDict[updated_featureName] = selectedValue
  }
  function handleChangePlan(new_plan) {
    setPlan(new_plan)
  }
  function handleChangeValidity(new_validity) {
    setValidity(new_validity)
    calculateEndDate(startDate, new_validity)
  }
  function handleStartDateChange(new_startdate) {
    setStartDate(new_startdate)
    calculateValidity(new_startdate, endDate)
    if (new_startdate > endDate) {
      setAlertMessage('', 'License start date cannot be greater than end date.')
    } else {
      setAlertVisible(false)
    }
  }

  function handleEndDateChange(new_enddate) {
    // setStartDate(new_startdate)
    setEndDate(new_enddate)
    calculateValidity(startDate, new_enddate)
    if (startDate > new_enddate) {
      setAlertMessage('', 'License start date cannot be greater than end date.')
    } else {
      setAlertVisible(false)
    }
  }

  function calculateValidity(selected_startDate, selected_endDate) {
    const start = new Date(selected_startDate)
    const end = new Date(selected_endDate)

    if (!isNaN(start) && !isNaN(end)) {
      const diffTime = Math.abs(end - start)
      // const diffTime = end - start
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
      // setValidity(diffDays)
      setValidity(`${diffDays}-days`)
    } else {
    }
  }

  function calculateEndDate(selected_startDate, add_validity) {
    // Calculate the default end date as 30 days from today
    const endDate = new Date(selected_startDate)
    endDate.setDate(endDate.getDate() + parseInt(add_validity, 10))
    const endYYYY = endDate.getFullYear()
    let endMM = endDate.getMonth() + 1
    let endDD = endDate.getDate()

    if (endMM < 10) {
      endMM = `0${endMM}`
    }

    if (endDD < 10) {
      endDD = `0${endDD}`
    }

    const defaultEndDate = `${endYYYY}-${endMM}-${endDD}`
    setEndDate(defaultEndDate)
  }

  function calculateStartDate(default_validity = false) {
    // Set the default value to today's date
    const today = new Date()
    // const yyyy = today.getFullYear()
    // let mm = today.getMonth() + 1 // Months are zero-based
    // let dd = today.getDate()
    const yyyy = today.getUTCFullYear()
    let mm = today.getUTCMonth() + 1 // Months are zero-based
    let dd = today.getUTCDate()

    if (mm < 10) {
      mm = `0${mm}`
    }

    if (dd < 10) {
      dd = `0${dd}`
    }

    const defaultDate = `${yyyy}-${mm}-${dd}`

    setStartDate(defaultDate)
    let add_validity = ''
    if (default_validity == true) {
      add_validity = '30-days'
    } else {
      add_validity = validity
    }
    calculateEndDate(defaultDate, add_validity)
  }

  useEffect(() => {
    calculateStartDate()
  }, [])

  // const table = document.getElementById('dynamic-table')

  const [activeKey, setActiveKey] = useState(0)

  const [userRole, setUserRole] = useState(localStorage.getItem('role'))
  function getAccess(role) {
    switch (role) {
      case 'su':
        return [0, 'Super User']
      case 'au':
        return [1, 'Admin User']
      case 'ea':
        return [1.5, 'Early Adopter']
      case 'ru':
        return [2, 'Regular User']
      case 'r':
        return [3, 'Read Only']
      case 'ro':
        return [3, 'Read Only']
      default:
        return [3, 'Read Only']
    }
  }

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
        stat: 'error',
        color: 'danger',
      })
    } else if (response.status === 200) {
      console.log('ok')
      setAlertProps({
        message,
        stat: 'success',
        color: 'success',
      })
    } else {
      setAlertProps({
        message,
        stat: 'error',
        color: 'danger',
      })
    }
    setAlertVisible(true)
  }

  function getVersion() {
    let newVersion = 'version1.0'
    try {
      if (selectedRow && 'Version' in selectedRow && selectedRow['Version'] !== null) {
        let version = selectedRow['Version']
        let numericVersion = parseFloat(version.match(/\d+(\.\d+)?/)[0])
        numericVersion += 0.1
        newVersion = version.replace(/\d+(\.\d+)?/, numericVersion.toFixed(1))
      }
    } catch (error) {
      newVersion = 'version1.0'
    }
    console.log('VERSION ', newVersion)
    return newVersion
  }

  async function onSubmit() {
    const timestamp = Date.now()
    let version = getVersion()
    let payload = {
      // testing: 'true',
      app_key: 'b0l2ndgk_8EhVZB57aTPfj83NP9YTVP8yBH4AkxSg',
      useremail: localStorage.getItem('email'),
      operation: title,
      cluster: cluster,
      tenant_id: tenantid,
      tenantname: tenantname,
      validity: validity,
      start_date: startDate + ' 00:00:00',
      end_date: endDate + ' 23:59:59',
      issued_on: timestamp,
      grace_period: gracePeriod,
      // user_count: userCount,
      plan: plan,
      features: featureValuesDict,
      licensed_users: licensedUsers,
      licensed_resources: licensedResources,
      holder: holder,
      expiry_action: expiryAction,
      license_type: licenseType,
      consumer_type: consumerType,
      consumer_amount: consumerAmount,
      warn_period: warnPeriod,
      lifecycle_status: lifecycleStatus,
      issuer: issuer,
      events_per_day: eventsPerDay,
      disk_space: diskSpace,
      name: name,
      policy_allowed_count: policyAllowedCount,
      cold_storage: coldStorage,
      cold_storage_days: coldStorageDays,
      billing_type: billingType,
      gb_per_day: gbPerDay,
      eps: eps,
      eps_percent: epsPercent,
      status: 'valid',
      version: version,
      jira_ticket: jiraTicket,
    }
    console.log('PAYLOAD', payload)
    if (!cluster || !tenantid) {
      setAlertMessage('', 'Please enter Cluster and Tenant Id')
    } else if (!licensedUsers) {
      setAlertMessage('', 'Please enter User Count')
    } else if (!/^\d*$/.test(licensedUsers)) {
      setAlertMessage('', 'Please enter only digits in User Count')
    } else {
      setLoading(true)
      let [response, response_message] = await onConfirmGenerateLicense(payload)
      console.log('RESPONSEEEE')
      console.log(response.json())
      let message = ''
      if (response) {
        if (response.status === 200) {
          setIsSubmitted(true)
          if (title === 'generate_license') {
            message = response_message //'Generate license operation was successful.'
          } else if (title === 'renew_license') {
            message = response_message //'Edit / Renew license operation was successful.'
          }
        } else {
          if (title === 'generate_license') {
            message = response_message //'Generate license operation failed.'
          } else if (title === 'renew_license') {
            message = response_message //'Edit / Renew license operation failed.'
          }
        }
      } else {
        if (title === 'generate_license') {
          message = 'Error while submitting generate license request'
        } else if (title === 'renew_license') {
          message = 'Error while submitting renew / edit license request'
        }
      }
      setLoading(false)
      setAlertMessage(response, message)
      // onClose()
      sessionStorage.clear()
    }
  }

  const onSubmit1 = async () => {
    let version = getVersion()
    console.log('Cluster', cluster)
    console.log('Tenant Id', tenantid)
    console.log('Plan', plan)
    console.log('Selected Values:', featureValuesDict)
    let message = ''
    message = 'Generate license operation was successful.'
    let response = { status: 200 }
    setAlertMessage(response, message)
    setIsSubmitted(true)
  }

  function onClose1() {
    setAlertVisible(false)
    setIsSubmitted(false)
    setCluster('')
    setTenantId('')
    setTenantName('')
    setjiraTicket('')
    setlicensedUsers('')
    setValidity('30-days')
    setgracePeriod('')
    calculateStartDate(true)
    setPlan('basic')
    setlicensedUsers('')
    setlicensedResources('1000000000')
    setHolder('SECURONIX')
    setexpiryAction('warn')
    setlicenseType('mssp')
    setconsumerType('user')
    setconsumerAmount('')
    setwarnPeriod('60-days')
    setlifecycleStatus('noworries')
    setIssuer('SECURONIX')
    seteventsPerDay('0')
    setdiskSpace('0')
    setName('')
    setpolicyAllowedCount('1500')
    setcoldStorage('3')
    setcoldStorageDays('0')
    setbillingType('gb_per_day')
    setgbPerDay('')
    seteps('')
    setepsPercent('')
    setErrors({})
    onClose('')
    sessionStorage.clear()
  }

  function isValidAlphaNumeric(str) {
    const hasAlphabet = /[a-zA-Z]/.test(str)
    const hasDigit = /\d/.test(str)
    return hasAlphabet && hasDigit
  }

  function validateInput() {
    const newErrors = {}
    let errormsg = ''
    let valid_input = true
    if (!jiraTicket) {
      newErrors.jiraticket = 'Please enter Jira Ticket or Comments'
      // setAlertMessage('', 'Please enter Jira Ticket or Comments')
      errormsg += '• Please enter Jira Ticket or Comments\n'
      valid_input = false
    }

    if (!cluster) {
      newErrors.cluster = 'Please enter Cluster'
      // setAlertMessage('', 'Please enter Cluster')
      errormsg += '• Please enter Cluster\n'
      valid_input = false
    }

    if (!tenantid) {
      newErrors.tenantid = 'Please enter Tenant Id'
      // setAlertMessage('', 'Please enter Tenant Id')
      errormsg += '• Please enter Tenant Id\n'
      valid_input = false
    }

    if (!licensedUsers) {
      newErrors.licensedusers = 'Please enter Licensed Users'
      // setAlertMessage('', 'Please enter Licensed Users')
      errormsg += '• Please enter Licensed Users\n'
      valid_input = false
    }

    if (!coldStorage) {
      newErrors.cold_storage_years = 'Please enter Cold Storage'
      // setAlertMessage('', 'Please enter Cold Storage')
      errormsg += '• Please enter Cold Storage\n'
      valid_input = false
    }

    if (tenantid) {
      if (!/^[a-zA-Z0-9]+$/.test(tenantid)) {
        newErrors.tenantid = 'Tenant Id: Allowed characters are alphabets and digits'
        // setAlertMessage('', 'Tenant Id: Allowed characters are alphabets and digits')
        errormsg += '• Tenant Id: Allowed characters are alphabets and digits\n'
        valid_input = false
      }

      let tenantid_valid_input = isValidAlphaNumeric(tenantid)
      if (tenantid_valid_input == false) {
        newErrors.tenantid = 'Tenant Id: Your input should contain letters and numbers.'
        // setAlertMessage('', 'Tenant Id: Your input should contain letters and numbers.')
        errormsg += '• Tenant Id: Your input should contain letters and numbers.\n'
        valid_input = false
      }
    }

    if (cluster) {
      if (!/^[a-zA-Z0-9-]+$/.test(cluster)) {
        newErrors.cluster = 'Cluster: Allowed characters are "-", alphabets and digits'
        // setAlertMessage('', 'Cluster: Allowed characters are "-", alphabets and digits')
        errormsg += '• Cluster: Allowed characters are "-", alphabets and digits\n'
        valid_input = false
      }

      let cluster_valid_input = isValidAlphaNumeric(cluster)
      if (cluster_valid_input == false) {
        newErrors.cluster = 'Cluster: Your input should contain letters and numbers.'
        // setAlertMessage('', 'Cluster: Your input should contain letters and numbers.')
        errormsg += '• Cluster: Your input should contain letters and numbers.\n'
        valid_input = false
      }
    }

    if (startDate > endDate) {
      newErrors.startdate = 'License start date cannot be greater than end date.'
      // setAlertMessage('', 'License start date cannot be greater than end date.')
      errormsg += '• License start date cannot be greater than end date.\n'
      valid_input = false
    }

    if (licensedUsers) {
      if (!/^\d*$/.test(licensedUsers)) {
        newErrors.licensedusers = 'Please enter only digits in Licensed Users'
        // setAlertMessage('', 'Please enter only digits in Licensed Users')
        errormsg += '• Please enter only digits in Licensed Users\n'
        valid_input = false
      } else if (licensedUsers) {
        let int_licensedUsers = parseInt(licensedUsers, 10)
        if (int_licensedUsers < 0 || int_licensedUsers > 1000000) {
          newErrors.licensedusers = 'Licensed Users: Allowed Range is 0 - 1000000'
          // setAlertMessage('', 'Licensed Users: Allowed Range is 0 - 1000000')
          errormsg += '• Licensed Users: Allowed Range is 0 - 1000000\n'
          valid_input = false
        }
      }
    }

    if (coldStorage) {
      if (!/^\d*$/.test(coldStorage)) {
        newErrors.cold_storage_years = 'Please enter only digits in Cold Storage'
        // setAlertMessage('', 'Please enter only digits in Cold Storage')
        errormsg += '• Please enter only digits in Cold Storage\n'
        valid_input = false
      } else if (coldStorage) {
        let int_coldStorage = parseInt(coldStorage, 10)
        if (int_coldStorage < 0 || int_coldStorage > 10) {
          newErrors.cold_storage_years = 'Cold Storage: Allowed Range is 0 - 10 years'
          // setAlertMessage('', 'Cold Storage: Allowed Range is 0 - 10 years')
          errormsg += '• Cold Storage: Allowed Range is 0 - 10 years\n'
          valid_input = false
        }
      }
    }

    if (coldStorageDays) {
      if (!/^\d*$/.test(coldStorageDays)) {
        newErrors.cold_storage_days = 'Please enter only digits in the (Days) field of Cold Storage'
        // setAlertMessage('', 'Please enter only digits in the (Days) field of Cold Storage')
        errormsg += '• Please enter only digits in the (Days) field of Cold Storage\n'
        valid_input = false
      } else if (coldStorageDays) {
        let int_coldStorage_days = parseInt(coldStorageDays, 10)
        if (int_coldStorage_days < 0 || int_coldStorage_days > 365) {
          newErrors.cold_storage_days = 'Cold Storage (Days): Allowed Range is 0 - 365 days'
          // setAlertMessage('', 'Cold Storage (Days): Allowed Range is 0 - 365 days')
          errormsg += '• Cold Storage (Days): Allowed Range is 0 - 365 days\n'
          valid_input = false
        }
      }
    }

    if (billingType === 'gb_per_day') {
      if (!gbPerDay) {
        newErrors.gb_per_day = 'Please select GB per day'
        // setAlertMessage('', 'Please select GB per day')
        errormsg += '• Please select GB per day\n'
        valid_input = false
      }
    } else if (billingType === 'avg_eps') {
      if (!eps) {
        newErrors.eps = 'Please enter Average EPS'
        // setAlertMessage('', 'Please enter EPS')
        errormsg += '• Please enter Average EPS\n'
        valid_input = false
      }
    } else if (billingType === '95th_%_eps') {
      if (!epsPercent) {
        newErrors.epspercent = 'Please enter 95th % EPS'
        // setAlertMessage('', 'Please enter 95th % EPS')
        errormsg += '• Please enter 95th % EPS\n'
        valid_input = false
      }
    }

    setAlertMessage('', errormsg)
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
    // return valid_input
  }

  const handleConfirmSubmit = () => {
    // let a = validateForm()
    let valid_input = validateInput()

    if (valid_input === false) {
      return
    } else {
      setAlertVisible(false)
    }
    const isConfirmed = window.confirm('Are you sure you want to submit?')

    if (isConfirmed) {
      onSubmit()
    } else {
      alert('Submission canceled.')
    }
  }

  const getFieldClass = (fieldName) => {
    return errors[fieldName] ? 'input-error' : ''
  }

  return (
    <CModal scrollable visible={isOpen} size="xl" onClose={onClose1}>
      <CAlert
        color={alertProps['color']}
        dismissible
        fade
        visible={alertVisible}
        onClose={() => setAlertVisible(false)}
      >
        {/* {alertProps['message']} */}
        {alertProps.message.split('\n').map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </CAlert>
      <div>{loading && <div className="loading">Submitting...</div>}</div>
      <CModalHeader onClose={onClose}>
        <CModalTitle>
          {/* <h2
            className="alert alert-warning"
            style={{ backgroundColor: '#1F3651', color: 'white' }}
          >
            Generate License for SNYPR
          </h2> */}
        </CModalTitle>
      </CModalHeader>
      <CTabContent>
        <CTabPane role="tabpanel" aria-labelledby="job-details" visible={activeKey === 0}>
          {'a' !== '' ? (
            <>
              <CModalBody style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                {/* <CModalTitle>Please fill the below details:</CModalTitle> */}
                <CContainer style={{ paddingTop: 0, marginTop: 0 }}>
                  <CRow>
                    <CCol>
                      <div>
                        <div>
                          <div className="container-fluid">
                            {/* <h2 className="alert alert-warning">Generate License</h2> */}
                            <h2
                              className="alert alert-warning"
                              style={{ backgroundColor: '#1F3651', color: 'white' }}
                            >
                              {heading}
                            </h2>
                            <strong style={{ color: 'red' }} hidden={title === 'renew_license'}>
                              {'Note: Please generate license specifically for new tenants.'}
                              <br></br>
                              <br></br>
                            </strong>
                            <div className="background-image">
                              <form
                                className="myForm"
                                method="get"
                                encType="application/x-www-form-urlencoded"
                                action="/html/codes/html_form_handler.cfm"
                              >
                                <p className='mb-4'>
                                  <label title="Please enter jira ticket or comments">
                                    Jira Ticket:
                                    <input
                                      className={getFieldClass('jiraticket')}
                                      type="text"
                                      name="jiraticket"
                                      value={jiraTicket}
                                      placeholder="https://securonix.atlassian..."
                                      disabled={isSubmitted}
                                      onChange={(e) => setjiraTicket(e.target.value)}
                                      required
                                    ></input>
                                  </label>
                                </p>

                                <p className='mb-4'>
                                  <label title="Cluster: Allowed characters are '-', alphabets and digits">
                                    Cluster:
                                    <input
                                      className={getFieldClass('cluster')}
                                      type="text"
                                      name="cluster"
                                      value={cluster}
                                      disabled={isSubmitted || title === 'renew_license'}
                                      onChange={(e) => setCluster(e.target.value)}
                                      required
                                    ></input>
                                  </label>
                                </p>

                                <p className='mb-4'>
                                  <label title="Tenant Id: Allowed characters are alphabets and digits">
                                    Tenant Id:
                                    <input
                                      className={getFieldClass('tenantid')}
                                      type="tel"
                                      name="tenantid"
                                      value={tenantid}
                                      disabled={isSubmitted || title === 'renew_license'}
                                      onChange={(e) => setTenantId(e.target.value)}
                                    ></input>
                                  </label>
                                </p>

                                <p className='mb-4'>
                                  <label>
                                    Tenant Name:
                                    <input
                                      type="tel"
                                      name="tenantname"
                                      value={tenantname}
                                      disabled={isSubmitted || title === 'renew_license'}
                                      onChange={(e) => setTenantName(e.target.value)}
                                    ></input>
                                  </label>
                                </p>

                                <p className='mb-4'>
                                  <label>
                                    License Start Date (UTC):
                                    <input
                                      className={getFieldClass('startdate')}
                                      type="date"
                                      name="startdate"
                                      disabled={isSubmitted}
                                      value={startDate}
                                      onChange={(e) => handleStartDateChange(e.target.value)}
                                    ></input>
                                  </label>
                                </p>

                                <p className='mb-4'>
                                  <label title="Note: Does not include grace period">
                                    License Expiry Date (UTC):
                                    <input
                                      className={getFieldClass('enddate')}
                                      type="date"
                                      name="enddate"
                                      disabled={isSubmitted}
                                      // style={{ color: 'black', backgroundColor: 'lightgray' }}
                                      value={endDate}
                                      onChange={(e) => handleEndDateChange(e.target.value)}
                                    ></input>
                                  </label>
                                </p>

                                <p className='mb-4'>
                                  <label>
                                    Validity:
                                    <input
                                      type="text"
                                      name="validity"
                                      // value={`${validity}-days`}
                                      value={validity}
                                      disabled={true}
                                      style={{ color: 'black', backgroundColor: 'lightgray' }}
                                    ></input>
                                  </label>
                                </p>

                                {/* <p className='mb-4'>
                                  <label>
                                    Validity:
                                    <select
                                      id="validity"
                                      value={validity}
                                      disabled={true}
                                      style={{ color: 'black', backgroundColor: 'lightgray' }}
                                      required
                                      className="custom-select"
                                      onChange={(e) => handleChangeValidity(e.target.value)}
                                    >
                                      <option value="30-days">30-days</option>
                                      <option value="180-days">180-days</option>
                                      <option value="365-days">365-days</option>
                                    </select>
                                  </label>
                                </p> */}

                                <p className='mb-4'>
                                  <label>
                                    Select Grace Period:
                                    <select
                                      id="grace_period"
                                      value={gracePeriod}
                                      disabled={isSubmitted}
                                      required
                                      className="custom-select"
                                      onChange={(e) => setgracePeriod(e.target.value)}
                                    >
                                      <option value=""></option>
                                      <option value="10-days">10-days</option>
                                      <option value="20-days">20-days</option>
                                      <option value="30-days">30-days</option>
                                      <option value="60-days">60-days</option>
                                    </select>
                                  </label>
                                </p>

                                <p className='mb-4'>
                                  <label title="Licensed Users: Allowed Range is 0 - 1000000">
                                    Licensed Users
                                    <input
                                      className={getFieldClass('licensedusers')}
                                      type="text"
                                      name="licensedusers"
                                      value={licensedUsers}
                                      disabled={isSubmitted}
                                      onChange={(e) => setlicensedUsers(e.target.value)}
                                      required
                                    ></input>
                                  </label>
                                </p>

                                <p className='mb-4'>
                                  <label>
                                    Licensed Resources
                                    <input
                                      type="text"
                                      name="licensed_resources"
                                      value={licensedResources}
                                      disabled={isSubmitted || true}
                                      style={{ color: 'black', backgroundColor: 'lightgray' }}
                                      onChange={(e) => setlicensedResources(e.target.value)}
                                      required
                                    ></input>
                                  </label>
                                </p>

                                <p className='mb-4'>
                                  <label>
                                    Holder
                                    <input
                                      type="text"
                                      name="holder"
                                      value={holder}
                                      disabled={isSubmitted}
                                      onChange={(e) => setHolder(e.target.value)}
                                      required
                                    ></input>
                                  </label>
                                </p>

                                <p className='mb-4'>
                                  <label>
                                    Expiry Action:
                                    <select
                                      id="expiry_action"
                                      value={expiryAction}
                                      disabled={isSubmitted}
                                      onChange={(e) => setexpiryAction(e.target.value)}
                                      required
                                      className="custom-select"
                                    >
                                      <option value="warn">WARN</option>
                                      {/* <option value="standard">Standard</option> */}
                                    </select>
                                  </label>
                                </p>

                                <p className='mb-4'>
                                  <label>
                                    License Type:
                                    <select
                                      id="license_type"
                                      value={licenseType}
                                      disabled={isSubmitted}
                                      onChange={(e) => setlicenseType(e.target.value)}
                                      required
                                      className="custom-select"
                                    >
                                      {['mssp', 'enterprise'].includes(licenseType) && (
                                        <>
                                          <option value="mssp">MSSP</option>
                                          <option value="enterprise">Enterprise</option>
                                        </>
                                      )}
                                      {!['enterprise', 'mssp'].includes(licenseType) && (
                                        <>
                                          <option value={licenseType}>{licenseType}</option>
                                          <option value="mssp">MSSP</option>
                                          <option value="enterprise">Enterprise</option>
                                        </>
                                      )}
                                    </select>
                                  </label>
                                </p>

                                <p className='mb-4'>
                                  <label>
                                    Consumer Type:
                                    <select
                                      id="consumer_type"
                                      value={consumerType}
                                      disabled={isSubmitted}
                                      onChange={(e) => setconsumerType(e.target.value)}
                                      required
                                      className="custom-select"
                                    >
                                      <option value="user">User</option>
                                      {/* <option value="standard">Standard</option> */}
                                    </select>
                                  </label>
                                </p>

                                <p className='mb-4'>
                                  <label>
                                    Consumer Amount:
                                    <input
                                      type="text"
                                      name="consumer_amount"
                                      value={consumerAmount}
                                      disabled={isSubmitted}
                                      onChange={(e) => setconsumerAmount(e.target.value)}
                                      required
                                    ></input>
                                  </label>
                                </p>

                                <p className='mb-4'>
                                  <label>
                                    Warn Period:
                                    <select
                                      id="warn_period"
                                      value={warnPeriod}
                                      disabled={isSubmitted}
                                      required
                                      className="custom-select"
                                      onChange={(e) => setwarnPeriod(e.target.value)}
                                    >
                                      <option value="60-days">60-days</option>
                                      <option value="30-days">30-days</option>
                                      <option value="90-days">90-days</option>
                                      {/* <option value="40-days">40-days</option> */}
                                    </select>
                                  </label>
                                </p>

                                <p className='mb-4'>
                                  <label>
                                    Lifecycle Status:
                                    <select
                                      id="lifecycle_status"
                                      value={lifecycleStatus}
                                      disabled={isSubmitted}
                                      onChange={(e) => setlifecycleStatus(e.target.value)}
                                      required
                                      className="custom-select"
                                    >
                                      <option value="noworries">No Worries</option>
                                      {/* <option value="standard">Standard</option> */}
                                    </select>
                                  </label>
                                </p>

                                <p className='mb-4'>
                                  <label>
                                    Issuer:
                                    <input
                                      type="text"
                                      name="issuer"
                                      value={issuer}
                                      disabled={isSubmitted}
                                      onChange={(e) => setIssuer(e.target.value)}
                                      required
                                    ></input>
                                  </label>
                                </p>

                                <p className='mb-4'>
                                  <label>
                                    Events Per Day:
                                    <input
                                      type="text"
                                      name="events_per_day"
                                      value={eventsPerDay}
                                      disabled={isSubmitted || true}
                                      style={{ color: 'black', backgroundColor: 'lightgray' }}
                                      onChange={(e) => seteventsPerDay(e.target.value)}
                                      required
                                    ></input>
                                  </label>
                                </p>

                                <p className='mb-4'>
                                  <label>
                                    Allocated Disk Space In Gb:
                                    <input
                                      type="text"
                                      name="disk_space"
                                      value={diskSpace}
                                      disabled={isSubmitted || true}
                                      style={{ color: 'black', backgroundColor: 'lightgray' }}
                                      onChange={(e) => setdiskSpace(e.target.value)}
                                      required
                                    ></input>
                                  </label>
                                </p>

                                <p className='mb-4'>
                                  <label>
                                    Name:
                                    <input
                                      type="text"
                                      name="name"
                                      value={name}
                                      disabled={isSubmitted}
                                      onChange={(e) => setName(e.target.value)}
                                      required
                                    ></input>
                                  </label>
                                </p>

                                <p className='mb-4'>
                                  <label>
                                    Policy Allowed Count:
                                    <input
                                      type="text"
                                      name="policy_allowed_count"
                                      value={policyAllowedCount}
                                      disabled={isSubmitted || true}
                                      style={{ color: 'black', backgroundColor: 'lightgray' }}
                                      onChange={(e) => setpolicyAllowedCount(e.target.value)}
                                      required
                                    ></input>
                                  </label>
                                </p>

                                <p className='mb-4'>
                                  <div className="form-group">
                                    <label title="Cold Storage: Allowed Range is 0 - 10 years">
                                      Cold Storage:
                                    </label>
                                    <div className="input-container">
                                      <input
                                        className={getFieldClass('cold_storage_years')}
                                        type="text"
                                        name="cold_storage_years"
                                        value={coldStorage}
                                        disabled={isSubmitted}
                                        onChange={(e) => setcoldStorage(e.target.value)}
                                        required
                                      ></input>
                                      <span className="unit">years</span>
                                      <input
                                        className={getFieldClass('cold_storage_days')}
                                        type="text"
                                        name="cold_storage_days"
                                        value={coldStorageDays}
                                        disabled={isSubmitted}
                                        onChange={(e) => setcoldStorageDays(e.target.value)}
                                        required
                                      ></input>
                                      <span className="unit">days</span>
                                    </div>
                                  </div>
                                </p>

                                <p className='mb-4'>
                                  <label>
                                    Billing Type:
                                    <select
                                      id="billing_type"
                                      value={billingType}
                                      disabled={isSubmitted}
                                      onChange={(e) => setbillingType(e.target.value)}
                                      required
                                      className="custom-select"
                                    >
                                      <option value="gb_per_day">GB Per Day</option>
                                      <option value="95th_%_eps">95th % EPS</option>
                                      <option value="avg_eps">Average EPS</option>
                                    </select>
                                  </label>
                                </p>

                                <p className='mb-4'>
                                  <label hidden={billingType !== 'gb_per_day'}>
                                    GB Per Day:
                                    <select
                                      id="gb_per_day"
                                      value={gbPerDay}
                                      disabled={isSubmitted}
                                      onChange={(e) => setgbPerDay(e.target.value)}
                                      required
                                      // className="custom-select"
                                      className={getFieldClass('gb_per_day')}
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
                                  {/* <label hidden={billingType === 'gb_per_day'}> */}
                                  <label hidden={billingType !== 'avg_eps'}>
                                    Average EPS:
                                    <input
                                      className={getFieldClass('eps')}
                                      type="text"
                                      name="eps"
                                      value={eps}
                                      disabled={isSubmitted}
                                      onChange={(e) => seteps(e.target.value)}
                                      required
                                    ></input>
                                  </label>
                                </p>

                                <p className='mb-4'>
                                  <label hidden={billingType !== '95th_%_eps'}>
                                    95th % EPS:
                                    <input
                                      className={getFieldClass('epspercent')}
                                      type="text"
                                      name="epspercent"
                                      value={epsPercent}
                                      disabled={isSubmitted}
                                      onChange={(e) => setepsPercent(e.target.value)}
                                      required
                                    ></input>
                                  </label>
                                </p>

                                <p className='mb-4'>
                                  <label>
                                    Select Plan:
                                    <select
                                      id="plan"
                                      value={plan}
                                      disabled={isSubmitted}
                                      onChange={(e) => handleChangePlan(e.target.value)}
                                      required
                                      className="custom-select"
                                    >
                                      {licenseType === 'enterprise' && (
                                        <>
                                          <option value="basic">Basic</option>
                                          <option value="standard">Standard</option>
                                          <option value="advanced">Advanced</option>
                                          <option value="ela">ELA</option>
                                          <option value="ueba_only">UEBA Only</option>
                                          <option value="allin">All In</option>
                                        </>
                                      )}
                                      {licenseType === 'mssp' && (
                                        <>
                                          <option value="basic">Basic</option>
                                          <option value="standard">Standard</option>
                                          <option value="advanced">Advanced</option>
                                        </>
                                      )}
                                      {!['enterprise', 'mssp'].includes(licenseType) && (
                                        <>
                                          <option value="basic">Basic</option>
                                          <option value="standard">Standard</option>
                                          <option value="advanced">Advanced</option>
                                          <option value="ela">ELA</option>
                                          <option value="ueba_only">UEBA Only</option>
                                          <option value="allin">All In</option>
                                        </>
                                      )}
                                    </select>
                                  </label>
                                </p>
                              </form>
                            </div>

                            <div className="vertical-gap"></div>

                            <table key={plan} className="custom-table text-xs" readOnly={isSubmitted}>
                              <thead>
                                <tr>
                                  <th className="custom-th">Category</th>
                                  <th className="custom-th">Feature Name</th>
                                  <th className="custom-th">Value</th>
                                </tr>
                              </thead>
                              <tbody>
                                {plan &&
                                  data[plan] &&
                                  Object.keys(data[plan]).map((subcategory, subcategoryIndex) => (
                                    <React.Fragment key={`${subcategoryIndex}`}>
                                      <td
                                        className="custom-td"
                                        rowSpan={Object.keys(data[plan][subcategory]).length + 1}
                                      >
                                        {Object.keys(data[plan])[subcategoryIndex]}
                                      </td>
                                      {Object.keys(data[plan][subcategory]).map(
                                        (subsubcategory, subsubcategoryIndex) => (
                                          <React.Fragment
                                            key={`${subcategoryIndex}-${subsubcategory}`}
                                          >
                                            <tr key={`${subcategoryIndex}-${subsubcategory}`}>
                                              <td className="custom-td">{subsubcategory}</td>
                                              <td className="custom-td">
                                                <select
                                                  className="custom-dropdown"
                                                  disabled={
                                                    isSubmitted ||
                                                    (disable_plan_config[plan] &&
                                                      disable_plan_config[plan][subcategory] &&
                                                      disable_plan_config[plan][subcategory][
                                                        subsubcategory
                                                      ] === 'disable')
                                                  }
                                                  style={{
                                                    color: 'black',
                                                    backgroundColor:
                                                      disable_plan_config[plan] &&
                                                      disable_plan_config[plan][subcategory] &&
                                                      disable_plan_config[plan][subcategory][
                                                        subsubcategory
                                                      ] === 'disable'
                                                        ? 'lightgray'
                                                        : 'white',
                                                  }}
                                                  onChange={(e) =>
                                                    handleSelectValueChange(
                                                      subsubcategory,
                                                      e.target.value,
                                                    )
                                                  }
                                                >
                                                  {data[plan][subcategory][subsubcategory].map(
                                                    (value, index) => (
                                                      <option key={index} value={value}>
                                                        {value}
                                                      </option>
                                                    ),
                                                  )}
                                                </select>
                                              </td>
                                            </tr>
                                          </React.Fragment>
                                        ),
                                      )}
                                    </React.Fragment>
                                  ))}
                              </tbody>
                            </table>
                            <br></br>
                            <div className="d-flex justify-content-end">
                              <CButton
                                className="mx-2"
                                color="primary"
                                disabled={isSubmitted}
                                onClick={handleConfirmSubmit}
                              >
                                Submit
                              </CButton>
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
  )
}

export default GenerateModal

GenerateModal.defaultProps = {
  title: '',
  body: '',
}

GenerateModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  rowdata_cluster: PropTypes.string,
  rowdata_tenantid: PropTypes.string,
  rowdata_plan: PropTypes.string,
  rowdata_features: PropTypes.object,
  selectedRow: PropTypes.object,
  body: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  onConfirmGenerateLicense: PropTypes.func.isRequired,
}
