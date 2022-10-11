const  isBlocked = (user) =>{
    if (user?.isBlocked) {
        throw new Error(`Access Denied!, ${user?.firstname} is blocked `);
    }
    
}

module.exports = isBlocked;