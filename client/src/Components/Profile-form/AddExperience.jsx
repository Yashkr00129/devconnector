import React, {useState} from "react";
import {addExperience} from "../../Store/Actions/profile";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router";
import Spinner from "../Layout/Spinner";
import Alert from "../Layout/Alert";

export default function AddExperience() {
    const auth = useSelector((state) => state.auth);
    const profile = useSelector((state) => state.profile);
    const alerts = useSelector((state) => state.alert);
    const navigate = useNavigate();
    React.useEffect(() => {
        if (!auth.loading && auth.isAuthenticated !== true) navigate("/login");
    }, [auth, navigate]);
    const [formData, setFormData] = useState({
        title: "",
        company: "",
        location: "",
        from: "",
        to: "",
        description: "",
        current: false,
    });

    const {title, company, location, from, to, description, current} = formData;
    const data = {
        title,
        company,
        location,
        from,
        to,
        description,
        current,
    };

    const onChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await addExperience(data);
            await navigate("/");
        } catch (e) {
        }
    };

    if (profile.loading || auth.loading) return <Spinner/>;
    return (
        <section className="container">
            <h1 className="large text-primary">Add An Experience</h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Add any developer/programming
                positions that you have had in the past
            </p>
            <form
                className="form"
                onSubmit={(e) => {
                    onSubmit(e);
                }}
            >
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* Job Title"
                        name="title"
                        required
                        value={title}
                        onChange={(e) => onChange(e)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* Company"
                        name="company"
                        required
                        value={company}
                        onChange={(e) => onChange(e)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Location"
                        name="location"
                        value={location}
                        onChange={(e) => onChange(e)}
                    />
                </div>
                <div className="form-group w-20">
                    <h4>From Date</h4>
                    <input
                        type="date"
                        name="from"
                        value={from}
                        onChange={(e) => onChange(e)}
                    />
                </div>
                <div className="form-group">
                    <p>
                        <input
                            type="checkbox"
                            name="current"
                            value={current}
                            onChange={() => setFormData({...formData, current: !current})}
                        />{" "}
                        Current Job
                    </p>
                </div>
                {!current ? (
                    <div className="form-group w-20">
                        <h4>To Date</h4>
                        <input
                            type="date"
                            name="to"
                            value={to}
                            onChange={(e) => onChange(e)}
                        />
                    </div>
                ) : null}
                <div className="form-group">
          <textarea
              name="description"
              cols="30"
              rows="5"
              placeholder="Job Description"
              value={description}
              onChange={(e) => onChange(e)}
          ></textarea>
                </div>
                {" "}
                {alerts.map((alert) => (
                    <Alert msg={alert.msg} key={alert.id}/>
                ))}
                <input type="submit" className="btn btn-primary my-1"/>
                <a className="btn btn-light my-1" href="/dashboard">
                    Go Back
                </a>
            </form>
        </section>
    );
}
