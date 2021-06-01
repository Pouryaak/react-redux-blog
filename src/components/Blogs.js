import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInput, setBlogData } from "../features/userSlice";
import "../styles/blogs.css";

export const Blogs = () => {
  const searchInput = useSelector(selectUserInput);
  const [blogs, setBlogs] = useState([]);
  const blog_url = `https://gnews.io/api/v4/search?q=${searchInput}&token=a8deeb318d8d973cd75a37f80d6fa4ba`;
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(blog_url)
      .then((resp) => {
        dispatch(setBlogData(resp.data));
        setBlogs(resp.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [searchInput]);

  return (
    <div className={"blog__page"}>
      <h1 className="blog__page__header">Blogs</h1>
      {isLoading && <h1 className="loading">Loading...</h1>}
      <div className="blogs">
        {blogs?.articles?.map((blog) => (
          <a className="blog" target="_blank" href={blog.url}>
            <img src={blog.image} alt="" />
            <div>
              <h3 className="sourceName">
                <span>{blog.source.name}</span>
                <p>{blog.publishedAt}</p>
              </h3>
              <h1>{blog.title}</h1>
              <p>{blog.description}</p>
            </div>
          </a>
        ))}
        {blogs?.totalArticles === 0 && (
          <h1>No blogs available. Search something else to read!</h1>
        )}
      </div>
    </div>
  );
};
