const Kue = require('kue');
const queue = Kue.createQueue();

//Kue provides us with a range() function that we can use to list all the jobs
Kue.Job.range(0, -1, 'asc', (err, jobs) => { //Here 0 and -1 mean that we need record of all the jobs from beginning to end
    //retrieve all jobs that has beed ever submitted in queue
    jobs.map(job => {
        console.log(`Job ${job.id}, data: ${job.data}, Status : ${job.state}`);
    })
    //retrieve list of completed jobs
    jobs.complete((err, jobs) => {
        jobs.map(job => {
            console.log(`Job ${job.id}, data: ${job.data}`);
        })
    })
    //Similarly we can list of active, inactive, delayed, and failed jobs
})