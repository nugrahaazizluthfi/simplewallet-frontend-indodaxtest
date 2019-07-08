import React, { Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import { withAuth } from "../context/AuthContext";
import $ from "jquery";
import CardData from "../components/Card";
import Layout from "../components/Layout";
import Loading from "../components/Loading";
import axios from "axios";
import swal from "sweetalert";
import NoData from "../components/NoData";

const requestData = axios.create();

// Konfigurasi Axios
requestData.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

class Wallet extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoading: true,
            balance: [],
            last_balance_id: "",
            paging: {}
        };
    }

    componentDidMount() {
        this.props.initialUser();
        this._loadLastbalance();
        this._loadTotal();
        window.addEventListener("scroll", () => this._loadMore());
    }

    _loadTotal = (type = "") => {
        let filterType = type !== "" ? "?filterType=" + type : "";

        return requestData
            .get(`${this.props.URL}saldo/total${filterType}`)
            .then(response => {
                const { total } = response.data.data;
                this.setState({
                    totalTransaksi: total
                });
                return true;
            });
    };

    _loadLastbalance = (type = "") => {
        let filterType = type !== "" ? "?filterType=" + type : "";

        return requestData
            .get(`${this.props.URL}saldo${filterType}`)
            .then(response => {
                const { data, other } = response.data;
                this.setState({
                    balance: data,
                    last_balance_id: other.last_balance_id,
                    isLoading: false
                });
                return true;
            });
    };

    _loadMore = () => {
        if (
            $(window).scrollTop() ===
            $(document).height() - $(window).height()
        ) {
            const self = this;

            const data = {
                last_balance_id: self.state.last_balance_id
            };

            const type = $("#filterType").val();

            if (type !== "") data.filterType = type;

            $.ajax({
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    Authorization: `Bearer ${this.props.token}`
                },
                url: `${this.props.URL}saldo`,
                data: data,
                type: "get",
                beforeSend() {
                    self.setState({
                        isLoading: true
                    });
                },
                success(response) {
                    const trans = self.state.balance;
                    const { other } = response;

                    if (other.next_data > 0) {
                        response.data.map((_x, i) => {
                            if (
                                !self.state.balance.some(el => el.id === _x.id)
                            ) {
                                trans.push(_x);
                            }
                        });

                        self.setState({
                            balance: trans,
                            last_balance_id: other.last_balance_id,
                            isLoading: false
                        });
                    } else {
                        swal("Ooops...Kamu sudah mencapai data terakhir!").then(
                            value => {
                                if (value) {
                                    self.setState({
                                        isLoading: false
                                    });
                                }
                            }
                        );
                    }
                },
                error(jqXHR, textStatus, errorThrown) {}
            });
        }
    };

    onChange(e) {
        this.setState({
            isLoading: true
        });
        this._loadLastbalance(e.target.value);
        this._loadTotal(e.target.value);
    }

    render() {
        return (
            <Fragment>
                <div
                    style={{
                        display: "block",
                        position: "relative",
                        overflow: "hidden"
                    }}
                >
                    <Loading open={this.state.isLoading} />
                    <Layout>
                        <div className="home__body-content">
                            <h3>Track Record Saldo</h3>
                            <Grid container spacing={2}>
                                <Grid item xs={8} sm={8} md={8} lg={8}>
                                    &nbsp;
                                </Grid>
                                <Grid item xs={4} sm={4} md={4} lg={4}>
                                    <div style={{ marginBottom: "20px" }}>
                                        <select
                                            id="filterType"
                                            value={this.state.value}
                                            onChange={this.onChange.bind(this)}
                                            className="form-control"
                                            style={{ float: "right" }}
                                        >
                                            <option value="">
                                                Semua Transaksi
                                            </option>
                                            <option value="in">
                                                Transaksi Masuk
                                            </option>
                                            <option value="out">
                                                Transaksi Keluar
                                            </option>
                                        </select>
                                    </div>
                                </Grid>
                            </Grid>
                            <br clear="all" />
                            <div className="home__body-content-card">
                                <Grid container spacing={2}>
                                    {this.state.balance.length > 0 ? (
                                        this.state.balance.map(
                                            (item, index) => (
                                                <Grid
                                                    key={index}
                                                    item
                                                    xs={12}
                                                    sm={12}
                                                    md={12}
                                                    lg={12}
                                                >
                                                    <CardData
                                                        walletcard
                                                        target={`wallet/${
                                                            item.id
                                                        }`}
                                                        key={item.id}
                                                        no_trx={item.ref}
                                                        type={item.type}
                                                        amount={item.amount}
                                                        balance_prev={
                                                            item.balance_prev
                                                        }
                                                        balance_now={
                                                            item.balance_now
                                                        }
                                                        description={item.desc}
                                                        tanggal_transaksi={
                                                            item.recorded_at
                                                        }
                                                    />
                                                </Grid>
                                            )
                                        )
                                    ) : (
                                        <NoData />
                                    )}
                                </Grid>
                            </div>
                        </div>
                    </Layout>
                </div>
            </Fragment>
        );
    }
}

export default withAuth(Wallet);
