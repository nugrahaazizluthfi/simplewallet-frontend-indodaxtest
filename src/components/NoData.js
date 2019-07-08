import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";

export default function NoData() {
    return (
        <Grid item xs={12} sm={12} md={12} lg={12}>
            <Card>
                <CardActionArea>
                    <CardContent>
                        <div
                            style={{
                                display: "block",
                                textAlign: "left"
                            }}
                        >
                            Tidak Ada Data
                        </div>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    );
}
