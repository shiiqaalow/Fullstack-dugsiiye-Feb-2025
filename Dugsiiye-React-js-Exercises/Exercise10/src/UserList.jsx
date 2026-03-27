const userList = ({user})=> {
    return(
        <div>
            {
                user && user.length > 0 ? (
                 user.map((u)=>(
                    <p key={u.id}><strong>{u.name}</strong><span> ({u.email})</span></p>
                 ))
                ) : (
                    <p> 😌 No Users Found</p>
                )
            }
            
        </div>

    )
}
export default userList

