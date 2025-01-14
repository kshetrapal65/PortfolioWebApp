import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboards from "./Component/Dashboards";
import { BrowserRouter } from "react-router-dom";
import { getToken } from "./Component/Helper/Storage";
import PrivateRoute from "./Routes/PrivateRoute";
import { PublicRoute } from "./Routes/PublicRoute";
import { Toaster } from "react-hot-toast";
import UserDashboard from "./Component/UserDashboard";
import Mui from "./Component/Mui";

function App() {
  const token = getToken();
  return (
    <div className="App">
      {/* <Dashboards /> */}
      {/* <UserDashboard /> */}
      {/* <Mui /> */}
      <Toaster position="top-center" reverseOrder={false} />
      <BrowserRouter>
        {token ? <PrivateRoute /> : <PublicRoute />}
      </BrowserRouter>
    </div>
  );
}

export default App;
