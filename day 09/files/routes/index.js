const user = (req,res)=>{
    const path = require("path");
    console.log("params=", req.params);
    if(parseInt(req.params.id) >0 && parseInt(req.params.id) < 3)    {
        //res.status(200).sendFile(`/wsl$/Ubuntu/home/clear/backend/day 09/files/file${req.query.id}.html`); 
        if(parseInt(req.params.id)==1)
        res.status(200).sendFile( path.join(__dirname , "../file1.html") );
        else
        res.status(200).sendFile( path.join(__dirname , "../file2.html") );
        
        console.log("successful");
    }
    else
    {
        res.status(200).sendFile( path.join(__dirname , "../file3.html") );
        console.log("user not exists");
        res.status(404 );
    }

}
module.exports = user;