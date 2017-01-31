
module.exports.routes = {

  '/': {view: 'homepage'},

  'get /get': 'CIController.get',

  'post /add': 'CIController.add',
  'post /remove': 'CIController.remove',

  'get /is-admin': 'CIController.isAdmin',

  'get /admin/:pass': 'CIController.admin'

};
