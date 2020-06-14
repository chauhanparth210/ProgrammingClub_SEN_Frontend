import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiCubeOutline } from "@mdi/js";
import './styles/styles.scss'

const Home = () => (
  <div className="homepage font">
    <Fragment>
      <Helmet>
        <title>Home - Quiz App</title>
      </Helmet>
      <div id="home">
        <section>
          <div style={{ textAlign: "center" }}>
            <Icon path={mdiCubeOutline} size={5} />
          </div>
          <h1>Tech-Quiz</h1>
          <br/>
          <div className="play-button-container">
            <Link className="play-button" to="/play/instructions">
              Play
            </Link>
          </div>
        </section>
      </div>
    </Fragment>
  </div>
);

export default Home;
