module.exports = (res,req,next)=>{
    console.log(res)
    res.json({data:res})
}