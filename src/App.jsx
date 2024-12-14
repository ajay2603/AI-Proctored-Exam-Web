import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Auth from "./pages/Auth";
import LandingPage from "./pages/LandingPage";
import UserRoutes from "./pages/UserRoutes";
export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/*" element={<UserRoutes />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Router>
    </Provider>
  );
}
