import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import { CardContent } from "@material-ui/core";

import GatewayProfileStore from "../../stores/GatewayProfileStore";
import GatewayProfileForm from "./GatewayProfileForm";

import { translate } from "../../helpers/translate";

const t = (key) => {
  return translate("UpdateGatewayProfileJS", key);
};

class UpdateGatewayProfile extends Component {
  constructor() {
    super();

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(gatewayProfile) {
    GatewayProfileStore.update(gatewayProfile, (resp) => {
      this.props.history.push("/gateway-profiles");
    });
  }

  render() {
    return (
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <GatewayProfileForm
                submitLabel={t("UpdateGatewayProfile")}
                object={this.props.gatewayProfile}
                onSubmit={this.onSubmit}
                update={true}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

export default withRouter(UpdateGatewayProfile);
