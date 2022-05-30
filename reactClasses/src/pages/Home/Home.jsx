import { Component } from "react";
import "./home.css";
import Posts from "../../components/Posts/Posts";

import { loadPosts } from "../../utils/load-posts.";
import TextInput from "../../components/TextInput/TextInput";

class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 3,
    searchValue: "",
  };

  loadMorePosts = () => {
    const { page, postsPerPage, allPosts, posts } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);

    posts.push(...nextPosts);

    this.setState({ posts, page: nextPage });
  };

  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;

    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos,
    });
  };

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ ...this.state, searchValue: value });
  };

  render() {
    const { posts, postsPerPage, page, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    const filteredPosts = !!searchValue
      ? allPosts.filter((post) => {
          return post.title.toLowerCase().includes(searchValue.toLowerCase());
        })
      : posts;

    return (
      <>
        <div className="searchContainer">
        {!!searchValue && <h1>Pesquisando por: {searchValue}</h1>}
        <TextInput searchValue={searchValue} onChange={this.handleChange}/>
        </div>

        {filteredPosts.length > 0 && <Posts posts={filteredPosts} />}
        {filteredPosts.length === 0 && <p>Nao existem posts</p>}

        {!searchValue && (
          <button disabled={noMorePosts} onClick={this.loadMorePosts}>
            Carregar mais posts
          </button>
        )}
      </>
    );
  }
}

export default Home;
