let clean = {
    mongoconnect: () => {
        console.log("connected to mongodb");
    },
    mongoerr: () =>{
        console.log(err);
    },
    portcallback:()=>{
        console.log("app run in port 80");
    }
}

module.exports = clean