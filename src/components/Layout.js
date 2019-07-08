import React from "react";
import Bar from "./Appbar";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { withAuth } from "../context/AuthContext";
import transfer from "../images/Move-Money.png";
import cekSaldo from "../images/wallet.png";
import cekTransaksi from "../images/transaction.png";
import deposit from "../images/deposit.png";
import { Redirect } from "react-router-dom";

function Layout(props) {
    if (!props.isLoggedIn) return <Redirect push to="/" />;
    return (
        <div>
            <Bar />
            <Container component="main" maxWidth="lg">
                <div className="home">
                    <div className="home__body">
                        <div className="home__body-navigation">
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={8} md={8} lg={8}>
                                    <Grid container justify="flex-start">
                                        <a href="/transfer" className="btn">
                                            <img
                                                src={transfer}
                                                alt={transfer}
                                            />
                                            <span>Transfer</span>
                                        </a>
                                        <a href="/deposit" className="btn">
                                            <img src={deposit} alt={deposit} />
                                            <span>Deposit</span>
                                        </a>
                                        <a href="/wallet" className="btn">
                                            <img
                                                src={cekSaldo}
                                                alt={cekSaldo}
                                            />
                                            <span>Saldo</span>
                                        </a>
                                        <a href="/transaction" className="btn">
                                            <img
                                                src={cekTransaksi}
                                                alt={cekTransaksi}
                                            />
                                            <span>Transaksi</span>
                                        </a>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={4} md={4} lg={4}>
                                    <Grid container justify="flex-start">
                                        <div className="saldo">
                                            <p>Saldo kamu saat ini:</p>
                                            <h3 className="saldo__nominal">
                                                {props.saldo}
                                            </h3>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </div>
                {props.children}
            </Container>
        </div>
    );
}

export default withAuth(Layout);
