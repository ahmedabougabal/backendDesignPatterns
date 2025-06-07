# curl -X POST "http://localhost:8080/submit"  
## this shall return the job id that is running 
# curl -X GET "http://localhost:8080/checkstatus?jobId=job%20ID%20is%20{type here the job id that you get from firing the post endpoint above}"  
## this endpoint is responsible for returning a response once the server executes and finishes successfully.