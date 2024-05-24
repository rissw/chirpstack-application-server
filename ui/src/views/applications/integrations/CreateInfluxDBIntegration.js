import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";

import ApplicationStore from "../../../stores/ApplicationStore";
import InfluxDBIntegrationForm from "./InfluxDBIntegrationForm";

import { translate } from "../../../helpers/translate";

const t = (key) => {
  return translate("CreateInfluxDBIntegrationJS", key);
};

class CreateInfluxDBIntegration extends Component {
  onSubmit = (integration) => {
    let integr = integration;
    integr.applicationID = this.props.match.params.applicationID;

    ApplicationStore.createInfluxDBIntegration(integr, (resp) => {
      this.props.history.push(
        `/organizations/${this.props.match.params.organizationID}/applications/${this.props.match.params.applicationID}/integrations`
      );
    });
  };

  render() {
    return (
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title={t("Add_InfluxDB_integration")} />
            <CardContent>
              <InfluxDBIntegrationForm
                submitLabel={t("Add_integration")}
                onSubmit={this.onSubmit}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

export default CreateInfluxDBIntegration;
