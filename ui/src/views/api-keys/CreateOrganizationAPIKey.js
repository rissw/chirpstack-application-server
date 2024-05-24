import React, { Component } from "react";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import TitleBar from "../../components/TitleBar";
import TitleBarTitle from "../../components/TitleBarTitle";
import APIKeyForm from "./APIKeyForm";

import { formatMessage as translate } from "devextreme/localization";
class CreateOrganizationAPIKey extends Component {
  render() {
    return (
      <Grid container spacing={4}>
        <TitleBar>
          <TitleBarTitle
            title={`${translate("organization")} ${translate("apiKeys")}`}
            to={`/organizations/${this.props.match.params.organizationID}/api-keys`}
          />
          <TitleBarTitle title="/" />
          <TitleBarTitle title={translate("create")} />
        </TitleBar>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <APIKeyForm
                submitLabel={translate("createApiKey")}
                onSubmit={this.onSubmit}
                organizationID={this.props.match.params.organizationID}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

export default CreateOrganizationAPIKey;
