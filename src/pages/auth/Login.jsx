import { Link } from "react-router-dom";
const Login = () => {
  return (
    <>
      <div className="max-w-md h-screen flex justify-center items-center bg-gray-100 p-3">
        <div className="w-full bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="flex flex-col gap-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
              >
                Login
              </button>
            </div>
            <div>
              <p className="text-sm text-gray-600 mt-4 text-center">
                Don't have an account?{" "}
                              <Link to="/register" className="text-blue-500 hover:underline">Register here</Link>

              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
