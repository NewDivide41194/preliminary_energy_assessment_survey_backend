const {surveydb} = require("../database");
const response = require("../response/response");

const getAnswerForAdmin = (user_id,building_id) => {
    return surveydb.isAdmin(user_id,building_id).then(res=> {
        // console.log("res is",res[0].user_name)
        if (res[0].user_level_id == 1){
            return surveydb.getAnswerForAdmin(building_id);
        }else{
            return [null,res[0].user_name]
        }
    }).catch(err => (response({ success: false, message: err.toString() })));
   
};

module.exports = {
    getAnswerForAdmin
}
