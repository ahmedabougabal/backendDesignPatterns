// request is taking long , i will check with you later , but talk to me only when it is ready.
const app = require("express")();
const jobs ={}

app.post("/submit", async(req, res)=> {
    const jobId = `job ID is ${Date.now()}`
    jobs[jobId] = 0;
    updateJob(jobId, 0);
    res.end("\n\n " + jobId + "\n\n")
})

app.get("/checkstatus", async (req, res)=> {
    const jobId = req.query.jobId;
    // long polling , don't respond until it is done 
    while (await waitForJobCompletion(jobId) == false);
    res.end(`\n\n ${jobId} , Status : Complete ` + jobs[jobId] + "%\n\n")
})


if(jobId == undefined){
    return `there are no jobs with this id.`
}


app.listen(8080, ()=>{
    console.log(`server is up and listening to the port 8080`)
})

// long polling core idead => doesnot block the event loop
async function waitForJobCompletion(jobId){
    return new Promise((resolve, reject)=> {
        if(jobs[jobId] < 100)
            setTimeout(()=> resolve(false),1000)
        else 
            resolve(true)
    })
}


function updateJob(jobId, progress){
    jobs[jobId] = progress
    console.log(`updated ${jobId} to ${progress}`)
    if(progress ==100)
        return ;
    
    setTimeout(() => {
        updateJob(jobId, progress+10)
    }, 3000);
}
