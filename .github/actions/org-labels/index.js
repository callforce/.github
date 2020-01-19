const _ = require('lodash')
const core = require('@actions/core')
const github = require('@actions/core')
const Label = require('./Label')
const Oktokit = require('@octokit/rest')

const PROTECTED_LABELS = ['Epic']

const updateRepoLabels = (octokit, org, repo, labels) => {
  return new Promise(async (resolve, reject) => {
    let promises = [];

    try {
      const orgLabel = new Label({ octokit })
      const { data: repoLabels } = await octokit.issues.listLabelsForRepo({
        owner: org,
        repo: repo.name
      })
      const labelNames = _.map(labels, 'name')
      const repoLabelNames = _.map(repoLabels, 'name')

      // determine labels to update & delete
      repoLabels.forEach(label => {
        if (
          !labelNames.includes(label.name) && 
          !PROTECTED_LABELS.includes(label.name)
        ) {
          promises.push(
            orgLabel.delete({ owner: org, repo: repo.name, name: label.name })
          )
        }

        if (
          labelNames.includes(label.name) && 
          !PROTECTED_LABELS.includes(label.name)
        ) {
          const { name, color, description } = _.mapKeys(
            labels, 
            'name'
          )[label.name];

          promises.push(
            orgLabel.update({ owner: org, repo: repo.name, name, color, description })
          )
        }
      })

      // determine labels to create
      labels.forEach(label => {
        const { name, color, description } = label;

        if (!repoLabelNames.includes(label.name)) {
          promises.push(
            orgLabel.create({ owner: org, repo: repo.name, name, color, description })
          )
        }
      })

      let r = await Promise.all(promises)

      resolve(r)
    } catch (err) {
      console.log(err)
      reject(err)
    }
  })
}

const standardizeLabels = (octokit, org, repos, labels) => {
  return new Promise(async (resolve, reject) => {
    try {
      let promises = []

      repos.forEach(repo => {
        promises.push(updateRepoLabels(octokit, org, repo, labels))
      })
      
      resolve(Promise.all(promises))
    } catch (err) {
      console.log(err)
      reject(err)
    }
  })
}

const main = async () => {
  try {
    const org = 'callforce'
    const repo = '.github'
    const token = '94f29cbb4455fbf65216e27db3e2eb46024fb209'
    const labelsPath = 'config/org-labels.json'
    // const org = core.getInput('org', { required: true });
    // const repo = core.getInput('repo', { required: true });
    // const token = core.setSecret('token');
    // const labelsConfig = core.getInput('labels', { required: true });

    const octokit = Oktokit({ auth: token })

    // get org repos
    const { data: repos } = await octokit.repos.listForOrg({ org })

    // get labels config
    const { data: labelsConfig } = await octokit.repos.getContents({
      owner: org,
      repo,
      path: labelsPath
    })
    const buff = new Buffer.from(labelsConfig.content, 'base64')
    const labels = JSON.parse(buff.toString('utf-8'))
    
    // standardize org labels
    await standardizeLabels(octokit, org, repos, labels)
  } catch (err) {
    console.log(err)
    core.setFailed(err.message)
  }
}

main()