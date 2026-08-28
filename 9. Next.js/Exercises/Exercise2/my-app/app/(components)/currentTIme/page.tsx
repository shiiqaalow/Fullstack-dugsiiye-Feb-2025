export const dynamic = 'force-dynamic'

const CurrentTime = async () => {
    const date = new Date().toLocaleTimeString()
    return (
        <div className="flex justify-center items-center gap-2 my-4 bg-gray-300 p-2 rounded-md">
            <h3>Current Server Time:</h3>
            <h1 className="text-xl font-bold">{date}</h1>
        </div>
    )
}

export default CurrentTime