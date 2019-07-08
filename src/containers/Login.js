import React from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import wallet from "../images/wallet.png";
import { withAuth } from "../context/AuthContext";
import { Redirect } from "react-router-dom";
import "./styles/login.scss";

class Login extends React.Component {
    state = {
        usernameORemail: "",
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
        this.props.actionLogin(this.state);
    };

    render() {
        if (this.props.isLoggedIn) return <Redirect push to="/home" />;

        const background = {
            backgroundImage: `url("${wallet}")`,
            backgroundSize: 400,
            backgroundPosition: `140px 120px`,
            backgroundRepeat: `no-repeat`
        };
        return (
            <Container component="main" maxWidth="xs">
                <div className="login">
                    <div className="login__header">
                        <img src={wallet} alt={wallet} />
                        <div className="login__header-title">
                            <h3>APLIKASI WALLET SEDERHANA</h3>
                            <p>Masuk ke akun anda.</p>
                        </div>
                    </div>
                    <div className="login__body" style={background}>
                        <form onSubmit={this.handleSubmit} noValidate>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="usernameORemail"
                                label="Username/Email"
                                name="usernameORemail"
                                autoComplete="Username/Email"
                                onChange={this.handleChange}
                                value={this.state.usernameORemail}
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
                        <Link href="register" variant="body2">
                            {"Tidak memiliki akun? Daftar disini."}
                        </Link>
                    </div>
                </div>
            </Container>
        );
    }
}

export default withAuth(Login);
