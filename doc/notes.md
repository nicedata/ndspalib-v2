## nd- Attributes

| Attribute  | Description                                        | Parameter(s)                              |
| ---------- | -------------------------------------------------- | ----------------------------------------- |
| nd-main    | Application main entry point                       | nd-url, nd-target                         |
| nd-source  | Defines a data source                              | nd-url, nd-target                         |
| nd-poll    | Defines a poller which executes at given intervals | nd-url, nd-target, nd-action, nd-interval |
| nd-env     |                                                    | nd-key                                    |
| nd-version | Access to the ndspalib version string              | -                                         |
| nd-nav     | Intra site navigation element (link)               | nd-url, nd-target, nd-confirm             |
| nd-link    | Active element (link)                              | nd-url, nd-target, nd-action, nd-confirm  |
| nd-test    | Testing purposes !                                 |                                           |

## nd-  Parameters

| Parameter   | Description                                        |
| ----------- | -------------------------------------------------- |
| nd-url      | Describes an URL                                   |
| nd-target   | Describes one ore more targets (CSS selector)      |
| nd-key      |                                                    |
| nd-action   | Describes an action to do (JS)                     |
| nd-interval | Describes a polling interval in milli seconds      |
| nd-confirm  | Identifies a confirmation dialog id (OK \| CANCEL) |
| nd-info     | Identifies a information dialog id (OK)            |
| nd-params   | JSON representation of parameters                  |

### nd-nav

Provide navigation within the web application. In the SPA concept, navigation does not fetch a new page from the server, but updates a given area of the main container page. 

- [x] disable default behavior of `<a />` tags
- [x] force usage of the `nd-url` parameter (discard `href` processing )

```html
<a nd-nav nd-url="/logout" nd-target="#targetdiv" nd-confirm="confirm" nd-params="{message: 'Please confirm !'}">Logout</a>
```



Run test server :

```shell
uv run python -m http.server 8000 -d testserver/
```

## Alerts and confirmation dialogs

The browser provides the native `alert()`,  `confirm()` and `prompt()` methods to create synchronous pop-up dialog boxes. Ndspalib provides the same functionality in a more flexible manner. Dialogs are modal boxes with a header section (a title), a message, section, and one or more buttons to acknowledge an information, accept (or dismiss) an action.

Three kinds of dialog types are defined :

-  alert : an alert with a header, a message and an accept button
- confirm: a confirmation dialog with an accept and a dismiss button
- 



Use JSON data for dynamic dialogs, use templates for static dialogs !