
(function(){

  var $points = document.getElementById('points');

  var updatePoints = function(points){
    globalPoints = points;
    $points.innerHTML = points;
  };

  var addPoints = function(){
    io.socket.post('/add');
  };

  var removePoints = function(){
    io.socket.post('/remove');
  };

  var showButtons = function(points){
    var $buttons = document.getElementById('admin-buttons');
    $buttons.className = 'buttons';
    document.getElementById('add').addEventListener('click', addPoints);
    document.getElementById('remove').addEventListener('click', removePoints);
  };

  io.socket.get('/get', {}, updatePoints);

  io.socket.get('/is-admin', {}, function(data){
    if(data.admin) return showButtons();
  });

  io.socket.on('updated', function(ci) {
    if(ci) updatePoints(ci.points);
  });

})();
