module.exports = {
    "PROXY_TYPES" : [
        "http",
        "http_1_0",
        "socks4",
        "socks4a",
        "socks5",
        "socks5h"
    ],
    "AUTHENTICATION_TYPES" : [
        "auto",
        "basic",
        "digest",
        "digest_ie",
        "negotiate",
        "ntlm"
    ],
    "SSL_CERTIFICATE_TYPES" : [
        "pem",
        "der"
    ],
    "SSL_KEY_TYPES" : [
        "pem",
        "der"
    ],
    "SSL_VERSIONS" : [
        "TLSv1",
        "TLSv1_0",
        "TLSv1_1",
        "TLSv1_2",
        "SSLv2",
        "SSLv3"
    ],
    "SSL_VERSIONS_HASH" : {
        "TLSv1":"TLSv1",
        "TLSv1_0":"TLSv1_0",
        "TLSv1_1":"TLSv1_1",
        "TLSv1_2":"TLSv1_2",
        "SSLv2":"SSLv2",
        "SSLv3":"SSLv3"
    }
}