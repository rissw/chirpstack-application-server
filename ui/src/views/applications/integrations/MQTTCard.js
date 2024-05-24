import React, { Component } from "react";
import { Link } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { translate } from "../../../helpers/translate";

const t = (key) => {
  return translate("MQTTCardJS", key);
};

const styles = {
  media: {
    paddingTop: "35%",
    backgroundSize: "contain",
  },
};

class MQTTCard extends Component {
  render() {
    return (
      <Card className={this.props.classes.root}>
        <CardMedia
          className={this.props.classes.media}
          image="/integrations/mqtt.png"
          title={t("Title")}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {t("Title")}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {t("Description")}
          </Typography>
        </CardContent>
        <CardActions>
          <Link
            to={`/organizations/${this.props.organizationID}/applications/${this.props.applicationID}/integrations/mqtt/certificate`}
          >
            <Button size="small" color="primary">
              {t("GetCertificate")}
            </Button>
          </Link>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(MQTTCard);
