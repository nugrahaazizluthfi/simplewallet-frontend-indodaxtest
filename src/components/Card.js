import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import "./styles/card.scss";

const useStyles = makeStyles({
    card: {
        maxWidth: "100%"
    },
    media: {
        height: 50
    }
});

function TransactionCard(props) {
    const classes = useStyles();
    const cardType =
        props.type === "out" ? "card__desc-red" : "card__desc-green";

    return (
        <a href={props.target} style={{ textDecoration: "none" }}>
            <Card className={classes.card}>
                <CardActionArea>
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={9} sm={10} md={11} lg={11}>
                                <div>
                                    <div className="card__desc">
                                        <h2
                                            className={`card__desc-title ${cardType}`}
                                        >
                                            {(props.type === "out"
                                                ? "-"
                                                : "+") + props.value || "500"}
                                        </h2>
                                        <p>
                                            {props.description ||
                                                "Deposit Saldo"}
                                        </p>
                                    </div>
                                    <div className="card__info">
                                        <p>
                                            Tanggal:{" "}
                                            {props.no_trx ||
                                                "TRX-09092019-0291923123"}
                                            ,
                                        </p>
                                        <p>
                                            Tanggal:{" "}
                                            {props.tanggal_transaksi ||
                                                "20-July-2019"}
                                            ,
                                        </p>
                                        <p>
                                            Status:{" "}
                                            {props.status_transaksi ||
                                                "Completed"}
                                        </p>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={3} sm={2} md={1} lg={1}>
                                <div className="card__type">
                                    <span>Jenis Transaksi</span>
                                    <p
                                        className={
                                            props.type === "out"
                                                ? "red"
                                                : "green"
                                        }
                                    >
                                        {props.type || "out"}
                                    </p>
                                </div>
                            </Grid>
                        </Grid>
                    </CardContent>
                </CardActionArea>
            </Card>
        </a>
    );
}

function WalletCard(props) {
    const classes = useStyles();

    return (
        <a href={props.target} style={{ textDecoration: "none" }}>
            <Card className={classes.card}>
                <CardActionArea>
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={3} md={3} lg={3}>
                                <div>
                                    <div className="card__desc">
                                        <p>{props.description || "-"}</p>
                                    </div>
                                    <div className="card__info">
                                        <p>
                                            No Referensi:{" "}
                                            {props.no_trx ||
                                                "TRX-09092019-0291923123"}
                                            ,
                                        </p>
                                        <p>
                                            Tanggal:{" "}
                                            {props.tanggal_transaksi ||
                                                "20-July-2019"}
                                        </p>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={4} sm={3} md={3} lg={3}>
                                <div className="card__type">
                                    <span>Saldo Sebelumnya</span>
                                    <p className={"green"}>
                                        {props.balance_prev || 0}
                                    </p>
                                </div>
                            </Grid>
                            <Grid item xs={4} sm={3} md={3} lg={3}>
                                <div className="card__type">
                                    <span>Potongan/Penambahan</span>
                                    <p
                                        className={
                                            props.type === "out"
                                                ? "red"
                                                : "green"
                                        }
                                    >
                                        {(props.type === "out" ? "-" : "+") +
                                            props.amount || "500"}
                                    </p>
                                </div>
                            </Grid>
                            <Grid item xs={4} sm={3} md={3} lg={3}>
                                <div className="card__type">
                                    <span>Saldo Sekarang</span>
                                    <p className={"green"}>
                                        {props.balance_now || 0}
                                    </p>
                                </div>
                            </Grid>
                        </Grid>
                    </CardContent>
                </CardActionArea>
            </Card>
        </a>
    );
}

export default function MainCard(props) {
    if (typeof props.walletcard !== "undefined")
        return (
            <Fragment>
                <WalletCard {...props} />
            </Fragment>
        );

    return (
        <Fragment>
            <TransactionCard {...props} />
        </Fragment>
    );
}
