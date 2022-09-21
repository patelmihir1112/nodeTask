var express = require('express');
var Role = require('../../models/role') ;
var User = require("../../models/user")
var router = express.Router();

exports.index = async (req, res, next) => {
    try {
        let searchString =req.query.search;
        let role;
        if(searchString){
            role = await Role.find({$text: {$search: searchString}});
        }else{
            role = await Role.find();
        }
        
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

exports.getDataById= async (req, res, next) => {
    try {
        let role = await Role.findById(req.params.id);
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

exports.create= async (req, res, next) => {
    try {
        var newRole = new Role();
        newRole.roleName = req.body.roleName;
        newRole.moduleList = req.body.moduleList;
        newRole.active = req.body.active;
        let role = await newRole.save();
        if(role){
            return res.json({
                status: 200,
                success: true,
                data : role,
                msg: "Role Created Successfully",
            });

        }else{
            return res.json({
                status: 201,
                success: false,
                msg: "Role Not Created",
            });
        }
      
    } catch (error) {
        console.log(error)
        next(error);
    }
  
};

exports.update= async (req, res, next) => {
    try {
        let role = await Role.findByIdAndUpdate(req.params.id);
        if(role){
            role.roleName = req.body.roleName ? req.body.roleName : role.roleName ; 
            role.moduleList = req.body.moduleList ? req.body.moduleList : role.moduleList;
            role.active = req.body.active == undefined ? role.active :req.body.active;
            let uodatedRole = await role.save();
            if(uodatedRole){
                return res.json({
                    status: 200,
                    success: true,
                    data : uodatedRole,
                    msg: "Role Created Successfully",
                });
    
            }else{
                return res.json({
                    status: 201,
                    success: false,
                    msg: "Role Not Created",
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

exports.upademodule= async (req, res, next) => {
    try {
        if(!req.body.moduleList){
            return res.json({
                status: 201,
                success: false,
                msg: "moduleList is Require.",
              });
        }
        let role = await Role.findById(req.params.id);
        role.moduleList = req.body.moduleList
        role.save();
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

exports.deleteModule= async (req, res, next) => {
    try {
        if(!req.body.accessModule){
            return res.json({
                status: 201,
                success: false,
                msg: "accessModule is Require.",
              });
        }
        if(!req.body.roleId){
            return res.json({
                status: 201,
                success: false,
                msg: "role Id is Require.",
              });
        }
        let role = await Role.findById(req.body.roleId);
        let list = role.moduleList;
        const index = list.indexOf(req.body.accessModule);
        console.log(list,index)
        if(!index){
            return res.json({
                status: 201,
                success: false,
                msg: "access Module is Require.",
              });
        }
            if (index > -1) { 
                list.splice(index, 1);
        }
        role.moduleList = list
        role.save();     
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

exports.insertOnerole= async (req, res, next) => {
    try {
        if(!req.body.accessModule){
            return res.json({
                status: 201,
                success: false,
                msg: "accessModule is Require.",
              });
        }
        if(!req.body.roleId){
            return res.json({
                status: 201,
                success: false,
                msg: "role Id is Require.",
              });
        }
        let role = await Role.findById(req.body.roleId);
        let list = role.moduleList;
        const index = list.indexOf(req.body.accessModule);
        console.log(list,index)
        if(index != -1){
            return res.json({
                status: 200,
                success: true,
                msg: "access Module is alredy Present.",
              });
        }else{
            list.push(req.body.accessModule)
        }
        role.moduleList = list
        role.save();     
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

exports.checkForAcces= async (req, res, next) => {
    try {
        if(!req.body.userId){
            return res.json({
                status: 201,
                success: false,
                msg: "user  is Require.",
              });
        }
        if(!req.body.accessModule){
            return res.json({
                status: 201,
                success: false,
                msg: "access Module is Require.",
              });
        }

        let user = await User.findById(req.body.userId).populate("Role" ,"moduleList");
        if(user){
         let isPresent = user.Role.moduleList.includes(req.body.accessModule);
            return res.json({
                status: 200,
                success: true,
                access : isPresent,
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

