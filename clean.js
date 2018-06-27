let clean = {
    mongoconnect: () => {
        console.log("connected to mongodb");
    },
    mongoerr: () =>{
        console.log(err);
    },
    portcallback:()=>{
        console.log("app run in port 80");
    },
    config: 'mongodb://vaxo:qweasd123@ds227459.mlab.com:27459/test_vaxosv',
}

module.exports = clean