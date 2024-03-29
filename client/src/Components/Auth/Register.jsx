import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Alert from "../Layout/Alert";
import {setAlert} from "../../Store/Actions/alert";
import {useSelector} from "react-redux";
import {register} from "../../Store/Actions/auth";
import {loadUser} from "../../Store/Actions/auth";

export const Register = () => {
    const alerts = useSelector((state) => state.alert);
    const auth = useSelector((state) => state.auth);
    const navigate = useNavigate();
    React.useEffect(() => {
        if (auth.isAuthenticated === true) {
            navigate("/dashboard");
        }
    }, [auth, navigate])

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: "",
    });
    const {name, email, password, password2} = formData;
    const onChange = (e) =>
        setFormData({...formData, [e.target.name]: e.target.value});
    const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== password2) {
            setAlert("Passwords do not match", "FAILED");
            await setFormData({
                name,
                email,
                password: "",
                password2: "",
            });
        } else {
            await register({name, email, password});
            await loadUser();
        }
    };

    return (
        <section className="container">
            {alerts.length > 0
                ? alerts.map((alert) => <Alert msg={alert.msg} key={alert.id}/>)
                : null}
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead">
                <i className="fas fa-user"></i> Create Your Account
            </p>
            <form className="form" onSubmit={(e) => onSubmit(e)}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={name}
                        required
                        onChange={(e) => onChange(e)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={email}
                        onChange={(e) => onChange(e)}
                    />
                    <small className="form-text">
                        This site uses Gravatar so if you want a profile image, use a
                        Gravatar email
                    </small>
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        minLength="6"
                        onChange={(e) => onChange(e)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="password2"
                        value={password2}
                        minLength="6"
                        onChange={(e) => onChange(e)}
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Register"/>
            </form>
            <p className="my-1">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
        </section>
    );
};
