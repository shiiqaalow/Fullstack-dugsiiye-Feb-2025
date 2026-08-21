interface blogPageProps {
    params: {
        slug: string[]
    }
}

const blogPage = ({params}: blogPageProps) => {
  return (
    <div>
      <span> You have visited: </span>
      <span className="font-bold lowercase">
        {params.slug.join('/')}
      </span>
    </div>
  )
}

export default blogPage