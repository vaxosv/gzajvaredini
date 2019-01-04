let clean = {
    mongoconnect: () => {
        console.log("connected to mongodb");
    },
    mongoerr: () =>{
        console.log(err);
    },
    portcallback:()=>{
        console.log("app runs in port 80");
    }
}


module.exports = clean