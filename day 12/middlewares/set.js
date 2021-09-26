const set = (req, res)=>{
    req.session.name = "arun";
    res.status(201).send(req.session.name);

}
module.exports = set;