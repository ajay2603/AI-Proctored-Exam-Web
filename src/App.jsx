import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Auth from "./pages/Auth";
import UserRoutes from "./pages/Routes";
export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/*" element={<UserRoutes />} />
        </Routes>
      </Router>
    </Provider>
  );
}
