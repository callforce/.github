
/**
 * Creates interface to manage github issue label
 * @class
 */
class Label {
  constructor({ octokit }) {
    this.octokit = octokit
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
  create({ owner, repo, name, color, description }) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.octokit.issues.createLabel({ 
          owner, 
          repo, 
          name, 
          color, 
          description 
        })
        console.log(`Created ${name} label in ${repo}`)
        resolve({ name })
      } catch (err) {
        console.log(`Failed to create ${name} label in ${repo}`)
        reject(err)
      }
    })
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
  delete({ owner, repo, name }) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.octokit.issues.deleteLabel({ owner, repo, name })
        console.log(`Deleted ${name} label in ${repo}`)
        resolve({ name })
      } catch (err) {
        console.log(`Failed to delete ${name} label in ${repo}`)
        reject(err)
      }
    })
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
  update({ owner, repo, name, color, description }) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.octokit.issues.updateLabel({
          owner,
          repo,
          name,
          current_name: name,
          new_name: name,
          color,
          description
        })
        console.log(`Updated ${name} label in ${repo}`)
        resolve({ name })
      } catch (err) {
        console.log(`Failed to update ${name} label in ${repo}`)
        reject(err)
      }
    })
  }
}

module.exports = Label