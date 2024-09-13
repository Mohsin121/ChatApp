import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import AppLayOut from "./components/Layout/AppLayout";
import Signup from "./pages/Auth/Signup";
import Login from "./pages/Auth/Login";
import Chat from "./pages/Chat";
import Users from "./pages/Users";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<AppLayOut />}>
        {/* <Route index element={<Home />} /> */}
        <Route path="signup" index element={<Signup />} />

        <Route path="login" element={<Login />} />
        <Route path="chat" element={<Chat />} />
        <Route path="users" element={<Users />} />
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
