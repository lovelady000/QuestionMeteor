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
Meteor.onConnection(function (connection) {
    let ip = ["127.0.0.1","14.162.217.59", "117.4.255.74"];
    if (ip.indexOf(connection.clientAddress) == -1) {
        console.log('band ip');
        connection.close();
    } else {
        //console.log(connection.clientAddress);
        //connection.close();

    }
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
