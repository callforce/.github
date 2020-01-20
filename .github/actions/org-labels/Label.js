const axios = require('axios')

class Label {
  constructor({ octokit, token }) {
    this.octokit = octokit
    this.token = token
    this.githubBaseUrl = 'https://api.github.com'
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
        reject(err)
      }
    })
  }

  update({ owner, repo, name, color, description }) {
    return new Promise(async (resolve, reject) => {
      try {
        const url = `${this.githubBaseUrl}/repos/${owner}/${repo}/labels/${name}`
        await axios({
          method: 'patch',
          url, 
          headers: { 'Authorization': `Bearer ${this.token}` },
          data: {
            name,
            new_name: name,  
            color, 
            description 
          }
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