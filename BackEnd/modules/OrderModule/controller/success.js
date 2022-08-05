module.exports = (req,res,next)=>{
    console.log(res.body)
    res.json({data:res.body})
}