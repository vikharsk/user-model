// const { ValidationResult } = require('express.validator');
const User = require('../models/user_upload');
const File = require('../models/images');

exports.saveData = async(req, res, next) => {
    console.log('Yes i call');
    try {
        
                let body = { ...req.body};
                
                let emailExists = await User.findOne({
                     email: body.email.toLowerCase()
                });
                // console.log(emailExists);
                if (emailExists) {
                    // db.close();
                    return res.status(200).json({
                        status: false,
                        errors: body.email.toLowerCase() + ' Already Exists!'
                    });
                } // end of if

                let mobilExists = await User.findOne({
                    mobile_no: body.mobile_no.toLowerCase()
               });
               // console.log(emailExists);
               if (mobilExists) {
                   // db.close();
                   return res.status(200).json({
                       status: false,
                       errors: body.mobile_no.toLowerCase() + 'mobile Already Exists!'
                   });
               } // end of if
        let UserData = new User({
            ... body
        });
        // console.log('yes', UserData); return;
        let rs = await UserData.save();
        console.log('body', rs);

        if(rs)
        return res.status(200).json({
            status: rs? true : false,
            result: rs 
        })
    } catch (error) {
        console.log(error);
    }
}//end of function

exports.LoginUser = async(req, res, next) => {
    try {
        
                let body = { ...req.body};
                
                let getlogin = await User.findOne({
                     email: body.email.toLowerCase(),
                     password: body.password
                });
                // console.log(emailExists);
                if(!getlogin){
                    return res.status(200).json({
                        status: false,
                        errors: 'Someting went wrong...'
                    });
                }
    

        if(getlogin)
        return res.status(200).json({
            status: getlogin? true : false,
            result: getlogin 
        })
    } catch (error) {
        console.log(error);
    }
}//end of function


// update Photo
exports.UploadProfile = async (req, res, next) => {
    console.log("req.body")
    console.log(req.body)
    console.log("from update. opip...")
    try {
        // check for errors
      
      

        let body = { ...req.body };
        let user_id = body.user_id;
        console.log('body', req.file);
        let rs;

        let output

        let tmpData
        
       
            let filename;
            
            if (req.file) {
                body.file_name = req.file.originalname
            }

           
           // get master flag
           let postFixNo = await File.findOne({}).sort({ post_fix_no: -1 });

           if (postFixNo){
                body['post_fix_no'] = +postFixNo.post_fix_no + 1;
                body['short_code'] = 'aura'+body.post_fix_no;
           }else{
                body['post_fix_no'] = 1;
                body['short_code'] = 'aura'+body.post_fix_no;
           }

           let fileData = new File(body);
        //    console.log('fileData', fileData); return;
           rs = await fileData.save();

          if(rs){
            res.status(200).json({
                status: rs ? true : false,
                result: rs,
                message: rs ? 'Information Saved' : null,
            })
          }

    }
    catch (error) {
        next(error);
    } // end of try catch

}

exports.getUserUploadImage = async(req, res, next) => {
    try {
        
                console.log('req.params.id', req.query.userId);
                
                let getUserFiles = await File.find({
                     user_id:  req.query.userId
                });
                // console.log(emailExists);
    

        if(getUserFiles)
        return res.status(200).json({
            status: getUserFiles? true : false,
            data: getUserFiles 
        })
    } catch (error) {
        console.log(error);
    }
}//end of function

exports.deleteUserUploadImage = async(req, res, next) => {
    try {
        
                console.log('req.params.id', req.params.id);
                
                let deleteUserFiles = await File.deleteOne({
                     _id:  req.params.id
                });
                // console.log(emailExists);
    

        if(deleteUserFiles)
        return res.status(200).json({
            status: deleteUserFiles? true : false
        })
    } catch (error) {
        console.log(error);
    }
}//end of function