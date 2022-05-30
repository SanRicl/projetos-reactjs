import React from "react";
import './postCard.css'

const PostCard = ({post}) => {
  return (
    <div  className="postCard" key={post.id} >
      <div className="postImg" >
        <img src={post.cover} alt={post.title} />
      </div>
      <div className="postInfo" >
        <h2  >{post.title}</h2>
        <p>{post.body}</p>
      </div>
    </div>
  );
};

export default PostCard;
