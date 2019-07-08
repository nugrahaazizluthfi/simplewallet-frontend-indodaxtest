import React, { Component } from "react";
import axios from "axios";
import swal from "sweetalert";

const requestData = axios.create();
const AuthContext = React.createContext();

// Konfigurasi Axios
requestData.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export class AuthContextProvider extends Component {
    constructor() {
        super();
        this.state = {
            userdata: [],
            wallet_address: "",
            saldo: 0,
            last_transaction: "",
            token: localStorage.getItem("token") || "",
            isLoggedIn: localStorage.getItem("token") === null ? false : true,
            URL: process.env.REACT_APP_API_URL
        };
    }

    // initial user
    _initialUser = () => {
        return requestData.get(`${this.state.URL}userinfo`).then(response => {
            const { user, saldo, wallet_address } = response.data.data;
            this.setState({ userdata: user, saldo, wallet_address });
            return response;
        });
    };

    // login
    _actionLogin = credentials => {
        let self = this;

        return requestData
            .post(`${this.state.URL}login`, credentials)
            .then(response => {
                const { token } = response.data.data;

                localStorage.setItem("token", token);

                this.setState({
                    token,
                    isLoggedIn: true
                });

                return true;
            })
            .catch(function(error) {
                if (error.response) {
                    var myhtml = document.createElement("div");
                    let htmlText = "";

                    if(error.response.data.message.validation)
                    {
                        error.response.data.message.validation.map(function(
                            item,
                            index
                        ) {
                            if (item.password) {
                                htmlText += "<p>" + item.password + "<p>";
                            }
    
                            if (item.usernameORemail) {
                                htmlText += "<p>" + item.usernameORemail + "<p>";
                            }
    
                            if (item.credentials) {
                                htmlText += "<p>" + item.credentials + "<p>";
                            }
                        });
    
                        myhtml.innerHTML = htmlText;
                    }

                    swal({
                        title: "Ooops",
                        content: myhtml,
                        type: "danger",
                        showCancelButton: false,
                        closeOnConfirm: true,
                        showLoaderOnConfirm: true
                    });
                }
            });
    };

    // register
    _actionRegister = credentials => {
        let self = this;

        return requestData
            .post(`${this.state.URL}register`, credentials)
            .then(response => {
                const { token } = response.data.data;

                localStorage.setItem("token", token);

                this.setState({
                    token,
                    isLoggedIn: true
                });

                return true;
            })
            .catch(function(error) {
                if (error.response) {
                    var myhtml = document.createElement("div");
                    let htmlText = "";

                    if(error.response.data.message.validation)
                    {
                        error.response.data.message.validation.map(function(
                            item,
                            index
                        ) {
                            if (item.name) {
                                htmlText += "<p>" + item.name + "<p>";
                            }
    
                            if (item.username) {
                                htmlText += "<p>" + item.username + "<p>";
                            }
    
                            if (item.email) {
                                htmlText += "<p>" + item.email + "<p>";
                            }
    
                            if (item.password) {
                                htmlText += "<p>" + item.password + "<p>";
                            }
                        });
                    }

                    myhtml.innerHTML = htmlText;

                    swal({
                        title: "Ooops",
                        content: myhtml,
                        type: "danger",
                        showCancelButton: false,
                        closeOnConfirm: true,
                        showLoaderOnConfirm: true
                    });
                }
            });
    };

    // logout
    _actionLogout = () => {
        return requestData
            .post(`${this.state.URL}logout`, {})
            .then(response => {
                localStorage.removeItem("token");
                this.setState({
                    isLoggedIn: false,
                    saldo: 0,
                    userdata: []
                });

                return true;
            });

        return console.log("Logout!");
    };

    _setBalance = saldo => {
        this.setState({
            saldo
        });
    };

    render() {
        return (
            <AuthContext.Provider
                value={{
                    actionLogin: this._actionLogin,
                    actionRegister: this._actionRegister,
                    actionLogout: this._actionLogout,
                    initialUser: this._initialUser,
                    setBalance: this._setBalance,
                    ...this.state
                }}
            >
                {this.props.children}
            </AuthContext.Provider>
        );
    }
}

// HOC Auth
export const withAuth = WrappedComponent => {
    return class extends Component {
        render() {
            return (
                <AuthContext.Consumer>
                    {context => (
                        <WrappedComponent {...this.props} {...context} />
                    )}
                </AuthContext.Consumer>
            );
        }
    };
};
