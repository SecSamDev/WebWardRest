const Wappalyzer = require('wappalyzer')
const { URL } = require('url')
/**
 * 
 * @param {URL | string} scanURL 
 * @param {*} options 
 */
function createWappalyzer(scanURL, options = {
    debug: false,
    delay: 500,
    maxDepth: 3,
    maxUrls: 30,
    maxWait: 5000,
    recursive: true,
    userAgent: 'WEBWARDv1.0',
    htmlMaxCols: 2000,
    htmlMaxRows: 2000,
}) {
    options.debug = false;
    const wappalyzer = new Wappalyzer(scanURL, options);
    var responseWappa = null;
    return {
        analyze: function () {
            wappalyzer.analyze().then((data) => {
                responseWappa = {
                    "url" : (data.urls.length > 0 ? data.urls[0] : ""),
                    "urls" : (data.urls.length > 10 ? data.urls.slice(0,10) : data.urls),
                    "applications": data.applications ? data.applications.map((val, i, arr) => {
                        delete val.icon;
                        delete val.website;
                        //Remove text, only numbers
                        val.categories = val.categories.reduce((tot,cat,j,arr2)=>{
                            return tot.concat(Object.keys(cat))
                        },[])
                        return val;
                    }) : []
                }
                responseWappa = data;
            }).catch((err) => {
                responseWappa = {
                    'error': err
                }
            });
            return {};
        },
        getResponse: function () {
            if (responseWappa) {
                return responseWappa;
            } else {
                throw new Error("No response obtained")
            }
        }
    }
}
/**
 * "categories": {
    "1": {
        "name": "CMS",
        "priority": 1
    },
    "2": {
        "name": "Message Boards",
        "priority": 1
    },
    "3": {
        "name": "Database Managers",
        "priority": 2
    },
    "4": {
        "name": "Documentation Tools",
        "priority": 2
    },
    "5": {
        "name": "Widgets",
        "priority": 9
    },
    "6": {
        "name": "Ecommerce",
        "priority": 1
    },
    "7": {
        "name": "Photo Galleries",
        "priority": 1
    },
    "8": {
        "name": "Wikis",
        "priority": 1
    },
    "9": {
        "name": "Hosting Panels",
        "priority": 1
    },
    "10": {
        "name": "Analytics",
        "priority": 9
    },
    "11": {
        "name": "Blogs",
        "priority": 1
    },
    "12": {
        "name": "JavaScript Frameworks",
        "priority": 5
    },
    "13": {
        "name": "Issue Trackers",
        "priority": 2
    },
    "14": {
        "name": "Video Players",
        "priority": 7
    },
    "15": {
        "name": "Comment Systems",
        "priority": 9
    },
    "16": {
        "name": "Captchas",
        "priority": 9
    },
    "17": {
        "name": "Font Scripts",
        "priority": 9
    },
    "18": {
        "name": "Web Frameworks",
        "priority": 4
    },
    "19": {
        "name": "Miscellaneous",
        "priority": 9
    },
    "20": {
        "name": "Editors",
        "priority": 4
    },
    "21": {
        "name": "LMS",
        "priority": 1
    },
    "22": {
        "name": "Web Servers",
        "priority": 7
    },
    "23": {
        "name": "Cache Tools",
        "priority": 9
    },
    "24": {
        "name": "Rich Text Editors",
        "priority": 5
    },
    "25": {
        "name": "JavaScript Graphics",
        "priority": 3
    },
    "26": {
        "name": "Mobile Frameworks",
        "priority": 3
    },
    "27": {
        "name": "Programming Languages",
        "priority": 4
    },
    "28": {
        "name": "Operating Systems",
        "priority": 5
    },
    "29": {
        "name": "Search Engines",
        "priority": 4
    },
    "30": {
        "name": "Web Mail",
        "priority": 2
    },
    "31": {
        "name": "CDN",
        "priority": 9
    },
    "32": {
        "name": "Marketing Automation",
        "priority": 9
    },
    "33": {
        "name": "Web Server Extensions",
        "priority": 7
    },
    "34": {
        "name": "Databases",
        "priority": 5
    },
    "35": {
        "name": "Maps",
        "priority": 9
    },
    "36": {
        "name": "Advertising Networks",
        "priority": 9
    },
    "37": {
        "name": "Network Devices",
        "priority": 9
    },
    "38": {
        "name": "Media Servers",
        "priority": 1
    },
    "39": {
        "name": "Webcams",
        "priority": 9
    },
    "40": {
        "name": "Printers",
        "priority": 9
    },
    "41": {
        "name": "Payment Processors",
        "priority": 8
    },
    "42": {
        "name": "Tag Managers",
        "priority": 9
    },
    "43": {
        "name": "Paywalls",
        "priority": 9
    },
    "44": {
        "name": "Build CI Systems",
        "priority": 4
    },
    "45": {
        "name": "Control Systems",
        "priority": 8
    },
    "46": {
        "name": "Remote Access",
        "priority": 8
    },
    "47": {
        "name": "Dev Tools",
        "priority": 3
    },
    "48": {
        "name": "Network Storage",
        "priority": 9
    },
    "49": {
        "name": "Feed Readers",
        "priority": 1
    },
    "50": {
        "name": "Document Management Systems",
        "priority": 1
    },
    "51": {
        "name": "Landing Page Builders",
        "priority": 2
    },
    "52": {
        "name": "Live Chat",
        "priority": 9
    },
    "53": {
        "name": "CRM",
        "priority": 7
    },
    "54": {
        "name": "SEO",
        "priority": 7
    },
    "55": {
        "name": "Accounting",
        "priority": 1
    },
    "56": {
        "name": "Cryptominer",
        "priority": 8
    },
    "57": {
        "name": "Static Site Generator",
        "priority": 1
    }
 */
/**
 * {
    "urls": [
        "https://www.inycom.es/",
        "https://www.inycom.es/conocenos",
        "https://www.inycom.es/sector-negocio",
        "https://www.inycom.es/innovacion",
        "https://www.inycom.es/experiencia",
        "https://www.inycom.es/buscamos-talento"
    ],
        "applications": [
            {
                "name": "Amazon EC2",
                "confidence": "100",
                "version": "",
                "icon": "aws-ec2.svg",
                "website": "http://aws.amazon.com/ec2/",
                "categories": [
                    {
                        "22": "Web Servers"
                    }
                ]
            },
            {
                "name": "Apache",
                "confidence": "100",
                "version": "2.4.27",
                "icon": "Apache.svg",
                "website": "http://apache.org",
                "categories": [
                    {
                        "22": "Web Servers"
                    }
                ]
            },
            {
                "name": "Drupal",
                "confidence": "100",
                "version": "8",
                "icon": "Drupal.svg",
                "website": "http://drupal.org",
                "categories": [
                    {
                        "1": "CMS"
                    }
                ]
            },
            {
                "name": "Font Awesome",
                "confidence": "100",
                "version": "",
                "icon": "Font Awesome.png",
                "website": "http://fontawesome.io",
                "categories": [
                    {
                        "17": "Font Scripts"
                    }
                ]
            },
            {
                "name": "Google Analytics",
                "confidence": "100",
                "version": "UA",
                "icon": "Google Analytics.svg",
                "website": "http://google.com/analytics",
                "categories": [
                    {
                        "10": "Analytics"
                    }
                ]
            },
            {
                "name": "Google Font API",
                "confidence": "100",
                "version": "",
                "icon": "Google Font API.png",
                "website": "http://google.com/fonts",
                "categories": [
                    {
                        "17": "Font Scripts"
                    }
                ]
            },
            {
                "name": "OpenSSL",
                "confidence": "100",
                "version": "1.0.2k",
                "icon": "OpenSSL.png",
                "website": "http://openssl.org",
                "categories": [
                    {
                        "33": "Web Server Extensions"
                    }
                ]
            },
            {
                "name": "PHP",
                "confidence": "100",
                "version": "7.0.25",
                "icon": "PHP.svg",
                "website": "http://php.net",
                "categories": [
                    {
                        "27": "Programming Languages"
                    }
                ]
            },
            {
                "name": "Bootstrap",
                "confidence": "100",
                "version": "",
                "icon": "Bootstrap.svg",
                "website": "https://getbootstrap.com",
                "categories": [
                    {
                        "18": "Web Frameworks"
                    }
                ]
            },
            {
                "name": "jQuery",
                "confidence": "100",
                "version": "3.2.1",
                "icon": "jQuery.svg",
                "website": "https://jquery.com",
                "categories": [
                    {
                        "12": "JavaScript Frameworks"
                    }
                ]
            },
            {
                "name": "jQuery Migrate",
                "confidence": "100",
                "version": "3.0.0",
                "icon": "jQuery.svg",
                "website": "https://github.com/jquery/jquery-migrate",
                "categories": [
                    {
                        "12": "JavaScript Frameworks"
                    }
                ]
            },
            {
                "name": "jQuery UI",
                "confidence": "100",
                "version": "1.10.2",
                "icon": "jQuery UI.svg",
                "website": "http://jqueryui.com",
                "categories": [
                    {
                        "12": "JavaScript Frameworks"
                    }
                ]
            }
        ],
            "meta": {
        "language": "en"
    }
}
 */

module.exports = createWappalyzer;