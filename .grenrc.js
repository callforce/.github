module.exports = {
  "apiUrl": "https://api.github.com",
  "dataSource": "prs",
  "groupBy": {
    "Features": ["enhancement", "feature"],
    "Fixes": ["bug", "fix"],
    "Maintenance": ["maintenance", "chore"],
    "Maintenance": ["..."]
  },
  "template": {
    "commit": ({ message, url, author, name }) => `- [${message}](${url}) - ${author ? `@${author}` : name}`,
    "issue": "- {{name}} ([{{text}}]({{url}})) @{{user_login}}",
    "label": "[**{{label}}**]",
    "noLabel": "closed",
    "group": "\n### {{heading}}\n",
    "changelogTitle": "# Changelog\n\n",
    "release": "## {{release}}\n{{body}}",
    "releaseSeparator": "\n---\n\n"
  }
}