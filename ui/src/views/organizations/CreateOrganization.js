import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";

import { CardContent } from "@material-ui/core";

import TitleBar from "../../components/TitleBar";
import TitleBarTitle from "../../components/TitleBarTitle";
import OrganizationForm from "./OrganizationForm";
import OrganizationStore from "../../stores/OrganizationStore";

import { translate } from "../../helpers/translate";

const t = (key) => {
  return translate("CreateOrganizationJS", key);
};

class CreateOrganization extends Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(organization) {
    OrganizationStore.create(organization, (resp) => {
      this.props.history.push("/organizations");
    });
  }

  render() {
    return (
      <Grid container spacing={4}>
        <TitleBar>
          <TitleBarTitle title={t("Organizations")} to="/organizations" />
          <TitleBarTitle title="/" />
          <TitleBarTitle title={t("Create")} />
        </TitleBar>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <OrganizationForm
                submitLabel={t("CreateOrganization")}
                onSubmit={this.onSubmit}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

export default withRouter(CreateOrganization);
