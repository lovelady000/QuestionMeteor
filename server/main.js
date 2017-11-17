import { Meteor } from 'meteor/meteor';
import { Fields } from '../imports/api/fields';
import { Topics } from '../imports/api/topics';
import { Questions } from '../imports/api/questions';
Meteor.startup(() => {
    // code to run on server at startup
    Questions._ensureIndex(
        { "$**": "text" },
        { "name": "searchIndex" }
    );
});
// Meteor.publish("search-Questions", function (searchField) {
//     return Questions.find({ "$text": { "$search": searchField } },
//         {
//             fields: {
//                 score: { $meta: "textScore" }
//             },
//             sort: {
//                 score: { $meta: "textScore" }
//             }
//         });
// });
