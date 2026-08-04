"use strict";
// 1: userRole enum usage
var userRole;
(function (userRole) {
    userRole["superAdmin"] = "superAdmin";
    userRole["moderator"] = "moderator";
    userRole["viewer"] = "viewer";
})(userRole || (userRole = {}));
const canEdit = (role) => {
    if (role === userRole.superAdmin || role === userRole.moderator) {
        return true;
        console.log('true');
    }
    return false;
    console.log('false');
};
console.log('SuperAdmin:', canEdit(userRole.superAdmin));
console.log('Moderator:', canEdit(userRole.moderator));
console.log('Viewer:', canEdit(userRole.viewer));
