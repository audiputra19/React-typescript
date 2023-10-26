import Post from "./Post";

const Searchlist = ({result}) => {
    const resultPost = result.map(post => <Post key={post.id} post={post} />)

    const content = resultPost?.length ? resultPost : <div>No Matching</div>

    return (
        <div>{content}</div>
    )
} 

export default Searchlist;