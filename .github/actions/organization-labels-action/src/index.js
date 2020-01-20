const _ = require('lodash');
const core = require('@actions/core');
const Oktokit = require('@octokit/rest');
const { retry } = require('@octokit/plugin-retry');
const { throttling } = require('@octokit/plugin-throttling');
const Label = require('./util/Label');

/**
 * @constant
 * @type {Object[]}
 * @default
 */
const PROTECTED_LABELS = ['Epic']

/**
 * @function
 * @name updateRepoLabels
 *    updates repo labels using org labels config
 *      labels not in org label config are deleted
 *      labels missing in repo are created
 *      labels included in org label config are updated
 *
 * @param {Octokit} octokit - Authenticated instance of Octokit
 * @param {String} org - Name of github org
 * @param {Object[]} repo - Org repo data
 * @param {Object[]} labels - Collection of org labels from org label config
 */
async function updateRepoLabels(octokit, org, repo, labels) {
  const promises = [];

  try {
    const orgLabel = new Label({ octokit });
    const { data: repoLabels } = await octokit.issues.listLabelsForRepo({
      owner: org,
      repo: repo.name
    });
    const labelNames = _.map(labels, 'name');
    const repoLabelNames = _.map(repoLabels, 'name');

    repoLabels.forEach(label => {
      if (
        !labelNames.includes(label.name) &&
        !PROTECTED_LABELS.includes(label.name)
      ) {
        promises.push(
          orgLabel.delete({ owner: org, repo: repo.name, name: label.name })
        );
      }

      if (
        labelNames.includes(label.name) &&
        !PROTECTED_LABELS.includes(label.name)
      ) {
        const { name, color, description } = _.mapKeys(labels, 'name')[
          label.name
        ];

        promises.push(
          orgLabel.update({
            owner: org,
            repo: repo.name,
            name,
            color,
            description
          })
        );
      }
    });

    labels.forEach(label => {
      const { name, color, description } = label;

      if (!repoLabelNames.includes(label.name)) {
        promises.push(
          orgLabel.create({
            owner: org,
            repo: repo.name,
            name,
            color,
            description
          })
        );
      }
    });

    const r = await Promise.all(promises);

    return r;
  } catch (err) {
    return err;
  }
}

/**
 * @function
 * @name standardizeLabels
 *    creates and executes array of promises to update labels in org repos
 *
 * @param {Octokit} octokit - Authenticated instance of Octokit
 * @param {String} org - Name of github org
 * @param {Object[]} repos - Collection of org repo data
 * @param {Object[]} labels - Collection of org labels from org label config
 */
async function standardizeLabels(octokit, org, repos, labels) {
  try {
    const promises = [];

    repos.forEach(repo => {
      promises.push(updateRepoLabels(octokit, org, repo, labels));
    });

    const r = await Promise.all(promises);

    return r;
  } catch (err) {
    return err;
  }
}

/**
 * @function
 * @name main
 *    gathers action inputs, github org repos, and org labels config file and
 *    then standardizes labels in repos across the org
 */
async function main() {
  try {
    const org = core.getInput('org', { required: true });
    const repo = core.getInput('repo', { required: true });
    const token = core.getInput('token', { required: true });
    const labelsPath = core.getInput('labelsPath', { required: true });
    const ActionOctokit = Oktokit.plugin(throttling).plugin(retry);
    const octokit = new ActionOctokit({
      auth: token,
      throttle: {
        onRateLimit: (retryAfter, options) => {
          octokit.log.warn(
            `Request quota exhausted for request ${options.method} ${options.url}`
          );

          if (options.request.retryCount === 0) {
            console.log(`Retrying after ${retryAfter} seconds!`);
            return true;
          }

          return null;
        },
        onAbuseLimit: (retryAfter, options) => {
          octokit.log.warn(
            `Abuse detected for request ${options.method} ${options.url}`
          );
        }
      }
    });
    const { data: repos } = await octokit.repos.listForOrg({ org });
    const { data: labelsConfig } = await octokit.repos.getContents({
      owner: org,
      repo,
      path: labelsPath
    });
    const buff = Buffer.from(labelsConfig.content, 'base64');
    const labels = JSON.parse(buff.toString('utf-8'));

    await standardizeLabels(octokit, org, repos, labels);
  } catch (err) {
    core.setFailed(err.message);
  }
}

main();
