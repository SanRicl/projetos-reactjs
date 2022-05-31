import { useCallback, useEffect, useState } from "react";
import "./home.css";
import Posts from "../../components/Posts/Posts";

import { loadPosts } from "../../utils/load-posts.";
import TextInput from "../../components/TextInput/TextInput";

import React from "react";
import Button from "../../components/Button/Button";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(3);
  const [searchValue, setSearchValue] = useState("");

  const noMorePosts = page + postsPerPage >= allPosts.length;

  const filteredPosts = !!searchValue
    ? allPosts.filter((post) => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase());
      })
    : posts;

  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    setPosts(posts);
    setPage(nextPage);
  };

  const handleLoadPosts = useCallback(async (page, postsPerPage) => {
    const postsAndPhotos = await loadPosts();

    setPosts(postsAndPhotos.slice(page, postsPerPage));
    setAllPosts(postsAndPhotos);
  }, []);

  useEffect(() => {
    handleLoadPosts(0, postsPerPage);
  }, [handleLoadPosts, postsPerPage]);

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  return (
    <>
      <div className="searchContainer">
        {!!searchValue && <h1>Pesquisando por: {searchValue}</h1>}
        <TextInput searchValue={searchValue} onChange={handleChange} />
      </div>

      {filteredPosts.length > 0 && <Posts posts={filteredPosts} />}
      {filteredPosts.length === 0 && <p>Nao existem posts</p>}

      {!searchValue && (
        <Button noMorePosts={noMorePosts} loadMorePosts={loadMorePosts}/>
      )}
    </>
  );
};

export default Home;
