import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";

import Plus from "mdi-material-ui/Plus";
import Delete from "mdi-material-ui/Delete";

import TitleBar from "../../components/TitleBar";
import TitleBarTitle from "../../components/TitleBarTitle";
import TitleBarButton from "../../components/TitleBarButton";
import DataTable from "../../components/DataTable";
import InternalStore from "../../stores/InternalStore";

import { formatMessage as translate } from "devextreme/localization";

class APIKeyRow extends Component {
  onDelete = () => {
    if (window.confirm(translate("apiKeyDeleteConfirmation"))) {
      InternalStore.deleteAPIKey(this.props.obj.id, (resp) => {
        this.props.history.push(
          `/organizations/${this.props.match.params.organizationID}/api-keys`
        );
      });
    }
  };

  render() {
    return (
      <TableRow key={this.props.obj.id} hover>
        <TableCell>{this.props.obj.id}</TableCell>
        <TableCell>{this.props.obj.name}</TableCell>
        <TableCell align="right">
          <IconButton aria-label="delete">
            <Delete onClick={this.onDelete} />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  }
}

APIKeyRow = withRouter(APIKeyRow);

class ListOrganizationAPIKeys extends Component {
  getPage = (limit, offset, callbackFunc) => {
    InternalStore.listAPIKeys(
      {
        organizationID: this.props.match.params.organizationID,
        limit: limit,
        offset: offset,
      },
      callbackFunc
    );
  };

  getRow = (obj) => {
    return <APIKeyRow obj={obj} />;
  };

  render() {
    return (
      <Grid container spacing={4}>
        <TitleBar
          buttons={
            <TitleBarButton
              label={translate("create")}
              icon={<Plus />}
              to={`/organizations/${this.props.match.params.organizationID}/api-keys/create`}
            />
          }
        >
          <TitleBarTitle
            title={`${translate("organization")} ${translate("apiKeys")}`}
          />
        </TitleBar>
        <Grid item xs={12}>
          <DataTable
            header={
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>{translate("name")}</TableCell>
                <TableCell></TableCell>
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

export default ListOrganizationAPIKeys;
