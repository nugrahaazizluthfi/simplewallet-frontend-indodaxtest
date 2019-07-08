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

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoading: true,
            transaction: [],
            last_transaction_id: "",
            paging: {}
        };
    }

    componentDidMount() {
        this.props.initialUser();
        this._loadLastTransaction();
        window.addEventListener("scroll", () => this._loadMore());
    }

    _loadLastTransaction = () => {
        return requestData
            .get(`${this.props.URL}transaction`)
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

    _loadMore = () => {
        if (
            $(window).scrollTop() ===
            $(document).height() - $(window).height()
        ) {
            const self = this;

            const data = {
                last_transaction_id: self.state.last_transaction_id
            };

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

                            return true;
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

    render() {
        return (
            <Fragment>
                <Layout>
                    <div className="home__body-content">
                        <h3>Transaksi Terakhir</h3>
                        <div className="home__body-content-card">
                            <Loading open={this.state.isLoading} />
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
                        <div className="home__body-pagination" />
                    </div>
                </Layout>
            </Fragment>
        );
    }
}

export default withAuth(Home);
