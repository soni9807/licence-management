import axios from 'axios';
var config = require("../util/config.json")

export const getLicenseInfo = async (search = false, key = '') => {
    setShowSpinner(true);

    const baseURL = 'http://172.20.13.59:5004/get_snypr_license_audit';
    const tenant_list_api_url = search
        ? `${config.VM_OPERATIONS_URL}/list_tenants?search_key=${encodeURIComponent(key)}`
        : baseURL;

    try {
        const { data: tenantlist } = await axios.get(tenant_list_api_url);

        const initialStats = {
            total_tenants: 0,
            eps_count: 0,
            plan_basic: 0,
            plan_standard: 0,
            plan_advanced: 0,
            plan_ela: 0,
            plan_ueba: 0,
        };

        const filteredList = tenantlist.map(item => {
            initialStats.total_tenants += 1;
            if (item.eps) {
                initialStats.eps_count += parseInt(item.eps, 10);
            }
            switch (item.plan) {
                case 'basic':
                    initialStats.plan_basic += 1;
                    break;
                case 'standard':
                    initialStats.plan_standard += 1;
                    break;
                case 'advanced':
                    initialStats.plan_advanced += 1;
                    break;
                case 'ela':
                    initialStats.plan_ela += 1;
                    break;
                case 'ueba_only':
                    initialStats.plan_ueba += 1;
                    break;
                default:
                    break;
            }

            const timestamp = Date.now();

            return {
                Cluster: item.cluster,
                'Tenant ID': item.tenantid,
                'Tenant Name': item.tenantname,
                Status: item.status,
                Version: item.version,
                'Snypr Refreshed?': item.refresh_snypr,
                Plan: item.plan,
                Validity: item.validity,
                'Start Date UTC': item.start_date,
                'Expiry Date UTC': item.end_date,
                'Grace Period': item.grace_period,
                'Licensed Users': item.licensed_users,
                Features: item.features,
                'User Email': item.useremail,
                'Last Updated': msToTime(timestamp - parseInt(item.logtime, 10)),
                'Time UTC': item.timeutc,
                'Licensed Resources': item.licensed_resources,
                Holder: item.holder,
                'Expiry Action': item.expiry_action,
                'License Type': item.license_type,
                'Consumer Type': item.consumer_type,
                'Consumer Amount': item.consumer_amount,
                'Warn Period': item.warn_period,
                'Lifecycle Status': item.lifecycle_status,
                Issuer: item.issuer,
                'Events Per Day': item.events_per_day,
                'Allocated Disk Space (GB)': item.disk_space,
                Name: item.name,
                'Policy Allowed Count': item.policy_allowed_count,
                'Cold Storage': item.cold_storage,
                'Cold Storage Days': item.cold_storage_days,
                'Billing Type': item.billing_type,
                'GB Per Day': item.gb_per_day,
                EPS: item.eps,
                'EPS Percent': item.eps_percent,
                'Jira Ticket': item.jira_ticket,
                features_dict: item.features_dict,
            };
        });

        const result = {
            tenants: filteredList,
            ...initialStats,
        };
        return result;
    } catch (error) {
        console.error('Could not fetch tenant list:', error);
        return null;
    } finally {
        // setShowSpinner(false);
    }
};
