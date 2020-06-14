import React, { Component } from "react";
import "./style.scss";
import axios from "axios";
import { SERVER_URL } from "../../../utils/constants";
import { NavLink } from "react-router-dom";

class DisplayBlog extends Component {
  state = {
    posts: [],
    filteredList: []
  };

  componentDidMount() {
    axios.get(`${SERVER_URL}/post`).then(posts => {
      const { data } = posts;
      this.setState({
        posts: data,
        filteredList: data
      });
      // console.log(this.state.posts);
    });
  }

  deleteBlogPost = id => {
    axios
      .delete(`${SERVER_URL}/post/${id}`)
      .then(post => {
        console.log("deleted Post");
        this.setState({
          posts: this.state.posts.filter(post => {
            console.log(post);
            return post._id !== id;
          })
        });
      })
      .catch(err => console.log(err));
    // console.log(id);
  };
  changeHandler = e => {
    let currentList = [];
    let newList = [];
    if (e.target.value !== "") {
      currentList = this.state.filteredList;
      newList = currentList.filter(item => {
        const itemLC = item.title.toLowerCase();
        const filter = e.target.value.toLowerCase();
        return itemLC.includes(filter);
      });
    } else {
      newList = this.state.filteredList;
    }
    this.setState({ posts: newList });
  };
  render() {
    const { posts } = this.state;
    return (
      <div className="blogs">
        <input
          className="form__input padding-up"
          type="text"
          placeholder="Search..."
          onChange={this.changeHandler}
        />
        {posts.map(post => (
          <div className="blog__card" key={post._id}>
            <NavLink
              to={"/blog/" + post._id}
              style={{ textDecoration: "none" }}
            >
              <div className="blog__card--title">{post.title}</div>
            </NavLink>
            <div className="blog__card--oneline">
              <div className="blog__card--likes">
                {" "}
                Claps : <span style={{ fontWeight: "bold" }}>{post.likes}</span>
              </div>
              <div style={{ display: "flex" }}>
                {/* <div className="blog__card--button ">Read more</div> */}
                <div
                  className="blog__card--button"
                  onClick={() => {
                    this.deleteBlogPost(post._id);
                  }}
                >
                  Delete
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default DisplayBlog;
