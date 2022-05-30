import './posts.css'
import PostCard from '../PostCard/PostCard'

const Posts = ({posts}) => {
  return (
    <div className="App" >
        {posts.map((post) => (
          <PostCard post={post} />
        ))}
      </div>
  )
}

export default Posts