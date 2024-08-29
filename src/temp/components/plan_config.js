const default_90_days = []
const default_365_days = []
const default_blank_days = ['']

for (let i = 0; i <= 365; i++) {
  default_90_days.push(`${i}-day${i != 1 ? 's' : ''}`)
}

const index = default_90_days.indexOf('90-days')
if (index !== -1) {
  default_90_days.splice(index, 1)
}
default_90_days.unshift('90-days')

for (let i = 0; i <= 365; i++) {
  default_365_days.push(`${i}-day${i != 1 ? 's' : ''}`)
}

const index1 = default_365_days.indexOf('365-days')
if (index1 !== -1) {
  default_365_days.splice(index1, 1)
}
default_365_days.unshift('365-days')

for (let i = 0; i <= 365; i++) {
  default_blank_days.push(`${i}-day${i != 1 ? 's' : ''}`)
}

export const plan_config = {
  basic: {
    'Ingestion, Storage and Enrichment': {
      'Data Storage with Snowflake Data Lake': default_90_days,
      'Data enrichment: Threat Intelligence, Geolocation, Identity': ['Yes', 'No'],
      'Premium Data enrichment: IP attribution': ['No', 'Yes'],
    },
    Analytics: {
      'Basic Analytics - IEE and AEE': ['Yes', 'No'],
      'Standard Behavioral Analytics': ['No', 'Yes'],
      'Advanced Behavioral Analytics': ['No', 'Yes'],
    },
    'Threat Models': {
      'Basic Threat Modeling: Map policies to attack chain': ['No', 'Yes'],
      'Advanced Threat Modeling: Behavioral profiling of threats': ['No', 'Yes'],
    },
    'Search Capacity': {
      'Monthly search capacity included with the package': ['', '10x', '20x', '50x'],
    },
    'Platform Add-ons': {
      'Investigate: Integrate internal and external data in investigation process': [
        '',
        'No',
        'Yes',
      ],
      'SOAR: Security Orchestration and Automation and Response module': ['Lite', 'Full', 'No'],
      'ATS: Autonomous Threat Sweeper Service - threat assessment and response': ['', 'No', 'Yes'],
      'Content / Data Science Studio (Premium playbooks and usage are metered)': ['', 'No', 'Yes'],
      'Threat Coverage Analyzer: Security posture assessment': ['', 'No', 'Yes'],
      'NxLog Windows data collection': ['', 'No', 'Yes'],
      'Premium Disaster Recovery: Improved recovery and availability SLAs': ['', 'No', 'Yes'],
      'Data Services (Hydration, handover)': ['', 'No', 'Yes'],
      // 'Additional Hot or Cold storage': ['', 'No', 'Yes'],
      'Additional Hot storage': default_blank_days,
      'Additional Cold storage': default_blank_days,
      'Hosted (Cloud) Collectors': ['', 'No', 'Yes'],
    },
  },

  standard: {
    'Ingestion, Storage and Enrichment': {
      'Data Storage with Snowflake Data Lake': default_90_days,
      'Data enrichment: Threat Intelligence, Geolocation, Identity': ['Yes', 'No'],
      'Premium Data enrichment: IP attribution': ['Yes', 'No'],
    },
    Analytics: {
      'Basic Analytics - IEE and AEE': ['Yes', 'No'],
      'Standard Behavioral Analytics': ['Yes', 'No'],
      'Advanced Behavioral Analytics': ['No', 'Yes'],
    },
    'Threat Models': {
      'Basic Threat Modeling: Map policies to attack chain': ['Yes', 'No'],
      'Advanced Threat Modeling: Behavioral profiling of threats': ['No', 'Yes'],
    },
    'Search Capacity': {
      'Monthly search capacity included with the package': ['', '20x', '10x', '50x'],
    },
    'Platform Add-ons': {
      'Investigate: Integrate internal and external data in investigation process': [
        '',
        'No',
        'Yes',
      ],
      'SOAR: Security Orchestration and Automation and Response module': ['Lite', 'Full', 'No'],
      'ATS: Autonomous Threat Sweeper Service - threat assessment and response': ['', 'No', 'Yes'],
      'Content / Data Science Studio (Premium playbooks and usage are metered)': ['', 'No', 'Yes'],
      'Threat Coverage Analyzer: Security posture assessment': ['', 'Yes', 'No'],
      'NxLog Windows data collection': ['', 'No', 'Yes'],
      'Premium Disaster Recovery: Improved recovery and availability SLAs': ['', 'No', 'Yes'],
      'Data Services (Hydration, handover)': ['', 'No', 'Yes'],
      // 'Additional Hot or Cold storage': ['', 'No', 'Yes'],
      'Additional Hot storage': default_blank_days,
      'Additional Cold storage': default_blank_days,
      'Hosted (Cloud) Collectors': ['', 'No', 'Yes'],
    },
  },

  advanced: {
    'Ingestion, Storage and Enrichment': {
      'Data Storage with Snowflake Data Lake': default_365_days,
      'Data enrichment: Threat Intelligence, Geolocation, Identity': ['Yes', 'No'],
      'Premium Data enrichment: IP attribution': ['Yes', 'No'],
    },
    Analytics: {
      'Basic Analytics - IEE and AEE': ['Yes', 'No'],
      'Standard Behavioral Analytics': ['Yes', 'No'],
      'Advanced Behavioral Analytics': ['Yes', 'No'],
    },
    'Threat Models': {
      'Basic Threat Modeling: Map policies to attack chain': ['Yes', 'No'],
      'Advanced Threat Modeling: Behavioral profiling of threats': ['Yes', 'No'],
    },
    'Search Capacity': {
      'Monthly search capacity included with the package': ['', '50x', '10x', '20x'],
    },
    'Platform Add-ons': {
      'Investigate: Integrate internal and external data in investigation process': [
        '',
        'Yes',
        'No',
      ],
      'SOAR: Security Orchestration and Automation and Response module': ['Lite', 'Full', 'No'],
      'ATS: Autonomous Threat Sweeper Service - threat assessment and response': ['', 'Yes', 'No'],
      'Content / Data Science Studio (Premium playbooks and usage are metered)': ['', 'No', 'Yes'],
      'Threat Coverage Analyzer: Security posture assessment': ['', 'Yes', 'No'],
      'NxLog Windows data collection': ['', 'No', 'Yes'],
      'Premium Disaster Recovery: Improved recovery and availability SLAs': ['', 'No', 'Yes'],
      'Data Services (Hydration, handover)': ['', 'No', 'Yes'],
      'Additional Hot storage': default_blank_days,
      'Additional Cold storage': default_blank_days,
      // 'Additional Hot or Cold storage': ['', 'No', 'Yes'],
      'Hosted (Cloud) Collectors': ['', 'No', 'Yes'],
    },
  },

  ela: {
    'Ingestion, Storage and Enrichment': {
      'Data Storage with Snowflake Data Lake': default_365_days,
      'Data enrichment: Threat Intelligence, Geolocation, Identity': ['Yes', 'No'],
      'Premium Data enrichment: IP attribution': ['Yes', 'No'],
    },
    Analytics: {
      'Basic Analytics - IEE and AEE': ['Yes', 'No'],
      'Standard Behavioral Analytics': ['Yes', 'No'],
      'Advanced Behavioral Analytics': ['Yes', 'No'],
    },
    'Threat Models': {
      'Basic Threat Modeling: Map policies to attack chain': ['Yes', 'No'],
      'Advanced Threat Modeling: Behavioral profiling of threats': ['Yes', 'No'],
    },
    'Search Capacity': {
      'Monthly search capacity included with the package': ['', '50x', '10x', '20x'],
    },
    'Platform Add-ons': {
      'Investigate: Integrate internal and external data in investigation process': [
        'Yes',
        '',
        'No',
      ],
      'SOAR: Security Orchestration and Automation and Response module': ['Full', 'Lite', 'No'],
      'ATS: Autonomous Threat Sweeper Service - threat assessment and response': ['Yes', '', 'No'],
      'Content / Data Science Studio (Premium playbooks and usage are metered)': ['', 'Yes', 'No'],
      'Threat Coverage Analyzer: Security posture assessment': ['', 'Yes', 'No'],
      'NxLog Windows data collection': ['', 'No', 'Yes'],
      'Premium Disaster Recovery: Improved recovery and availability SLAs': ['', 'Yes', 'No'],
      'Data Services (Hydration, handover)': ['', 'No', 'Yes'],
      'Additional Hot storage': default_blank_days,
      'Additional Cold storage': default_blank_days,
      // 'Additional Hot or Cold storage': ['', 'No', 'Yes'],
      'Hosted (Cloud) Collectors': ['', 'Yes', 'No'],
    },
  },

  ueba_only: {
    'Ingestion, Storage and Enrichment': {
      'Data Storage with Snowflake Data Lake': default_365_days,
      'Data enrichment: Threat Intelligence, Geolocation, Identity': ['Yes', 'No'],
      'Premium Data enrichment: IP attribution': ['Yes', 'No'],
    },
    Analytics: {
      'Basic Analytics - IEE and AEE': ['Yes', 'No'],
      'Standard Behavioral Analytics': ['Yes', 'No'],
      'Advanced Behavioral Analytics': ['Yes', 'No'],
    },
    'Threat Models': {
      'Basic Threat Modeling: Map policies to attack chain': ['Yes', 'No'],
      'Advanced Threat Modeling: Behavioral profiling of threats': ['Yes', 'No'],
    },
    'Search Capacity': {
      'Monthly search capacity included with the package': ['', '50x', '10x', '20x'],
    },
    'Platform Add-ons': {
      'Investigate: Integrate internal and external data in investigation process': [
        '',
        'Yes',
        'No',
      ],
      'SOAR: Security Orchestration and Automation and Response module': ['Lite', 'Full', 'No'],
      'ATS: Autonomous Threat Sweeper Service - threat assessment and response': ['', 'Yes', 'No'],
      'Content / Data Science Studio (Premium playbooks and usage are metered)': ['', 'No', 'Yes'],
      'Threat Coverage Analyzer: Security posture assessment': ['', 'Yes', 'No'],
      'NxLog Windows data collection': ['', 'No', 'Yes'],
      'Premium Disaster Recovery: Improved recovery and availability SLAs': ['', 'No', 'Yes'],
      'Data Services (Hydration, handover)': ['', 'No', 'Yes'],
      'Additional Hot storage': default_blank_days,
      'Additional Cold storage': default_blank_days,
      // 'Additional Hot or Cold storage': ['', 'No', 'Yes'],
      'Hosted (Cloud) Collectors': ['', 'No', 'Yes'],
    },
  },

  allin: {
    'Ingestion, Storage and Enrichment': {
      'Data Storage with Snowflake Data Lake': default_365_days,
      'Data enrichment: Threat Intelligence, Geolocation, Identity': ['Yes', 'No'],
      'Premium Data enrichment: IP attribution': ['Yes', 'No'],
    },
    Analytics: {
      'Basic Analytics - IEE and AEE': ['Yes', 'No'],
      'Standard Behavioral Analytics': ['Yes', 'No'],
      'Advanced Behavioral Analytics': ['Yes', 'No'],
    },
    'Threat Models': {
      'Basic Threat Modeling: Map policies to attack chain': ['Yes', 'No'],
      'Advanced Threat Modeling: Behavioral profiling of threats': ['Yes', 'No'],
    },
    'Search Capacity': {
      'Monthly search capacity included with the package': ['', '50x', '10x', '20x'],
    },
    'Platform Add-ons': {
      'Investigate: Integrate internal and external data in investigation process': [
        'Yes',
        '',
        'No',
      ],
      'SOAR: Security Orchestration and Automation and Response module': ['Full', 'Lite', 'No'],
      'ATS: Autonomous Threat Sweeper Service - threat assessment and response': ['Yes', '', 'No'],
      'Content / Data Science Studio (Premium playbooks and usage are metered)': ['', 'No', 'Yes'],
      'Threat Coverage Analyzer: Security posture assessment': ['', 'Yes', 'No'],
      'NxLog Windows data collection': ['', 'No', 'Yes'],
      'Premium Disaster Recovery: Improved recovery and availability SLAs': ['', 'No', 'Yes'],
      'Data Services (Hydration, handover)': ['', 'No', 'Yes'],
      'Additional Hot storage': default_blank_days,
      'Additional Cold storage': default_blank_days,
      // 'Additional Hot or Cold storage': ['', 'No', 'Yes'],
      'Hosted (Cloud) Collectors': ['', 'No', 'Yes'],
    },
  },
}

export const config_gb_per_day = [
  '',
  '0-50',
  '50-100',
  '101-125',
  '126-150',
  '151-200',
  '201-250',
  '251-300',
  '301-400',
  '401-500',
  '501-625',
  '626-750',
  '751-1000',
  '1001-1250',
  '1251-1500',
  '1501-1750',
  '1701-2000',
]

export const disable_plan_config = {}
