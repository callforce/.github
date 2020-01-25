const core = require('@actions/core');

/**
 * Creates interface to manage github issue label
 * @class
 */
class Label {
  constructor({ octokit }) {
    this.octokit = octokit;
  }

  /**
   * @method
   * @name create
   *    creates a github repo label
   *
   * @param {String} owner - Name of github org
   * @param {String} repo - Org repo name
   * @param {String} name - Label name
   * @param {String} color - Label color; six-character hex code
   * @param {String} description - Label description
   */
  async create({ owner, repo, name, color, description }) {
    try {
      await this.octokit.issues.createLabel({
        owner,
        repo,
        name,
        color,
        description
      });
      core.info(`Created ${name} label in ${repo}`);
      return name;
    } catch (err) {
      core.info(`Failed to create ${name} label in ${repo}`);
      return err;
    }
  }

  /**
   * @method
   * @name delete
   *    deletes a github repo label
   *
   * @param {String} owner - Name of github org
   * @param {String} repo - Org repo name
   * @param {String} name - Label name
   */
  async delete({ owner, repo, name }) {
    try {
      await this.octokit.issues.deleteLabel({ owner, repo, name });
      core.info(`Deleted ${name} label in ${repo}`);
      return name;
    } catch (err) {
      core.info(`Failed to delete ${name} label in ${repo}`);
      return err;
    }
  }

  /**
   * @method
   * @name update
   *    creates a github repo label
   *
   * @param {String} owner - Name of github org
   * @param {String} repo - Org repo name
   * @param {String} name - Label name
   * @param {String} color - Label color; six-character hex code
   * @param {String} description - Label description
   */
  async update({ owner, repo, name, color, description }) {
    try {
      await this.octokit.issues.updateLabel({
        owner,
        repo,
        name,
        current_name: name,
        new_name: name,
        color,
        description
      });
      core.info(`Updated ${name} label in ${repo}`);
      return name;
    } catch (err) {
      core.info(`Failed to update ${name} label in ${repo}`);
      return err;
    }
  }
}

module.exports = Label;
