const { Console } = require("console")
const express = require("express")
const app = express()

const jobs={}

app.post("/submit", (req,res)=>{
    const jobId = `jobId:${Date.now()}`
    jobs[jobId] = 0;
    updateJob(jobId, 0);
    res.end("\n \n"+ jobId + "\n \n") 
} )

app.get("/checkStatus", (req, res)=> {
    console.log(jobs[req.query.jobId])
    res.end("\n \n job status : " + jobs[req.query.jobId]+ "%\n \n")
})

app.listen(8080, ()=> {console.log(`server is up and is listening to the port 8080`)})


function updateJob(jobId, progress){
    jobs[jobId] = progress
    console.log(`updated ${jobId} to ${progress}`)
    if(progress ==100) {
        console.log(`job has been completed Successfully.`)
        return;
    }
    this.setTimeout(() => {
        updateJob(jobId, progress+10)
    }, 3000);
}