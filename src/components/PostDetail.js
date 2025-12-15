import { Link } from "react-router-dom";

import styles from "./PostDetail.module.css";

const PostDetail = ({ post }) => {
  return (
    <div className={styles.post_detail}>
      <p className={styles.createdby}>por: {post.createdBy}</p>
      <img src={post.image} alt={post.title} />
      <h2>{post.title}</h2>
      
      <div className={styles.tags}>
        {post.tagsArray.map((tag) => (
          <p key={tag}>
            <span>#</span>
            {tag}
          </p>
        ))}
      </div>
      <Link to={`/posts/${post.id}`} className="btn1">
        Ler
      </Link>
    </div>
  );
};

export default PostDetail;



