import React, { Component } from "react";
import { Link } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import ApplicationStore from "../../../stores/ApplicationStore";

import { translate } from "../../../helpers/translate";

const t = (key) => {
  return translate("PilotThingsCardJS", key);
};

const styles = {
  media: {
    paddingTop: "35%",
    backgroundSize: "contain",
  },
};

class PilotThingsCard extends Component {
  delete = () => {
    if (
      window.confirm(
        "Are you sure you want to remove the Pilot Things integration?"
      )
    ) {
      ApplicationStore.deletePilotThingsIntegration(
        this.props.applicationID,
        () => {}
      );
    }
  };

  render() {
    return (
      <Card className={this.props.classes.root}>
        <CardMedia
          className={this.props.classes.media}
          image="/integrations/pilot_things.png"
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
          {!this.props.add && (
            <Link
              to={`/organizations/${this.props.organizationID}/applications/${this.props.applicationID}/integrations/pilot-things/edit`}
            >
              <Button size="small" color="primary">
                {t("Edit")}
              </Button>
            </Link>
          )}
          {!this.props.add && (
            <Button size="small" color="primary" onClick={this.delete}>
              {t("Remove")}
            </Button>
          )}
          {!!this.props.add && (
            <Link
              to={`/organizations/${this.props.organizationID}/applications/${this.props.applicationID}/integrations/pilot-things/create`}
            >
              <Button size="small" color="primary">
                {t("Add")}
              </Button>
            </Link>
          )}
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(PilotThingsCard);
