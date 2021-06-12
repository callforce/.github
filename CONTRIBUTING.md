# Contributing to CallForce <!-- omit in toc -->

The following is a set of guidelines for contributing to CallForce, which are 
hosted in the [CallForce Organization][1] on GitHub. These are mostly 
guidelines, not rules. Use your best judgment, and feel free to propose changes 
to this document in a pull request.

- [Code of Conduct](#code-of-conduct)
- [Contribution Guide](#contribution-guide)
  - [Branches](#branches)
  - [Pull Requests](#pull-requests)
  - [Style Guides](#style-guides)
    - [Git Commit Messages](#git-commit-messages)
    - [JavaScript Style Guide](#javascript-style-guide)
    - [Documentation Style Guide](#documentation-style-guide)
  - [Issue & Pull Request Labels](#issue--pull-request-labels)
    - [Type of Issue](#type-of-issue)
    - [Type of Pull Request](#type-of-pull-request)
    - [Pull Request State](#pull-request-state)
- [Attribution](#attribution)


## Code of Conduct 

This project, and everyone participating in it, is governed by the CallForce 
"Code of Conduct". By participating, you are expected to uphold this code. 
Please report unacceptable behavior to [github@getcallforce.com][2].


## Contribution Guide 

### Branches

At times, we rely on a branch's name to automatically take action on a pull 
request, so please adhere to the following format for branch names:

`<GITHUB_USERNAME>/<CHANGE_TYPE>/<ASSOCIATED_GITHUB_ISSUE_NUMBER>`

* `GITHUB_USERNAME`: Include your GitHub username in branch name
* `CHANGE_TYPE`: Include the type of change the branch will include; options include those recommended by the [Convential Commit][6] specification like `feat`, `fix`, `chore`, or `docs`
* `ASSOCIATED_GITHUB_ISSUE_NUMBER`: If applicable, include the GitHub issue number associated with the changes

Here are some examples for branch names:

* `mishamilovidov/feat/132`
* `connerludlow/fix/32`
* `mishamilovidov/docs`
* `connerludlow/chore/54`

### Pull Requests

Please follow these steps for making contributions:

1. Follow [branch naming standard](#-branches)
2. Make the pull request title adhere to the [Convential Commit][6] specification
3. Follow all instructions in the pull request template
4. Follow the [style guides](#-style-guides)

### Style Guides 

#### Git Commit Messages

* Use the present tense ("add feature" not "added feature")
* Use the imperative mood ("move cursor to..." not "moves cursor to...")
* Limit the first line to 50 characters or less

#### JavaScript Style Guide

* Adhere to the [Airbnb JavaScript Style Guide][3]

#### Documentation Style Guide

* Use [Markdown][4]

### Issue & Pull Request Labels 

This section lists the labels we use to help us track and manage issues and pull requests.

#### Type of Issue

|Label Name|Description|
|----------|-----------|
| `enhancement` | Feature requests |
| `bug` | Confirmed bugs or reports that are very likely to be bugs |
| `maintenance` | Configuration or setup |
| `question` | Questions more than bug reports or feature requests (e.g. how do I do X) |

#### Type of Pull Request

|Label Name|Description|
|----------|-----------|
| `feature` | Pull requests that include new features or enhancements |
| `fix` | Pull requests that include bug fixes |
| `chore` | Pull requests that include configuration or setup |
| `documentation` | Pull requests that include documentaion updates |

#### Pull Request State
| Label name | Description
| --- | --- |
| `work-in-progress`  | Pull requests which are still being worked on, more changes will follow |
| `needs-review` | Pull requests which need code review and approval |
| `under-review` | Pull requests being reviewed |
| `requires-changes` | Pull requests which need to be updated based on review comments and then reviewed again |
| `needs-testing` | Pull requests which need manual testing |


## Attribution 

This contributing guide is adapted from the contributing guide for the [Atom Organization on GitHub][5].

[1]: https://github.com/callforce 
[2]: mailto:github@getcallforce.com
[3]: https://github.com/airbnb/javascript
[4]: https://daringfireball.net/projects/markdown/
[5]: https://github.com/atom/.github/blob/master/CONTRIBUTING.md
[6]: https://www.conventionalcommits.org/en/v1.0.0/#summary
