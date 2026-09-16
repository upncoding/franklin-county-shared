// =====================================================
// FRANKLIN COUNTY — STATIC COUNTY-WIDE NAV DATA
// These are the same across all Franklin County sites.
// =====================================================

export interface NavItem {
    label: string;
    url: string;
    subItems?: NavItem[];
}

// ─── County.gov Top-Level Sections ───────────────────

export const departmentsItems: NavItem[] = [
    // Administrative
    { label: 'Board of Elections', url: 'https://www.franklincountyny.gov/departments/administrative/board_of_elections/index.php' },
    { label: 'Board of Ethics', url: 'https://www.franklincountyny.gov/departments/administrative/board_of_ethics/index.php' },
    { label: 'Board of Legislature', url: 'https://www.franklincountyny.gov/departments/administrative/board_of_legislators/index.php' },
    { label: 'County Clerk', url: 'https://www.franklincountyny.gov/departments/administrative/county_clerk/index.php' },
    { label: 'County Manager', url: 'https://www.franklincountyny.gov/departments/administrative/county_manager/index.php' },
    { label: 'County Planning', url: 'https://www.franklincountyny.gov/departments/administrative/county_planner.php' },
    { label: 'Data Processing & Information Services', url: 'https://www.franklincountyny.gov/departments/administrative/data_processing___information_services/index.php' },
    { label: 'Department of Motor Vehicles', url: 'https://www.franklincountyny.gov/departments/administrative/county_clerk/services/department_of_motor_vehicles.php' },
    { label: 'Personnel/Self-Insurance Office', url: 'https://www.franklincountyny.gov/departments/administrative/personnel_self-insurance_office/index.php' },
    { label: 'Records Management Department', url: 'https://www.franklincountyny.gov/departments/administrative/records_management_department/index.php' },
    // Finance
    { label: 'Auditor', url: 'https://www.franklincountyny.gov/departments/finance/auditor/index.php' },
    { label: 'Real Property Tax Services', url: 'https://www.franklincountyny.gov/departments/finance/real_property_tax_services/index.php' },
    { label: 'Treasurer', url: 'https://www.franklincountyny.gov/departments/finance/treasurer/index.php' },
    // Human Services
    { label: 'Community Services', url: '/' },
    { label: 'Office for the Aging', url: 'https://www.franklincountyny.gov/departments/human_services/office_for_the_aging/index.php' },
    { label: 'Public Health', url: 'https://www.franklincountyny.gov/departments/human_services/public_health/index.php' },
    { label: 'Social Services', url: 'https://www.franklincountyny.gov/departments/human_services/social_services/index.php' },
    { label: 'Veterans Services Agency', url: 'https://www.franklincountyny.gov/departments/human_services/veterans_services_agency/index.php' },
    { label: 'Youth Bureau', url: 'https://www.franklincountyny.gov/departments/human_services/youth_bureau/index.php' },
    // Business
    { label: 'Economic Development', url: 'https://www.franklincountyny.gov/business/economic_development.php' },
    // Public Safety
    { label: "District Attorney's Office", url: 'https://www.franklincountyny.gov/departments/public_safety/district_attorney_s_office/index.php' },
    { label: 'Emergency Services', url: 'https://www.franklincountyny.gov/departments/public_safety/emergency_services/911_number_addressing.php' },
    { label: 'Probation', url: 'https://www.franklincountyny.gov/departments/public_safety/probation/index.php' },
    { label: 'Public Defender', url: 'https://www.franklincountyny.gov/departments/public_safety/public_defender/index.php' },
    { label: "Sheriff's Department", url: 'https://www.franklincountyny.gov/departments/public_safety/sheriff_s_department/index.php' },
    { label: 'Soil and Water', url: 'https://www.franklincountyny.gov/departments/public_safety/soil_and_water/index.php' },
    { label: 'Stop DWI', url: 'https://www.franklincountyny.gov/departments/public_safety/stop_dwi/index.php' },
    { label: 'Traffic Safety Board', url: 'https://www.franklincountyny.gov/departments/public_safety/traffic_safety_board/index.php' },
    // Public Works & Services
    { label: 'Buildings & Grounds', url: 'https://www.franklincountyny.gov/departments/buildings___grounds/index.php' },
    { label: 'Highway Department', url: 'https://www.franklincountyny.gov/departments/highway_department/index.php' },
    { label: 'Transportation', url: 'https://www.franklincountyny.gov/departments/transportation/index.php' },
    { label: 'Weights and Measures & County Sealer', url: 'https://www.franklincountyny.gov/departments/weights_and_measures___county_sealer/index.php' },
];

export const residentsItems: NavItem[] = [
    { label: 'Community Groups', url: 'https://www.franklincountyny.gov/residents/community_groups.php' },
    { label: 'Public Health Services', url: 'https://www.franklincountyny.gov/departments/human_services/public_health/services.php' },
    { label: 'Social Services', url: 'https://www.franklincountyny.gov/departments/human_services/social_services/services.php' },
    { label: 'Forms and Documents', url: 'https://www.franklincountyny.gov/residents/forms_and_documents.php' },
    { label: 'Public Transportation', url: 'https://www.franklincountyny.gov/departments/transportation/public_transportation/' },
    { label: 'COVID-19 Guidance', url: 'https://www.franklincountyny.gov/residents/covid-19_guidance/index.php' },
];

export const visitorsItems: NavItem[] = [
    { label: 'Adirondack Mountain Club', url: 'https://www.adk.org/' },
    { label: 'Adirondack Scenic Byways', url: 'http://www.adirondackvic.org/' },
    { label: 'Adirondack Park Visitor Interpretive Centers', url: 'https://visitadirondacks.com/what-to-do/scenic-byways' },
    { label: 'Explore Adirondack Frontier', url: 'https://www.exploreadirondackfrontier.com/' },
    { label: 'History', url: 'https://www.franklincountyny.gov/visitors/history.php' },
    { label: 'Visit Adirondacks', url: 'http://visitadirondacks.com/' },
    { label: 'Visit Malone', url: 'https://www.visitmalone.com/' },
    { label: 'Visit Saranac Lake', url: 'https://www.saranaclake.com/' },
    { label: 'Visit Tupper Lake', url: 'https://www.tupperlake.com/' },
    { label: 'Weather', url: 'https://www.franklincountyny.gov/visitors/weather.php' },
];

export const businessItems: NavItem[] = [
    { label: 'Economic Development', url: 'https://www.franklincountyny.gov/business/economic_development.php' },
    { label: 'Purchasing/Bids', url: 'https://www.franklincountyny.gov/business/purchasing_bids.php' },
    { label: 'Malone Chamber of Commerce', url: 'http://visitmalone.com/' },
    { label: 'Saranac Lake Chamber of Commerce', url: 'http://www.slareachamber.org/' },
    { label: 'Tupper Lake Chamber of Commerce', url: 'https://www.tupperlake.com/discover-my-tupper-lake' },
];

export const communitiesItems: NavItem[] = [
    { label: 'Akwesasne', url: 'https://www.srmt-nsn.gov/' },
    { label: 'Bangor', url: 'https://www.franklincountyny.gov/our_communities/bangor.php' },
    { label: 'Bellmont', url: 'https://www.townofbellmontny.org/' },
    { label: 'Bombay', url: 'http://www.bombayny.us/' },
    { label: 'Brainardsville', url: 'https://www.franklincountyny.gov/our_communities/brainardsville.php' },
    { label: 'Brandon', url: 'https://www.franklincountyny.gov/our_communities/brandon.php' },
    { label: 'Brighton', url: 'http://www.townofbrighton.net/' },
    { label: 'Brushton', url: 'https://www.franklincountyny.gov/our_communities/brushton.php' },
    { label: 'Burke', url: 'https://www.franklincountyny.gov/our_communities/burke.php' },
    { label: 'Chateaugay', url: 'https://www.chateaugayny.org/' },
    { label: 'Constable', url: 'https://www.townofconstable.com/' },
    { label: 'Dickinson', url: 'https://www.franklincountyny.gov/our_communities/dickinson.php' },
    { label: 'Duane', url: 'https://www.franklincountyny.gov/our_communities/duane.php' },
    { label: 'Franklin', url: 'https://www.townoffranklin.com/' },
    { label: 'Fort Covington', url: 'https://www.franklincountyny.gov/our_communities/fort_covington.php' },
    { label: 'Harrietstown', url: 'https://www.harrietstown.org/' },
    { label: 'Malone', url: 'https://www.malonetown.com/' },
    { label: 'Moira', url: 'https://www.franklincountyny.gov/our_communities/moira.php' },
    { label: 'Santa Clara', url: 'https://www.townofsantaclara.com/' },
    { label: 'Saranac Lake', url: 'http://www.saranaclakeny.gov/' },
    { label: 'Tupper Lake', url: 'https://www.tupperlake.com/' },
    { label: 'Waverly', url: 'https://www.franklincountyny.gov/our_communities/waverly.php' },
    { label: 'Westville', url: 'https://www.townofwestvilleny.org/' },
];

export const howDoIItems: NavItem[] = [
    {
        label: 'Apply For/Obtain',
        url: 'https://www.franklincountyny.gov/how_do_i/apply_for_obtain/index.php',
        subItems: [
            { label: 'Civil Service Exams', url: 'https://www.franklincountyny.gov/departments/administrative/personnel_self-insurance_office/exam_announcements.php' },
            { label: "District Attorney's Traffic Diversion/Plea Reduction Program", url: 'https://www.franklincountyny.gov/departments/public_safety/district_attorney_s_office/services/traffic_diversion___plea_reduction_program.php' },
            { label: 'Freedom Of Information Law (FOIL Requests)', url: 'https://www.franklincountyny.gov/departments/finance/freedom_of_information_law_(foil_requests).php' },
            { label: 'HEAP', url: 'https://www.franklincountyny.gov/departments/human_services/social_services/services.php' },
            { label: 'Job Openings', url: 'https://www.franklincountyny.gov/departments/administrative/personnel_self-insurance_office/employment_opportunities.php' },
            { label: 'Pistol Permits', url: 'https://www.franklincountyny.gov/departments/administrative/county_clerk/services/pistol_permits.php' },
            { label: 'Public Defender', url: 'https://www.franklincountyny.gov/departments/public_safety/public_defender/index.php' },
            { label: 'Public Health Training', url: 'https://www.franklincountyny.gov/how_do_i/apply_for_obtain/public_health_training.php' },
            { label: "Renew my Driver's License", url: 'https://www.franklincountyny.gov/how_do_i/apply_for_obtain/renew_my_driver_s_license.php' },
            { label: 'Running for Office', url: 'http://www.elections.ny.gov/RunningOffice.html' },
            { label: 'United States Passports', url: 'https://www.franklincountyny.gov/departments/administrative/county_clerk/services/united_states_passports.php' },
        ]
    },
    {
        label: 'Contact Us',
        url: 'https://www.franklincountyny.gov/how_do_i/new_page/index.php',
        subItems: [
            { label: 'Citizen Request Form', url: 'https://www.franklincountyny.gov/citizen_request_form/index.php' },
            { label: 'Staff Directory', url: 'https://www.franklincountyny.gov/how_do_i/new_page/contact_us/index.php' },
            { label: 'Poison Control', url: 'https://www.franklincountyny.gov/how_do_i/new_page/poison_control.php' },
        ]
    },
    {
        label: 'File/Request/Register',
        url: 'https://www.franklincountyny.gov/how_do_i/file_request_register/index.php',
        subItems: [
            { label: 'Vote', url: 'https://www.franklincountyny.gov/departments/administrative/board_of_elections/index.php' },
            { label: 'Whistleblower Report', url: 'https://www.franklincountyny.gov/how_do_i/file_request_register/whistleblower_report.php' },
        ]
    },
    {
        label: 'Find/Learn About',
        url: 'https://www.franklincountyny.gov/how_do_i/find_learn_about/index.php',
        subItems: [
            { label: 'County Landfill', url: 'http://www.cfswma.com/' },
            { label: 'Fair Housing Program', url: 'https://www.franklincountyny.gov/departments/administrative/county_manager/fair_housing_program.php' },
        ]
    },
    {
        label: 'Read/View',
        url: 'https://www.franklincountyny.gov/how_do_i/read_view/index.php',
        subItems: [
            { label: 'Criminal Court Reports', url: 'https://www.franklincountyny.gov/departments/public_safety/probation/criminal_court_reports.php' },
            { label: 'Final Assessment Roll', url: 'https://www.franklincountyny.gov/departments/finance/real_property_tax_services/index.php#outer-146' },
            { label: 'Forms and Documents', url: 'https://www.franklincountyny.gov/residents/forms_and_documents.php' },
            { label: 'Job Descriptions', url: 'https://www.franklincountyny.gov/departments/administrative/personnel_self-insurance_office/index.php#outer-114' },
            { label: 'School Tax Roll', url: 'https://www.franklincountyny.gov/departments/finance/real_property_tax_services/index.php#outer-147' },
            { label: 'Tentative Assessment Roll', url: 'https://www.franklincountyny.gov/departments/finance/real_property_tax_services/index.php#outer-144' },
            { label: 'Town & County Tax Roll', url: 'https://www.franklincountyny.gov/departments/finance/real_property_tax_services/index.php#outer-143' },
            { label: 'Village Tax Roll', url: 'https://www.franklincountyny.gov/departments/finance/real_property_tax_services/index.php#outer-145' },
        ]
    },
];
