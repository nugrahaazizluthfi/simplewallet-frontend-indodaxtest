import React, { Component } from "react";
import "typeface-roboto";
import { AuthContextProvider } from "./context/AuthContext";
import Login from "./containers/Login";
import Register from "./containers/Register";
import Home from "./containers/Home";
import Transfer from "./containers/Transfer";
import Deposit from "./containers/Deposit";
import Transaction from "./containers/Transaction";
import TransactionDetail from "./containers/TransactionDetail";
import Wallet from "./containers/Wallet";
import WalletDetail from "./containers/WalletDetail";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import dotenv from "dotenv";

dotenv.config();

class App extends Component {
    render() {
        return (
            <AuthContextProvider>
                <BrowserRouter>
                    <div className="App">
                        <header className="App-header">
                            <Route path="/" exact component={Login} />
                            <Route
                                path="/register"
                                exact
                                component={Register}
                            />
                            <Route path="/home" component={Home} />
                            <Route path="/transfer" component={Transfer} />
                            <Route path="/deposit" component={Deposit} />
                            <Route
                                exact
                                path="/transaction"
                                component={Transaction}
                            />
                            <Route
                                path="/transaction/:id"
                                component={TransactionDetail}
                            />
                            <Route exact path="/wallet" component={Wallet} />
                            <Route
                                path="/wallet/:id"
                                component={WalletDetail}
                            />
                        </header>
                    </div>
                </BrowserRouter>
            </AuthContextProvider>
        );
    }
}

export default App;
