import React from "react";
import RouterPage from "./routers";
import { Provider } from "react-redux";
import store from "./store";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <RouterPage />
      </div>
    </Provider>
  );
}

export default App;
