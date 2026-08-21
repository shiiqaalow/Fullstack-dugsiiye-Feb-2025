interface usernameProps {
    params: {
        username: string
    }
}

const username = ({params}: usernameProps) => {
  return (
    <div>
      <span> Welcome: </span>
      <span className="font-bold uppercase">
        {params.username}
      </span>
    </div>
  )
}

export default username