# nd-select

## Attributes

| Attribute   | Description                                                  | M \| O |
| ----------- | ------------------------------------------------------------ | :----: |
| nd-select   | Identifies an `HTMLSelectElement` to be handled with NDSPALib. |   M    |
| nd-target   | CSS selector to identify the element(s) which will be affected by the select element changes. |   M    |
| nd-selected | Set the select element initial to the given option value. Refers to an `<option />` value. |   O    |
| nd-url      | URL to fetch the select element options from. The backend must return a list of `option>...</option>`. |   O    |
| nd-inform   | CSS selector to identify other `select` element(s) that have to be updated if the selection changes. |   O    |

## Targets

Targets are specified in the select element with the `nd-target` attribute which contains a CSS selector as shown here :

```html
<select nd-select class="..." nd-target="p .level-dependent .testor #d5" nd-url="/partials/select-options.html">
```

### Target attributes

| Attribute   | Description                                                  |      |
| ----------- | ------------------------------------------------------------ | ---- |
| nd-show-for | Visibility of the target element(s) based on the related `select` value. |      |
| nd-hide-for | Invisibility of the target element(s) based on the related `select` value. |      |
| nd-sync     |                                                              |      |
| nd-follow   |                                                              |      |
|             |                                                              |      |

