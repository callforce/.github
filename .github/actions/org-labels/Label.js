
class Label {
  constructor({ octokit }) {
    this.octokit = octokit
  }

  async create({ owner, repo, name, color, description }) {
    try {
      await this.octokit.issues.createLabel({ 
        owner, 
        repo, 
        name, 
        color, 
        description 
      })
      console.log(`Created ${name} label in ${repo}`)
    } catch (err) {
      console.log(`Failed to create ${name} label in ${repo}`)
      console.log(err)
    }
  }

  async delete({ owner, repo, name }) {
    try {
      await this.octokit.issues.deleteLabel({ owner, repo, name })
      console.log(`Deleted ${name} label in ${repo}`)
    } catch (err) {
      console.log(`Failed to delete ${name} label in ${repo}`)
      console.log(err)
    }
  }

  async update({ owner, repo, name, color, description }) {
    try {
      await this.octokit.issues.updateLabel({ 
        owner, 
        repo, 
        current_name: name, 
        color, 
        description 
      })
      console.log(`Updated ${name} label in ${repo}`)
    } catch (err) {
      console.log(`Failed to update ${name} label in ${repo}`)
      console.log(err)
    }
  }
}

module.exports = Label