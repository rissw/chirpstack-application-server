import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";

import ApplicationStore from "../../../stores/ApplicationStore";
import LoRaCloudIntegrationForm from "./LoRaCloudIntegrationForm";

import { translate } from "../../../helpers/translate";

const t = (key) => {
  return translate("UpdateLoRaCloudIntegrationJS", key);
};

class UpdateLoRaCloudIntegration extends Component {
  constructor() {
    super();

    this.state = {};
  }

  onSubmit = (integration) => {
    let integr = integration;
    integr.applicationID = this.props.match.params.applicationID;

    ApplicationStore.updateLoRaCloudIntegration(integr, (resp) => {
      this.props.history.push(
        `/organizations/${this.props.match.params.organizationID}/applications/${this.props.match.params.applicationID}/integrations`
      );
    });
  };

  componentDidMount() {
    ApplicationStore.getLoRaCloudIntegration(
      this.props.match.params.applicationID,
      (resp) => {
        this.setState({
          object: resp.integration,
        });
      }
    );
  }

  render() {
    if (this.state.object === undefined) {
      return null;
    }

    return (
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title={t("Title")} />
            <CardContent>
              <LoRaCloudIntegrationForm
                submitLabel={t("SubmitLabel")}
                onSubmit={this.onSubmit}
                object={this.state.object}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

export default UpdateLoRaCloudIntegration;
