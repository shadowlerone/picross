var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/test', function (req, res) {
	res.render('test', {x:10, y:10});
})
router.get('/testgame', function (req, res) {
	res.render('test_level', {x:10, y:10, hints:{"y":[[2,2],[1,3,1],[1,1,1],[3],[9],[1,2,1,2],[1,4,1],[9],[2,1,4],[5]],"x":[[3],[1,2],[5],[8,1],[1,2,4],[7,1],[1,1,3],[3,6],[1,2,2],[1,1,1]]}});
})
router.get('/', function (req, res, next) {
	res.render('index', { title: 'Express' });
});



module.exports = router;
