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
import { CSmartTable } from '@coreui/react-pro'

const GenerateModal = ({
  isOpen,
  onClose,
  title = '',
  listSelectedRow,
  body = '',
  onConfirmLicenseStatusChange,
}) => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [alertVisible, setAlertVisible] = useState(false)
  const [alertProps, setAlertProps] = useState({
    message: 'none',
    stat: 'success',
    color: 'success',
  })

  const [listData, setlistData] = useState([])
  const [lengthSelectedRow, setlengthSelectedRow] = useState('0')
  const [heading, setHeading] = useState('')
  const [operation, setOperation] = useState('')
  const [jiraTicket, setjiraTicket] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (listSelectedRow) {
      if (title === 'disable_license') {
        setOperation('disable')
        setHeading('Disable License')
      } else {
        setOperation('enable')
        setHeading('Enable License')
      }

      setlistData(listSelectedRow)
      setlengthSelectedRow(listSelectedRow.length)
    }
  }, [title, listSelectedRow])

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

  function create_payload() {
    const dict = {}
    listData.forEach((item) => {
      if (dict[item['Cluster']]) {
        dict[item['Cluster']].push(item['Tenant ID'])
      } else {
        dict[item['Cluster']] = [item['Tenant ID']]
      }
    })
    let payload = {
      app_key: 'b0l2ndgk_8EhVZB57aTPfj83NP9YTVP8yBH4AkxSg',
      useremail: localStorage.getItem('email'),
      operation: title,
      tenant_details: dict,
      jira_ticket: jiraTicket,
    }
    return payload
  }

  async function onSubmit() {
    let payload = await create_payload()
    console.log('PAYLOAD', payload)
    if (!jiraTicket) {
      setAlertMessage('', 'Please enter Jira Ticket')
    } else {
      setLoading(true)
      let response = await onConfirmLicenseStatusChange(payload, operation)
      setLoading(false)
      onClose()
    }
  }

  const onSubmit1 = async () => {
    console.log('DATA', listData)
    const payload = await create_payload()
    console.log('PAYLOAD', payload)
    let message = ''
    message = 'Generate license operation was successful.'
    let response = { status: 200 }
    setAlertMessage(response, message)
    setIsSubmitted(true)
  }

  function onClose1() {
    setAlertVisible(false)
    setIsSubmitted(false)
    setjiraTicket('')
    sessionStorage.clear()
    onClose('')
  }

  const handleConfirmSubmit = () => {
    const isConfirmed = window.confirm('Are you sure you want to submit?')

    if (isConfirmed) {
      onSubmit()
    } else {
      alert('Submission canceled.')
    }
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
        {alertProps['message']}
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
                              {'Are you sure you want to '} {operation}{' '}
                              {'license for below tenants?'}
                              <br></br>
                              <br></br>
                              {'Number of selected tenants : '} {lengthSelectedRow}
                              <br></br>
                              <br></br>
                            </strong>

                            <div className="forms-container">
                              <form
                                className="myForm_confirm"
                                method="get"
                                encType="application/x-www-form-urlencoded"
                                action="/html/codes/html_form_handler.cfm"
                              >
                                <p>
                                  <label>
                                    Jira Ticket :
                                    <input
                                      type="text"
                                      name="jira_ticket"
                                      value={jiraTicket}
                                      disabled={isSubmitted}
                                      placeholder="https://securonix.atlassian..."
                                      onChange={(e) => setjiraTicket(e.target.value)}
                                      required
                                    ></input>
                                  </label>
                                </p>
                              </form>
                            </div>

                            <table className="custom_confirm-table">
                              <thead>
                                <tr>
                                  <th className="custom_confirm-th">Cluster</th>
                                  <th className="custom_confirm-th">Tenant Id</th>
                                  <th className="custom_confirm-th">Tenant Name</th>
                                </tr>
                              </thead>
                              <tbody>
                                {listData &&
                                  listData.map((item, index) => (
                                    <tr key={index}>
                                      {/* Render each cell with the corresponding data */}
                                      <td>{item['Cluster']}</td>
                                      <td>{item['Tenant ID']}</td>
                                      <td>{item['Tenant Name']}</td>
                                    </tr>
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
  listSelectedRow: PropTypes.object,
  body: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  onConfirmLicenseStatusChange: PropTypes.func.isRequired,
}
