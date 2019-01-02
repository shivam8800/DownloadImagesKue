'use strict';

const Kue = require('kue');
const queue = Kue.createQueue();
const download = require('image-downloader')



queue.process('download', function (job, done) {
	console.log(`Working on job ${job.id}`);
	console.log(job.data)
	downloadIMG(job.data.file, done);
})


async function downloadIMG(file1) {
	const options = {
		url: file1,
		dest: '/tmp/images/'
	}
	try {
		console.log(`download started: ${file1}`)
		const { filename, image } = await download.image(options)
		console.log("download completes", filename)
	} catch (e) {
		console.error(e)
	}
}
