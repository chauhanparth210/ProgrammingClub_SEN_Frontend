import React, { Component } from "react";
import "./style.scss";
import axios from "axios";
import { SERVER_URL } from "../../../utils/constants";

class DisplayBlog extends Component {
  state = {
    comments: []
  };

  componentDidMount() {
    axios.get(`${SERVER_URL}/post`).then(posts => {
      const { data } = posts;
      this.setState({
        comments: data
      });
      console.log(this.state.comments);
    });
  }

  render() {
    return (
      <div className="blogs">
        <div className="blog__card">
          <div className="blog__card--title">Hello My Name is Parth</div>
          <div className="blog__card--oneline">
            <div className="blog__card--likes">
              {" "}
              Likes : <span style={{ fontWeight: "bold" }}>15</span>
            </div>
            <div style={{ display: "flex" }}>
              <div className="blog__card--button ">Read more</div>
              <div className="blog__card--button ">Delete</div>
            </div>
          </div>
        </div>
        <div className="blog__card">
          <div className="blog__card--title">Hello My Name is Parth</div>
          <div className="blog__card--oneline">
            <div className="blog__card--likes">
              {" "}
              Likes : <span style={{ fontWeight: "bold" }}>15</span>
            </div>
            <div style={{ display: "flex" }}>
              <div className="blog__card--button ">Read more</div>
              <div className="blog__card--button ">Delete</div>
            </div>
          </div>
        </div>
        <div className="blog__card">
          <div className="blog__card--title">Hello My Name is Parth</div>
          <div className="blog__card--oneline">
            <div className="blog__card--likes">
              {" "}
              Likes : <span style={{ fontWeight: "bold" }}>15</span>
            </div>
            <div style={{ display: "flex" }}>
              <div className="blog__card--button ">Read more</div>
              <div className="blog__card--button ">Delete</div>
            </div>
          </div>
        </div>
        <div className="blog__card">
          <div className="blog__card--title">Hello My Name is Parth</div>
          <div className="blog__card--oneline">
            <div className="blog__card--likes">
              {" "}
              Likes : <span style={{ fontWeight: "bold" }}>15</span>
            </div>
            <div style={{ display: "flex" }}>
              <div className="blog__card--button ">Read more</div>
              <div className="blog__card--button ">Delete</div>
            </div>
          </div>
        </div>
        <div className="blog__card">
          <div className="blog__card--title">Hello My Name is Parth</div>
          <div className="blog__card--oneline">
            <div className="blog__card--likes">
              {" "}
              Likes : <span style={{ fontWeight: "bold" }}>15</span>
            </div>
            <div style={{ display: "flex" }}>
              <div className="blog__card--button ">Read more</div>
              <div className="blog__card--button ">Delete</div>
            </div>
          </div>
        </div>
        <div className="blog__card">
          <div className="blog__card--title">Hello My Name is Parth</div>
          <div className="blog__card--oneline">
            <div className="blog__card--likes">
              {" "}
              Likes : <span style={{ fontWeight: "bold" }}>15</span>
            </div>
            <div style={{ display: "flex" }}>
              <div className="blog__card--button ">Read more</div>
              <div className="blog__card--button ">Delete</div>
            </div>
          </div>
        </div>
        <div className="blog__card">
          <div className="blog__card--title">Hello My Name is Parth</div>
          <div className="blog__card--oneline">
            <div className="blog__card--likes">
              {" "}
              Likes : <span style={{ fontWeight: "bold" }}>15</span>
            </div>
            <div style={{ display: "flex" }}>
              <div className="blog__card--button ">Read more</div>
              <div className="blog__card--button ">Delete</div>
            </div>
          </div>
        </div>
        <div className="blog__card">
          <div className="blog__card--title">Hello My Name is Parth</div>
          <div className="blog__card--oneline">
            <div className="blog__card--likes">
              {" "}
              Likes : <span style={{ fontWeight: "bold" }}>15</span>
            </div>
            <div style={{ display: "flex" }}>
              <div className="blog__card--button ">Read more</div>
              <div className="blog__card--button ">Delete</div>
            </div>
          </div>
        </div>
        <div className="blog__card">
          <div className="blog__card--title">Hello My Name is Parth</div>
          <div className="blog__card--oneline">
            <div className="blog__card--likes">
              {" "}
              Likes : <span style={{ fontWeight: "bold" }}>15</span>
            </div>
            <div style={{ display: "flex" }}>
              <div className="blog__card--button ">Read more</div>
              <div className="blog__card--button ">Delete</div>
            </div>
          </div>
        </div>
        <div className="blog__card">
          <div className="blog__card--title">Hello My Name is Parth</div>
          <div className="blog__card--oneline">
            <div className="blog__card--likes">
              {" "}
              Likes : <span style={{ fontWeight: "bold" }}>15</span>
            </div>
            <div style={{ display: "flex" }}>
              <div className="blog__card--button ">Read more</div>
              <div className="blog__card--button ">Delete</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DisplayBlog;
