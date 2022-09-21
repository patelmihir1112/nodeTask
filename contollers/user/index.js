var User = require('../../models/user');

const bcrypt = require('bcryptjs');
let db =  require("../../database")

exports.index = async (req, res, next) => {
    try {
        let searchString =req.query.search;
        let user;
        if(searchString){
            user = await User.find({$text: {$search: searchString}}).populate('Role',"roleName moduleList");
        }else{
         user = await User.find().populate('Role',"roleName moduleList");
        }
        if(user){
            return res.json({
                status: 200,
                success: true,
                data : user,
            });

        }else{
            return res.json({
                status: 201,
                success: false,
            });
        }

    } catch (error) {
        console.log(error);
        next(error)
    }
};

exports.getDataById= async (req, res, next) => {
    try {
        let user = await User.findById(req.params.id).populate('Role',"roleName moduleList");
        if(user){
            return res.json({
                status: 200,
                success: true,
                data : user,
            });

        }else{
            return res.json({
                status: 201,
                success: false,
            });
        }

    } catch (error) {
        console.log(error);
        next(error)
    }
   
};

exports.create= async (req, res, next) => {
    try {
        if(!req.body.email){
            return res.json({
                status: 201,
                success: false,
                msg: "Email is Require.",
              });
        }
        if(!req.body.passWord){
            return res.json({
                status: 201,
                success: false,
                msg: "Password is Require.",
              });
        }
        let isSameEmail = await User.find({email : req.body.email});
        if(isSameEmail.length){
            return res.json({
                status: 200,
                success: true,
                msg: "Email is already  register",
              });
        }
        let hashpassword = await bcrypt.hash(req.body.passWord, 10);
        console.log(hashpassword)

        var newUser = new User();
        newUser.username = req.body.username;
        newUser.email = req.body.email;
        newUser.passWord = hashpassword;
        newUser.Role = req.body.Role;
        let user = await newUser.save();
        if(user){
            return res.json({
                status: 200,
                success: true,
                data : user,
                msg: "User Created Successfully",
            });

        }else{
            return res.json({
                status: 201,
                success: false,
                msg: "User Not Created",
            });
        }
      
    } catch (error) {
        console.log(error)
        next(error);
    }
  
};

exports.update= async (req, res, next) => {
    try {
        let user = await User.findByIdAndUpdate(req.params.id);
        if(user){
            user.username = req.body.username ? req.body.username : user.username ; 
            user.email = req.body.email ? req.body.email : user.email;
            user.passWord = req.body.passWord ? req.body.passWord : user.passWord;
            user.Role = req.body.Role ? req.body.Role : user.Role;
            // user.active = req.body.active == undefined ? user.active :req.body.active;
            let uodatedUser = await user.save();
            if(uodatedUser){
                return res.json({
                    status: 200,
                    success: true,
                    data : uodatedUser,
                    msg: "User Created Successfully",
                });
    
            }else{
                return res.json({
                    status: 201,
                    success: false,
                    msg: "User Not Created",
                });
            }

        }else{
            return res.json({
                status: 201,
                success: false,
                msg: "Role Not Found",
            });
        }

      
    } catch (error) {
        console.log(error)
        next(error);
    }
     
};

exports.delete= async (req, res, next) => {
    try {
        let role = await Role.findByIdAndDelete(req.params.id);
        if(role){
            return res.json({
                status: 200,
                success: true,
                data : role,
            });

        }else{
            return res.json({
                status: 201,
                success: false,
            });
        }

    } catch (error) {
        console.log(error);
        next(error)
    }
};

exports.updateManyUser= async (req, res, next) => {
    try {
        if(!req.body.userName){
            return res.json({
                status: 201,
                success: false,
                msg: "user Name is Require.",
              });
        }
        if(!req.body.firstName){
            return res.json({
                status: 201,
                success: false,
                msg: "first Name is Require.",
              });
        }
        let updatedData =  await User.updateMany({ username:req.body.userName }, { $set: { firstName:req.body.firstName  }}) 
        if(updatedData){
            if(updatedData){
                return res.json({
                    status: 200,
                    success: true,
                    data : updatedData,
                    msg: "User updated Successfully",
                });
    
            }else{
                return res.json({
                    status: 201,
                    success: false,
                    msg: "User Not updated",
                });
            }

        }else{
            return res.json({
                status: 201,
                success: false,
                msg: "User Not Found",
            });
        }

      
    } catch (error) {
        console.log(error)
        next(error);
    }
     
};

exports.updateMultipleUser= async (req, res, next) => {
    try {
        var bulkOp = User.collection.initializeOrderedBulkOp();  
        let inputField = req.body;    
        for(let i =0;i<inputField.length;i++){
            let updateElement = {}
            if(inputField[i].username){
                updateElement.username = inputField[i].username
            }
            if(inputField[i].email){
                updateElement.email = inputField[i].email
            }
            console.log(updateElement)
            bulkOp.find({ '_id': inputField[i].userID }).update({ $set:updateElement});
        }
            let data = await bulkOp.execute();
            if(data){
                return res.json({
                    status: 200,
                    success: true,
                  });
            }else{
                return res.json({
                    status: 201,
                    success: false,
                  });
            }

             } catch (error) {
                  console.log(error)
                      next(error);
            }
     
};




