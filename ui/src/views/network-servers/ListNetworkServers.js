import React, { Component } from "react";

import Grid from "@material-ui/core/Grid";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

import Plus from "mdi-material-ui/Plus";

import TitleBar from "../../components/TitleBar";
import TitleBarTitle from "../../components/TitleBarTitle";
import TableCellLink from "../../components/TableCellLink";
import TitleBarButton from "../../components/TitleBarButton";
import DataTable from "../../components/DataTable";

import NetworkServerStore from "../../stores/NetworkServerStore";
import { formatMessage as translate } from "devextreme/localization";

class ListNetworkServers extends Component {
  getPage(limit, offset, callbackFunc) {
    NetworkServerStore.list(0, limit, offset, callbackFunc);
  }

  getRow(obj) {
    return (
      <TableRow key={obj.id} hover>
        <TableCellLink to={`/network-servers/${obj.id}`}>
          {obj.name}
        </TableCellLink>
        <TableCell>{obj.server}</TableCell>
      </TableRow>
    );
  }

  render() {
    return (
      <Grid container spacing={4}>
        <TitleBar
          buttons={[
            <TitleBarButton
              key={1}
              icon={<Plus />}
              label={translate("add")}
              to={`/network-servers/create`}
            />,
          ]}
        >
          <TitleBarTitle title={translate("networkServers")} />
        </TitleBar>
        <Grid item xs={12}>
          <DataTable
            header={
              <TableRow>
                <TableCell>{translate("name")}</TableCell>
                <TableCell>{translate("server")}</TableCell>
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

export default ListNetworkServers;
