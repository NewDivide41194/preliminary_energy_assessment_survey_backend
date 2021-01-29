const {surveydb} = require("../database");

const getQuestion = (buildingId) => { // console.log("building id is", buildingId)
    return surveydb.getQuestion(buildingId)
    // .then((data) => {
    //     if (data.length > 0) {
    //       const result = data.reduce((r, c) => {
    //         const R = [...r];
    //         const index = R.findIndex(
    //           (v) => v.survey_header_id == c.survey_header_id
    //         );

    //         if (index === -1) {
    //           R.push({
    //             survey_header_id: c.survey_header_id,
    //             survey_name: c.survey_name,
    //             survey_sections: [
    //               {
    //                 survey_section_id: c.survey_section_id,
    //                 section_name: c.section_name,
    //                 question : [
    //                     {
    //                         question_name: c.remark,
    //                         question_id: c.active
    //                     }
    //                 ]
    //               },
    //             ]
    //           });

    //         }else {
    //             console.log(R[index].survey_sections[R[index].survey_sections.length-1], 'length...')
    //             R[index].survey_sections.push({
    //                 survey_section_id: c.survey_section_id,
    //                 section_name: c.section_name
    //             })
    //             // R[index].survey_sections[R[index].survey_sections[R[index].survey_sections.length+1]].question.push({
    //             //     question_name: c.remark,
    //             //             question_id: c.active
    //             // })
    //             R[index].survey_sections[R[index].survey_sections.length-1].question.push({
    //                 aa: 23
    //             })
    //         }

    //         // else {
    //         //   const index2 = R.findIndex(
    //         //     (v) => v.survey_sections.survey_section_id == c.survey_section_id
    //         //   );

    //         //   if (index2 === -1) {
    //         //     R.push({
    //         //       survey_sections: [
    //         //         {
    //         //           survey_section_id: c.survey_section_id,
    //         //           section_name: c.section_name,
    //         //         },
    //         //       ],
    //         //     });
    //         //   }
    //         //   else {
    //         //     R[index].survery_sections.push([
    //         //       {
    //         //         survey_section_id: c.survey_section_id,
    //         //         section_name: c.section_name,
    //         //       },
    //         //     ]);
    //         //   }
    //         // }

    //         return R;
    //       }, []);
    //       //console.log(result, "res");
    //       return result;
    //     }
    // });
};

module.exports = {
    getQuestion
};
