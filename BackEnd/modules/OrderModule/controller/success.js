const success = (req,res,next)=>{
    console.log(res.body)
    res.json({data:res})
}


const testget = (req,res,next)=>{
    console.log(req.query)
    res.json({data:req.query})
}

module.exports = {testget, success}