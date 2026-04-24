const UserCard = ({name,Email,role}) => {
    return(
        <div className="card">
            <img src="🤵‍♂️" alt="" />
            <h2>{name}</h2>
            <p>{Email}</p>
            <p>{role}</p>
        </div>
    )
}
export default UserCard