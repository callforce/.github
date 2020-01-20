
class Label {
  constructor({ octokit }) {
    this.octokit = octokit
  }

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
        console.log(err)
        reject(err)
      }
    })
  }

  delete({ owner, repo, name }) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.octokit.issues.deleteLabel({ owner, repo, name })
        console.log(`Deleted ${name} label in ${repo}`)
        resolve({ name })
      } catch (err) {
        console.log(`Failed to delete ${name} label in ${repo}`)
        console.log(err)
        reject(err)
      }
    })
  }

  update({ owner, repo, name, color, description }) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.octokit.issues.updateLabel({ 
          owner, 
          repo, 
          name,
          new_name: name,  
          color, 
          description 
        })
        console.log(`Updated ${name} label in ${repo}`)
        resolve({ name })
      } catch (err) {
        console.log(`Failed to update ${name} label in ${repo}`)
        console.log(err)
        reject(err)
      }
    })
  }
}

module.exports = Label