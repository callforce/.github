const core = require('@actions/core')
const github = require('@actions/core')

const main = async () => {
  try {
    const org = core.getInput('org', { required: true });
    const token = core.setSecret('token');
    const labels = core.getInput('labels');

    console.log(JSON.stringify({
      org,
      token,
      labels
    }))
  } catch (error) {
    core.setFailed(error.message)
  }
}

main()