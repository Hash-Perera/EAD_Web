import React from "react";

const Login = () => {
  return (
    <div
      className="bg-light py-3  py-md-5"
      style={{ height: "100vh", alignContent: "center" }}
    >
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-12 col-md-11 col-lg-8 col-xl-7 col-xxl-6">
            <div className="bg-white p-4 p-md-5 rounded shadow-sm">
              <div className="row">
                <div className="col-12">
                  <div className="mb-5">
                    <h3>Log in</h3>
                  </div>
                </div>
              </div>
              <form action="/dashboard/home">
                <div className="row gy-3 gy-md-4 overflow-hidden">
                  <div className="col-12">
                    <label htmlFor="email" className="form-label">
                      Email <span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      id="email"
                      placeholder="name@example.com"
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="password" className="form-label">
                      Password <span className="text-danger">*</span>
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      id="password"
                      required
                    />
                  </div>

                  <div className="col-12">
                    <div className="d-grid">
                      <a href="/dashboard/home">
                        <button
                          className="btn btn-lg btn-primary"
                          type="submit"
                        >
                          Log in now
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
              </form>
              <div className="row">
                <div className="col-12">
                  <hr className="mt-5 mb-4 border-secondary-subtle" />
                  <div className="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-end">
                    <a
                      href="/register"
                      className="link-secondary text-decoration-none"
                    >
                      Create new account
                    </a>
                    <a
                      href="#!"
                      className="link-secondary text-decoration-none"
                    >
                      Forgot password
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
