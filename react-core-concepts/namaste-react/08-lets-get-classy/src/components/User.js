const User = ({ name }) => {
    return (
        <div className="user-card">
            <h2>Name: {name}</h2>
            <h2>Address: Mumbai</h2>
            <h3>Github: @darsh-webdev</h3>
        </div>
    )
}

export default User;