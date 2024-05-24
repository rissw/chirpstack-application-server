import React, { Component } from "react";

import Grid from "@material-ui/core/Grid";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

import Plus from "mdi-material-ui/Plus";

import TitleBar from "../../components/TitleBar";
import TitleBarTitle from "../../components/TitleBarTitle";
import TableCellLink from "../../components/TableCellLink";
import TitleBarButton from "../../components/TitleBarButton";
import Admin from "../../components/Admin";
import DataTable from "../../components/DataTable";
import ServiceProfileStore from "../../stores/ServiceProfileStore";

import { translate } from "../../helpers/translate";

const t = (key) => {
  return translate("ListServiceProfilesJS", key);
};

class ListServiceProfiles extends Component {
  constructor() {
    super();

    this.getPage = this.getPage.bind(this);
    this.getRow = this.getRow.bind(this);
  }

  getPage(limit, offset, callbackFunc) {
    ServiceProfileStore.list(
      this.props.match.params.organizationID,
      0,
      limit,
      offset,
      callbackFunc
    );
  }

  getRow(obj) {
    return (
      <TableRow key={obj.id} hover>
        <TableCellLink
          to={`/organizations/${this.props.match.params.organizationID}/service-profiles/${obj.id}`}
        >
          {obj.name}
        </TableCellLink>
        <TableCell>{obj.id}</TableCell>
        <TableCell>{obj.networkServerName}</TableCell>
      </TableRow>
    );
  }

  render() {
    return (
      <Grid container spacing={4}>
        <TitleBar
          buttons={
            <Admin>
              <TitleBarButton
                label={t("Create")}
                icon={<Plus />}
                to={`/organizations/${this.props.match.params.organizationID}/service-profiles/create`}
              />
            </Admin>
          }
        >
          <TitleBarTitle title={t("ServiceProfiles")} />
        </TitleBar>
        <Grid item xs={12}>
          <DataTable
            header={
              <TableRow>
                <TableCell>{t("Name")}</TableCell>
                <TableCell>{t("ID")}</TableCell>
                <TableCell>{t("NetworkServer")}</TableCell>
              </TableRow>
            }
            getPage={this.getPage}
            getRow={this.getRow}
          />
        </Grid>
      </Grid>
    );
  }
}

export default ListServiceProfiles;
