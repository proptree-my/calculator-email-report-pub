// const esInit = require('./elasticsearch')
const email = require('./email')

const initialize = async () => {
  await email()
}

module.exports = initialize

