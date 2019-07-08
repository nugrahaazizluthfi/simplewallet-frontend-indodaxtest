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

class Deposit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
            .post(`${this.props.URL}deposit`, this.state)
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
                    amount: 0,
                    isLoading: false
                });

                return true;
            })
            .catch(function(error) {
                if (error.response) {
                    var myhtml = document.createElement("div");
                    let htmlText = "";

                    if (error.response.data.message.validation) {
                        error.response.data.message.validation.map(function(
                            item,
                            index
                        ) {
                            if (item.amount) {
                                htmlText += "<p>" + item.amount + "<p>";
                            }
                        });
                        myhtml.innerHTML = htmlText;
                    } else {
                        myhtml.innerHTML = error.response.data.message;
                    }

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
                                Deposit Saldo
                            </Button>
                        </div>
                    </form>
                </div>
            </Fragment>
        );
    }
}

export default withAuth(Deposit);
