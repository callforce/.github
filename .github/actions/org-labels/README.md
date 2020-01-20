
# Organization Labels Action

This action standardizes labels across an organization using an org label config json file.

## Inputs

* `org` - **Required** - The name of a GitHub organization
* `repo` - **Required** - The name of the GitHub repo within the org that contains the org label config json
* `token` - **Required** - A GitHub access token with org rights
* `labelsPath` - **Required** - The path (within `org`/`repo`) to the org labels json

### Organization Labels Confg

The org labels config is a json file that contains a collection of label config objects that include the name, color, and description of each label. For example:

```json
[
  {
    "name": "bug",
    "color": "d73a4a",
    "description": "Confirmed bugs or reports that are very likely to be bugs"
  },
  {
    "name": "question",
    "color": "7bed9b",
    "description": "Questions more than bug reports or feature requests (e.g. how do I do X)"
  },
  ...
]
```

## Outputs

*None*
