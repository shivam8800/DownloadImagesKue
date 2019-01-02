const Kue = require('kue');
const queue = Kue.createQueue();
const readline = require('readline-sync');


queue.on('job enqueue', function () {
	console.log('job submitted in queue')
	process.exit(0);
})

let file = readline.question("Write URL of Image which you wants to downloads ? ");

let job = queue.create('download', {
	file: file
}).save();
