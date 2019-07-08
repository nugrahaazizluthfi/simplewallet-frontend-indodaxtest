import React from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import wallet from "../images/wallet.png";
import { withAuth } from "../context/AuthContext";
import { Redirect } from "react-router-dom";
import "./styles/login.scss";

class Register extends React.Component {
    state = {
        name: "",
        username: "",
        email: "",
        password: ""
    };

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.actionRegister(this.state);
    };

    render() {
        if (this.props.isLoggedIn) return <Redirect push to="/" />;

        const background = {
            backgroundImage: `url("${wallet}")`,
            backgroundSize: 400,
            backgroundPosition: `140px 120px`,
            backgroundRepeat: `no-repeat`
        };
        return (
            <Container component="main" maxWidth="xs">
                <div className="login" style={{ top: 10 }}>
                    <div className="login__header">
                        <img src={wallet} alt={wallet} />
                        <div className="login__header-title">
                            <h3>APLIKASI WALLET SEDERHANA</h3>
                            <p>Buat akun anda.</p>
                        </div>
                    </div>
                    <div className="login__body" style={background}>
                        <form onSubmit={this.handleSubmit} noValidate>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                name="name"
                                autoComplete="Name"
                                onChange={this.handleChange}
                                value={this.state.name}
                                autoFocus
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="Username"
                                label="Username"
                                name="username"
                                autoComplete="Username/Email"
                                onChange={this.handleChange}
                                value={this.state.username}
                                autoFocus
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="Email"
                                onChange={this.handleChange}
                                value={this.state.email}
                                autoFocus
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                onChange={this.handleChange}
                                value={this.state.password}
                                autoComplete="current-password"
                            />
                            <div className="login__body-submit">
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                >
                                    Sign In
                                </Button>
                            </div>
                        </form>
                    </div>
                    <div className="login__footer">
                        <Link href="/" variant="body2">
                            {"Sudah memiliki akun? Masuk disini."}
                        </Link>
                    </div>
                </div>
            </Container>
        );
    }
}

export default withAuth(Register);
