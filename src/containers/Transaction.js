import React, { Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import { withAuth } from "../context/AuthContext";
import $ from "jquery";
import "./styles/home.scss";
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

class Transaction extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoading: true,
            transaction: [],
            last_transaction_id: "",
            totalTransaksi: 0,
            paging: {}
        };
    }

    componentDidMount() {
        this.props.initialUser();
        this._loadLastTransaction();
        this._loadTotal();
        window.addEventListener("scroll", () => this._loadMore());
    }

    _loadLastTransaction = (type = "") => {
        let filterType = type !== "" ? "?filterType=" + type : "";

        return requestData
            .get(`${this.props.URL}transaction${filterType}`)
            .then(response => {
                const { data, other } = response.data;
                this.setState({
                    transaction: data,
                    last_transaction_id: other.last_transaction_id,
                    isLoading: false
                });
                return true;
            });
    };

    _loadTotal = (type = "") => {
        let filterType = type !== "" ? "?filterType=" + type : "";

        return requestData
            .get(`${this.props.URL}transaction/total${filterType}`)
            .then(response => {
                const { total } = response.data.data;
                this.setState({
                    totalTransaksi: total
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
                last_transaction_id: self.state.last_transaction_id
            };

            const type = $("#filterType").val();

            if (type !== "") data.filterType = type;

            $.ajax({
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    Authorization: `Bearer ${this.props.token}`
                },
                url: `${this.props.URL}transaction`,
                data: data,
                type: "get",
                beforeSend() {
                    self.setState({
                        isLoading: true
                    });
                },
                success(response) {
                    const trans = self.state.transaction;
                    const { other } = response;

                    if (other.next_data > 0) {
                        response.data.map((_x, i) => {
                            if (
                                !self.state.transaction.some(
                                    el => el.id === _x.id
                                )
                            ) {
                                trans.push(_x);
                            }
                        });

                        self.setState({
                            informasi: trans,
                            last_transaction_id: other.last_transaction_id,
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
        this._loadLastTransaction(e.target.value);
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
                            <h3>Daftar Transaksi</h3>
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
                                    {this.state.transaction.length > 0 ? (
                                        this.state.transaction.map(
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
                                                        target={`transaction/${
                                                            item.id
                                                        }`}
                                                        key={
                                                            item.transaction_number
                                                        }
                                                        no_trx={
                                                            item.transaction_number
                                                        }
                                                        type={item.type}
                                                        value={item.amount}
                                                        description={
                                                            item.description
                                                        }
                                                        tanggal_transaksi={
                                                            item.created_at
                                                        }
                                                        status_transaksi={
                                                            item.status
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

export default withAuth(Transaction);
