import React, { Fragment } from "react";
import { withAuth } from "../context/AuthContext";
import axios from "axios";
import Layout from "../components/Layout";
import Loading from "../components/Loading";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import "./styles/transfer.scss";
import swal from "sweetalert";

const requestData = axios.create();

// Konfigurasi Axios
requestData.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

class Transfer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            amount: 0,
            isLoading: false
        };
    }

    componentDidMount() {
        this.props.initialUser();
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({
            [name]: value.trim()
        });
    };

    handleSubmit = e => {
        e.preventDefault();

        this.setState({
            isLoading: true
        });

        let self = this;

        return requestData
            .post(`${this.props.URL}transfer`, this.state)
            .then(response => {
                swal({
                    title: "Yeaay",
                    text: response.data.message,
                    type: "danger",
                    showCancelButton: false,
                    closeOnConfirm: true,
                    showLoaderOnConfirm: true
                });

                self.props.setBalance(response.data.data.balance);

                self.setState({
                    username: "",
                    amount: 0,
                    isLoading: false
                });

                return true;
            })
            .catch(function(error) {
                var myhtml = document.createElement("div");
                let htmlText = "";

                if (error.response.data.message.validation) {
                    error.response.data.message.validation.map(function(
                        item,
                        index
                    ) {
                        if (item.username) {
                            htmlText += "<p>" + item.username + "<p>";
                        }
                        if (item.amount) {
                            htmlText += "<p>" + item.amount + "<p>";
                        }
                    });
                    myhtml.innerHTML = htmlText;
                } else {
                    myhtml.innerHTML = error.response.data.message;
                }

                if (error.response) {
                    swal({
                        title: "Ooops",
                        content: myhtml,
                        type: "danger",
                        showCancelButton: false,
                        closeOnConfirm: true,
                        showLoaderOnConfirm: true
                    });

                    self.setState({
                        isLoading: false
                    });
                }
            });
    };

    render() {
        return (
            <Fragment>
                <Loading open={this.state.isLoading} />
                <Layout />
                <div className="transfer">
                    <form onSubmit={this.handleSubmit} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Penerima"
                            name="username"
                            autoComplete="Penerima"
                            onChange={this.handleChange}
                            value={this.state.username}
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="amount"
                            label="nominal"
                            id="amount"
                            onChange={this.handleChange}
                            value={this.state.amount}
                            autoComplete="nominal"
                        />
                        <div className="login__body-submit">
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                            >
                                Transfer Saldo
                            </Button>
                        </div>
                    </form>
                </div>
            </Fragment>
        );
    }
}

export default withAuth(Transfer);
