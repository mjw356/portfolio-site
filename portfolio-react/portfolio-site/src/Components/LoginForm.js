function LoginForm({setIsAuthenticated, setAuthToken}) {
    const backend = process.env.REACT_APP_BACKEND;
    console.log(`backend ${backend}`);

    function handleSubmit(e) {
        // Prevent the browser from reloading the page
        e.preventDefault();
    
        // Read the form data
        const form = e.target;
        const formData = new FormData(form);
        console.log(formData);
    
        const formJson = Object.fromEntries(formData.entries())
        // You can pass formData as a fetch body directly:
        fetch(backend + '/login/',
            {
                headers: new Headers({'content-type': 'application/json'}),
                method: form.method,
                body: JSON.stringify(formJson)
            })
        .then((res) => res.json() )
        .then((jsonResp) => {
            console.log(jsonResp);
            setAuthToken(jsonResp.token);
            setIsAuthenticated(true);
        })
      }

    return (
    <div className="row justify-content-sm-center h-100">
        <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9 my-auto">
            <div className="card">
                <div className="card-body p-5">
                    <h1 className="fs-4 card-title fw-bold mb-4">Login</h1>
                    <form method="POST" className="needs-validation" onSubmit={handleSubmit} novalidate="" autocomplete="off">
                        <div className="mb-3">
                            <label className="mb-2 text-muted" for="email">Username</label>
                            <input id="username" type="text" className="form-control" name="username" required />
                            <div className="invalid-feedback">
                                Email is invalid
                            </div>
                        </div>

                        <div className="mb-3">
                            <div className="mb-2 w-100">
                                <label className="text-muted" for="password">Password</label>
                            </div>
                            <input id="password" type="password" className="form-control" name="password" required />
                            <div className="invalid-feedback">
                                Password is required
                            </div>
                        </div>

                        <div className="d-flex text-center">
                            <button type="submit" className="btn btn-primary ms-auto">
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  );
}

export default LoginForm;
