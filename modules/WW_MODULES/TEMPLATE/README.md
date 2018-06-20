# Template Engine Module

This module consists of 2 submodules:
- **TEXT TEMPLATE** : simple text template engine.
- **HTML TEMPLATE** : powerful template module that uses pug as template engine.

### TEXT TEMPLATE
This module allow us to pass pretty strings to other modules. It's very simple and may be full of bugs but it does his purpose.

If we have a JSON like this:
```
{
    "Name" : "Samuel",
    "Surname" : "Garces"
}
```
We could use a template like:

```
Hello #{Name} #{Surname} to WebWard!
```
To get an outplut like:
```
Hello Samuel Garces to WebWard!
```

#### Working with arrays

To access variables we use #{VarName} and for delimiter an array #[ArrayVar] This will delimiter the array scope #[ArrayVar].
Inside an array we can access the current array variable with #{$}.

To get a better idea we can look at the following example:

**Variable**
```
{
    "USER": {
        "Name" : "Samuel",
        "Surname" : "Garces",
        "Friends" : [{
            "Name" : "Friend1",
            "Surname" : "Friend1.1",
        },
        {
            "Name" : "Friend2",
            "Surname" : "Friend2.1",
        }]
    }
}
```
**Template**
```
Hello #{USER.Name} #{USER.Surname}
You have #{USER.Friends.length} friends:
#[USER.Friends]
- #{$.Name} #{$.Surname}
#[USER.Friends]
```
**Result**
```
Hello Samuel Garces
You have 2 friends:
- Friend1 Friend1.1
- Friend2 Friend2.1
```

### HTML TEMPLATE

It uses pug as the template engine so we best get a look at his documentation:
[Pug Documentation from Github](https://pugjs.org/api/getting-started.html)

Following the same example with arrays:
**Template**
```
p Hello #{USER.Name} #{USER.Surname}
p You have #{USER.Friends.length} friends
ul
    each val in USER.Friends
        li
            p #{val.Name} #{val.Surname}
```

Will be renderer as:
**Result**
```
<p>Hello Samuel Garces</p>
<p>You have 2 friends</p>
<ul>
    <li>
        <p>Friend1 Friend1.1</p>
    </li>
    <li>
        <p>Friend2 Friend2.1</p>
    </li>
</ul>
```

