var jwt = require('jsonwebtoken');
JWT_SEC_KEY="Akuisgood";
const fetchuser=(req,res,next)=>{
  const token = req.header("auth-token");
  if(!token){
    res.status(400).json({error: "error occured"})
  }
  try {
    const data = jwt.verify(token,JWT_SEC_KEY);
    req.user=data.user;
    next();
  } catch (error) {
    res.status(400).json({error: "error occured"})
  }

  
}


module.exports=fetchuser;