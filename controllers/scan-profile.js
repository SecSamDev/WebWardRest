const db = require('../db/index')

exports.createScanTemplate = async (req, res, next) => {
    let status = 500;
    let data = { 'error': 'Data not Valid' }
    if (req.user && req.user.role === 3) {
        try {
            let name = "";
            if (req.body.name && typeof req.body.name == 'string')
                name = req.body.name;
            else
                throw new Error("Not a valid name")
            let description;
            if (req.body.description && typeof req.body.description === 'string')
                description = req.body.description;
            else
                throw new Error("Problem with description");
            let checks;
            if (req.body.checks && req.body.checks.length > 0)
                checks = req.body.checks.join(',');
            else
                checks = ""
            let dbRes = await db.query(`
            INSERT INTO scan_profile
            (name,description,checks, owner) 
            VALUES 
                ($1,$2,$3,$4)
            `, [name, description, checks,req.user.id]);
            if (dbRes.rowCount > 0 || (dbRes.rows && dbRes.rows.length > 0)) {
                status = 200;
                data = dbRes.rows;
            }
        } catch (err) {}
    }
    res.status(status).send(data);
    next();
}


exports.deleteScanTemplate = async (req, res, next) => {
    let status = 500;
    let data = { message: 'Data not valid' };
    if (req.user && req.user.role === 3 && req.params !== null && req.params !== undefined && req.params.name && typeof req.params.name === 'string') {
        try {
            let resDB = await db.query(`
            DELETE FROM scan_profile 
            WHERE 
                id=$1
                AND owner=$2
            `, [req.params.name, req.user.id]);
            if (resDB.rowCount >= 1) {
                status = 200;
                data = {};
            }
            else {
                throw new Error("Data not found")
            }
        } catch (err) { }
    }
    res.status(status).send(data);
    next();
}
exports.updateScanTemplate = async (req, res, next) => {
    let status = 500;
    let data = { message: 'Data not valid' };
    if (req.user && req.user.role === 3 && req.params !== null && req.params !== undefined && req.params.name && typeof req.params.name === 'string') {
        try {
            let dbRes = await db.query('SELECT * FROM scan_profile WHERE id=$1 AND owner=$2', [req.params.name, req.user.id]);
            if (dbRes.rows.length < 1) {
                throw new Error("Data not found")
            }
            if (req.body.name && typeof req.body.name == 'string')
                name = req.body.name;
            else
                throw new Error("Not a valid name")
            let description;
            if (req.body.description && typeof req.body.description === 'string')
                description = req.body.description;
            else
                throw new Error("Problem with description");
            let checks;
            if (req.body.checks && req.body.checks.length > 0)
                checks = req.body.checks.join(',');
            else
                throw new Error("Problem with check list");
            let resDB = await db.query(`
            UPDATE scan_profile 
                SET name=$2,description=$3,checks=$4
                WHERE 
                id=$1
                AND owner=$5
            `, [req.params.name,name,description,checks,req.user.id]);
            if (resDB.rowCount >= 1) {
                status = 200;
                data = {};
            }
            else {
                throw new Error("Data not found")
            }
        } catch (err) { }
    }
    res.status(status).send(data);
    next();
}

exports.findScanTemplate = async (req, res, next) => {
    let status = 500;
    let data = { message: 'Data not valid' };
    if (req.user && req.user.role === 3) {
        try {
            let dbRes = await db.query('SELECT * FROM scan_profile WHERE owner=$1', [req.user.id]);
            if (dbRes.rowCount >= 1) {
                status = 200;
                dbRes.rows.map((val,i,arr)=>{
                    try{
                        val.checks = val.checks.split(',')
                    }catch(err){}
                    return val;
                })
                data = FIXED_TEMPLATES.concat(dbRes.rows);
            }
            else {
                status = 200;
                data = FIXED_TEMPLATES;
            }
        } catch (err) {
            status = 200;
            data = FIXED_TEMPLATES;
        }
    }
    res.status(status).jsonp(data);
    next();
}

const FIXED_TEMPLATES = [
    {
        id: 0,
        name: "FULL",
        description: "Full scanning profile for ARACHNI",
        checks: ["csrf",
            "xss_tag",
            "code_injection_timing",
            "trainer",
            "os_cmd_injection",
            "xss_dom_script_context",
            "xss_dom",
            "xss_script_context",
            "no_sql_injection",
            "xpath_injection",
            "session_fixation",
            "no_sql_injection_differential",
            "sql_injection_timing",
            "sql_injection",
            "file_inclusion",
            "source_code_disclosure",
            "xss_path",
            "os_cmd_injection_timing",
            "code_injection_php_input_wrapper",
            "path_traversal",
            "rfi",
            "xxe",
            "unvalidated_redirect_dom",
            "xss_event",
            "code_injection",
            "unvalidated_redirect",
            "ldap_injection",
            "xss",
            "sql_injection_differential",
            "response_splitting",
            "insecure_cross_domain_policy_access",
            "common_files",
            "webdav",
            "common_directories",
            "localstart_asp",
            "backup_files",
            "unencrypted_password_forms",
            "hsts",
            "form_upload",
            "ssn",
            "captcha",
            "http_only_cookies",
            "private_ip",
            "cookie_set_for_parent_domain",
            "insecure_cookies",
            "x_frame_options",
            "cvs_svn_users",
            "html_objects",
            "mixed_resource",
            "emails",
            "credit_card",
            "password_autocomplete",
            "insecure_cors_policy",
            "origin_spoof_access_restriction_bypass",
            "backup_directories",
            "http_put",
            "interesting_responses",
            "allowed_methods",
            "insecure_client_access_policy",
            "htaccess_limit",
            "backdoors",
            "directory_listing",
            "common_admin_interfaces",
            "xst",
            "insecure_cross_domain_policy_headers"
        ]
    },
    {
        id: 1,
        name: "DEV",
        description: "Scanning profile for ARACHNI. This profile is intended to be used in DEVELOPMENT environments.",
        checks: [
            "csrf",
            "xss_tag",
            "code_injection_timing",
            "xss_dom_script_context",
            "xss_dom",
            "xss_script_context",
            "no_sql_injection",
            "session_fixation",
            "no_sql_injection_differential",
            "sql_injection_timing",
            "sql_injection",
            "file_inclusion",
            "source_code_disclosure",
            "xss_path",
            "code_injection_php_input_wrapper",
            "rfi",
            "xxe",
            "unvalidated_redirect_dom",
            "xss_event",
            "code_injection",
            "unvalidated_redirect",
            "ldap_injection",
            "xss",
            "sql_injection_differential",
            "response_splitting",
            "webdav",
            "backup_files",
            "unencrypted_password_forms",
            "hsts",
            "form_upload",
            "ssn",
            "insecure_cookies",
            "cvs_svn_users",
            "html_objects",
            "mixed_resource",
            "insecure_cors_policy",
            "http_put",
            "interesting_responses",
            "allowed_methods",
            "insecure_client_access_policy",
            "htaccess_limit",
            "backdoors",
            "directory_listing",
            "common_admin_interfaces",
            "xst",
        ]
    },
    {
        id: 2,
        name: "PRE",
        description: "Preproduction scanning profile for ARACHNI",
        checks: [
            "csrf",
            "trainer",
            "os_cmd_injection",
            "xpath_injection",
            "session_fixation",
            "file_inclusion",
            "source_code_disclosure",
            "os_cmd_injection_timing",
            "path_traversal",
            "rfi",
            "xxe",
            "unvalidated_redirect_dom",
            "unvalidated_redirect",
            "ldap_injection",
            "response_splitting",
            "insecure_cross_domain_policy_access",
            "common_files",
            "webdav",
            "common_directories",
            "localstart_asp",
            "backup_files",
            "unencrypted_password_forms",
            "hsts",
            "form_upload",
            "ssn",
            "captcha",
            "http_only_cookies",
            "private_ip",
            "cookie_set_for_parent_domain",
            "insecure_cookies",
            "x_frame_options",
            "cvs_svn_users",
            "html_objects",
            "mixed_resource",
            "emails",
            "credit_card",
            "password_autocomplete",
            "insecure_cors_policy",
            "origin_spoof_access_restriction_bypass",
            "backup_directories",
            "http_put",
            "interesting_responses",
            "allowed_methods",
            "insecure_client_access_policy",
            "htaccess_limit",
            "backdoors",
            "directory_listing",
            "common_admin_interfaces",
            "xst",
            "insecure_cross_domain_policy_headers"
        ]
    },
    {
        id: 3,
        name: "PRO",
        description: "PRODUCTION scanning profile for ARACHNI",
        checks: [
            "csrf",
            "trainer",
            "xpath_injection",
            "session_fixation",
            "file_inclusion",
            "source_code_disclosure",
            "path_traversal",
            "rfi",
            "xxe",
            "unvalidated_redirect_dom",
            "unvalidated_redirect",
            "ldap_injection",
            "response_splitting",
            "insecure_cross_domain_policy_access",
            "common_files",
            "webdav",
            "common_directories",
            "localstart_asp",
            "backup_files",
            "unencrypted_password_forms",
            "hsts",
            "form_upload",
            "ssn",
            "captcha",
            "http_only_cookies",
            "private_ip",
            "cookie_set_for_parent_domain",
            "insecure_cookies",
            "x_frame_options",
            "cvs_svn_users",
            "html_objects",
            "mixed_resource",
            "emails",
            "credit_card",
            "password_autocomplete",
            "insecure_cors_policy",
            "origin_spoof_access_restriction_bypass",
            "backup_directories",
            "http_put",
            "interesting_responses",
            "allowed_methods",
            "insecure_client_access_policy",
            "htaccess_limit",
            "backdoors",
            "directory_listing",
            "common_admin_interfaces",
            "xst",
            "insecure_cross_domain_policy_headers"
        ]
    }
];