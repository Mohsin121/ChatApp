import { Outlet } from "react-router-dom";
import { Header } from "../Header";
import { Footer } from "../../Footer";

const AppLayOut = () => {
  return (
    <div>
      <div className="">
        <Header />
      </div>
      <main>
        <Outlet />
      </main>

      <footer>{/* <Footer /> */}</footer>
    </div>
  );
};

export default AppLayOut;
