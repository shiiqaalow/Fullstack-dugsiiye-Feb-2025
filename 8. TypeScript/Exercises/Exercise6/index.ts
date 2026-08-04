// 1: userRole enum usage

enum userRole {
    superAdmin = "superAdmin",
    moderator = "moderator",
    viewer = "viewer"
}

const canEdit = (role: userRole) => {
    if (role === userRole.superAdmin || role === userRole.moderator) {
        return true;
        console.log('true');
    }
    return false;
    console.log('false');

}

console.log('SuperAdmin:', 
    canEdit(userRole.superAdmin)
);
console.log('Moderator:', 
    canEdit(userRole.moderator)
);
console.log('Viewer:', 
    canEdit(userRole.viewer)
);


const button = document.querySelector('button') as HTMLButtonElement;
button.disabled = true;
