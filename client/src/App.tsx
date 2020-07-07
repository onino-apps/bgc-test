import React from "react";
import { RideProvider } from "./providers/RideProvider";
import { Home } from "./views/Home/Home";

export const App: React.FC<{}> = () => (
  <RideProvider>
      <Home />
  </RideProvider>
);

export default App;