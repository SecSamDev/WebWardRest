# CAST Module

There are times when a node accepts a parameter called _HTML but our node only send a parameter called HTML, to cast HTML into _HTML we can use this module.

In the **_VALUES** parameter are stored the list of the parameters to cast and ther new name. 
```
{
    "HTML" : "_HTML",
    "MSG" : "_MESSAGE"
}
```
This will cast the HTML parameter into _HTML and MSG into _MESSAGE.