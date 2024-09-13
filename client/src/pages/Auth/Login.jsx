import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { failureToaster, successToaster } from "../../utils/swal";
import { Spinner } from "@material-tailwind/react";
import { SignIn } from "../../services/Auth.service";

const login = () => {
  const navigate = useNavigate();
  const [body, setBody] = useState({
    email: "",
    password: "",
  });

  const { mutateAsync: handleSubmit, isPending } = useMutation({
    mutationFn: () => {
      return SignIn(body);
    },
    onSuccess: (data) => {
      successToaster("Login Successfully");
      localStorage.setItem("token", data.user.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/users");
    },
    onError: (error) => {
      failureToaster(error.message);
      console.log("Mutation error for login ", error);
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit();
  };
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Login
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  onChange={(e) => setBody({ ...body, email: e.target.value })}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) =>
                    setBody({ ...body, password: e.target.value })
                  }
                />
              </div>

              <button
                type="submit"
                className="w-full text-white bg-blue-gray-600 p-2 border-r-2 d-flex items-center justify-center"
              >
                {!isPending && "Login"}
                {isPending && <Spinner className="h-7 w-7 items-center" />}
              </button>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                i dont have an account?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default login;
