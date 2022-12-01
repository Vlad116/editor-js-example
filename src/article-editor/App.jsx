import React from "react";
import uniqueId from "lodash/uniqueId";

import Editor from "./components/editor";

const App = ({ button }) => {
  return <Editor key={uniqueId()} />;
  // return [...button].map((btn) => <Editor key={uniqueId()} button={btn} />);
};

export default App;
