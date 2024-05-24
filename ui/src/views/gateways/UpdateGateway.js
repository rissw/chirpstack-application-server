import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import GatewayStore from "../../stores/GatewayStore";
import GatewayForm from "./GatewayForm";

import { translate } from "../../helpers/translate";

const t = (key) => {
  return translate("UpdateGatewayJS", key);
};

class UpdateGateway extends Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(gateway) {
    GatewayStore.update(gateway, (resp) => {
      this.props.history.push(
        `/organizations/${this.props.match.params.organizationID}/gateways`
      );
    });
  }

  render() {
    return (
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <GatewayForm
                submitLabel={t("UpdateGateway")}
                object={this.props.gateway}
                onSubmit={this.onSubmit}
                update={true}
                match={this.props.match}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

export default withRouter(UpdateGateway);
