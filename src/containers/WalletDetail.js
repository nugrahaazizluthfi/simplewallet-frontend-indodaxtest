import React, { Fragment } from "react";
import { withAuth } from "../context/AuthContext";
import axios from "axios";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Layout from "../components/Layout";
import Loading from "../components/Loading";
import "../components/styles/card.scss";

const requestData = axios.create();

// Konfigurasi Axios
requestData.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

class WalletDetail extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoading: true,
            detail: []
        };
    }

    componentDidMount() {
        this.props.initialUser();
        this._loadDetail();
    }

    _loadDetail = () => {
        let detailid = this.props.match.params.id || "";

        return requestData
            .get(`${this.props.URL}saldo/detail/${detailid}`)
            .then(response => {
                const { data } = response.data;
                this.setState({
                    detail: data,
                    isLoading: false
                });
                return true;
            });
    };

    render() {
        return (
            <Fragment>
                <Loading open={this.state.isLoading} />
                <Layout>
                    <Card style={{ maxWidth: "100%", marginTop: "20px" }}>
                        <CardActionArea>
                            <CardContent>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6} md={6} lg={6}>
                                        <div className="card__detail">
                                            <div className="card__detail-text">
                                                <h3>Jenis</h3>
                                                <div
                                                    style={{
                                                        textTransform:
                                                            "uppercase"
                                                    }}
                                                >
                                                    {this.state.detail.type ||
                                                        "-"}
                                                </div>
                                            </div>
                                            <div className="card__detail-text">
                                                <h3>Keterangan</h3>
                                                <div>
                                                    {this.state.detail.desc ||
                                                        "-"}
                                                </div>
                                            </div>
                                            <div className="card__detail-text">
                                                <h3>Tanggal Transaksi</h3>
                                                <div>
                                                    {this.state.detail
                                                        .recorded_at || "-"}
                                                </div>
                                            </div>
                                            <div className="card__detail-text">
                                                <h3>No. Referensi</h3>
                                                <div>
                                                    {this.state.detail.ref ||
                                                        "-"}
                                                </div>
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6} lg={6}>
                                        <div className="card__detail">
                                            <div className="card__detail-text">
                                                <h3>Saldo Sebelumnya</h3>
                                                <div className={"right"}>
                                                    {this.state.detail
                                                        .balance_prev || 0}
                                                </div>
                                            </div>
                                            <div className="card__detail-text">
                                                <h3>Penambahan/Pengurangan</h3>
                                                <div
                                                    className={
                                                        `right ` +
                                                        (this.state.detail
                                                            .type === "out"
                                                            ? `red`
                                                            : `green`)
                                                    }
                                                >
                                                    {(this.state.detail.type ===
                                                    "out"
                                                        ? "-"
                                                        : "+") +
                                                        (this.state.detail
                                                            .amount || 0)}
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="card__detail-text">
                                                <h3>Saldo Sekarang</h3>
                                                <div className={"right"}>
                                                    {this.state.detail
                                                        .balance_now || 0}
                                                </div>
                                            </div>
                                        </div>
                                    </Grid>
                                </Grid>
                                <a
                                    href="/wallet"
                                    className={"button buttonBack"}
                                >
                                    Kembali
                                </a>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Layout>
            </Fragment>
        );
    }
}

export default withAuth(WalletDetail);
