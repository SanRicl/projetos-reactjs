import './button.css'

const Button = ({noMorePosts, loadMorePosts}) => {
  return (
    <button disabled={noMorePosts} onClick={loadMorePosts}>
    Carregar mais posts
  </button>
  )
}

export default Button