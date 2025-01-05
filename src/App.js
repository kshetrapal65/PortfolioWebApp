import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboards from "./Component/Dashboards";
import { BrowserRouter } from "react-router-dom";
import { getToken } from "./Component/Helper/Storage";
import PrivateRoute from "./Routes/PrivateRoute";
import { PublicRoute } from "./Routes/PublicRoute";

function App() {
  const token = getToken();
  return (
    <div className="App">
      {/* <Dashboards /> */}
      <BrowserRouter>
        {token ? <PrivateRoute /> : <PublicRoute />}
      </BrowserRouter>
    </div>
  );
}

export default App;
