/**
 * Scan options for Arachni
 */
class ArachniScanOptions {
    constructor() {
        this.scope = {
            auto_redundant_paths : true,
            directory_depth_limit : 1000,
            dom_depth_limit : 1000,
            dom_event_limit : 1000,
            exclude_binaries : true,
            exclude_content_patterns : [],
            exclude_file_extensions : [],
            exclude_path_patterns : [],
            extend_paths : [],
            https_only : false,
            include_path_patterns : [],
            include_subdomains : true,
            page_limit : 1000,
            redundant_path_patterns : {},
            restrict_paths : [],
            url_rewrites : []
        }
        /**
         * Elements to be audite. Example: {links : true,form : true, cookie : true}
         */
        this.audit = {
            cookies : true,
            cookies_extensively : true,
            exclude_vector_patterns : [],
            forms: true, 
            headers: true,
            include_vector_patterns : [],
            jsons : true,
            link_templates : [],
            links: true,
            parameter_values : true,
            ui_forms : true,
            ui_inputs: true,
            with_both_http_methods : true,
            with_extra_parameter : true,
            with_raw_payloads : true,
            xmls : true
        };
        /**
         * Http configuration, like Proxy config, request headers, auth user and password...
         * @link {https://www.rubydoc.info/github/Arachni/arachni/Arachni/OptionGroups/HTTP}
         * Revise oficial docs
         */
        this.http = {
            authentication_password : "",
            authentication_type : "auto",
            authentication_username : "",
            cookie_jar_filepath : null,
            cookie_string : "",
            cookies : {},
            proxy : null,
            proxy_host : "",
            proxy_password : "",
            proxy_port : 80,
            proxy_type : "http",
            proxy_username : "",
            request_concurrency : 10,
            request_headers : {},
            request_queue_size : 500,
            request_redirect_limit : 5,
            request_timeout : 50000,
            response_max_size : 100000,
            ssl_ca_directory : "",
            ssl_certificate_filepath : "",
            ssl_certificate_type : "pem",
            ssl_key_password : "",
            ssl_key_type : "pem",
            ssl_verify_host : false,
            ssl_verify_peer : false,
            ssl_version :"TLSv1",
            user_agent : "WebWard/v#1.0"
        };/*
        this.session = {
            check_pattern : null,
            check_url : null
        };*/
        /**
         * Plugins to load, by name, along with their options.
         * 
         * Ex: "plugins": {
         * 
         *  "autologin": {
         * 
         *          "url": "http://192.168.99.100:31614/WebGoat/login.mvc",
         *          "parameters": "username=arachni&password=arachni",
         *          "check": "What is WebGoat?"
         *      }
         *  }
         */
        this.plugins = {
        }
        /**
         * Scan checks. Example: ['*'] performs all available scans
         * @type {string[]}
         */
        this.checks = ['*'];
        /**
         * Initialize the fingerprinter with the given platforms.
         */
        this.platforms = [];
        this.no_fingerprinting = false;
        this.grid = false;
        this.grid_mode = null;
        this.spawns = 0;
        this.url = null;
    }
}
exports.ArachniScanOptions = ArachniScanOptions;