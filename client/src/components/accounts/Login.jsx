import { Button, Typography, Avatar } from "@material-tailwind/react";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { useFormik } from "formik";
import * as Yup from "yup";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");
  const { user, fetchUser, emailPasswordLogin } = useContext(UserContext);

  // Handle Form Change
  const onFormInputChange = (event) => {
    setError("");
    formik.handleChange(event);
  };

  // Redirect to Main Page once Logged in
  const redirectNow = () => {
    const redirectTo = location.search.replace("?redirectTo=", "");
    navigate(redirectTo ? redirectTo : "/");
  };

  // Check if User already Logged in
  const loadUser = async () => {
    if (!user) {
      const fetchedUser = await fetchUser();
      if (fetchedUser) {
        redirectNow();
      }
    }
  };

  // Load User
  useEffect(() => {
    loadUser();
  }, []);

  // Handle Errors and Submission of Form
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required("Email is required to login.")
        .email("Invalid email."),
      password: Yup.string()
        .min(6, "Password to short.")
        .max(128, "Password too long.")
        .required("Password is required."),
    }),
    onSubmit: async (values) => {
      const { email, password } = values;
      try {
        const user = await emailPasswordLogin(email, password);
        if (user) {
          redirectNow();
        }
      } catch (error) {
        if (error.statusCode === 401) {
          setError("Invalid email/password.");
        } else {
          console.log(error.statusCode + " = " + error.message);
        }
      }
    },
  });

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 mt-8 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <Avatar
            className="w-12 h-12 mr-2"
            src="/images/logo.png"
            alt="logo"
          />
          Chat
          <span className="text-teal-400">Hub</span>
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <Typography
              variant="h1"
              className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
            >
              Sign in to your account
            </Typography>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={formik.handleSubmit}
            >
              {/* Email */}
              <div>
                <Typography className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </Typography>
                <input
                  name="email"
                  id="email"
                  className="outline-teal-400 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@email.com"
                  onChange={onFormInputChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />

                {/* Error Message */}
                {formik.touched.email && formik.errors.email ? (
                  <p className="mt-1 text-sm text-red-500">
                    {formik.errors.email}
                  </p>
                ) : null}
              </div>

              {/* Password */}
              <div>
                <Typography className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </Typography>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="outline-teal-400 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={onFormInputChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />

                {/* Error Message */}
                {formik.touched.password && formik.errors.password ? (
                  <p className="mt-1 text-sm text-red-500">
                    {formik.errors.password}
                  </p>
                ) : null}

                {error && (
                  <p
                    id="err"
                    style={{
                      display:
                        formik.touched.password && formik.errors.password
                          ? "none"
                          : "block",
                    }}
                    className="mt-1 text-sm text-red-500"
                  >
                    {error}
                  </p>
                )}
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <Typography className="text-sm text-gray-500 dark:text-gray-300">
                      Remember me
                    </Typography>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="shadow-none hover:shadow-none w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </Button>

              {/* Register Link */}
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link
                  to="/register"
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
}

export default Login;
