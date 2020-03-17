import React from "react";
import RouterPage from "./routers";
import { Provider } from "react-redux";
import store from "./store";

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
