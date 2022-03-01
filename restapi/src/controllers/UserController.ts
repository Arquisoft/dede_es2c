const  user = require("/restapi/src/model/User");

const getUsers = async (req:any, res:any) => {
    try {
        const student= await user.find();
        
        res.status(200).json(student);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
}