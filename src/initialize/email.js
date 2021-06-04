const paramStore = require('@proptree/proptree-lib/lib/param-store')
const cache = require('@proptree/proptree-lib/lib/cache')

module.exports = async () => {
  console.log('Initialize KNEX')
  const path = `/proptree/${process.env.ENV}/smtp`

  // Only lambda will have this env variable
  const configs = await paramStore.getParams(path)

  cache.set('smtp_host', configs[`${path}/host`])
  cache.set('smtp_port', configs[`${path}/port`])
  cache.set('smtp_username', configs[`${path}/username`])
  cache.set('smtp_password', configs[`${path}/password`])
}