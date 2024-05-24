import React, { Component } from "react";

import Grid from "@material-ui/core/Grid";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import Plus from "mdi-material-ui/Plus";
import HelpCircleOutline from "mdi-material-ui/HelpCircleOutline";

import TitleBar from "../../components/TitleBar";
import TitleBarTitle from "../../components/TitleBarTitle";
import TableCellLink from "../../components/TableCellLink";
import TitleBarButton from "../../components/TitleBarButton";
import DataTable from "../../components/DataTable";

import GatewayProfileStore from "../../stores/GatewayProfileStore";

import { translate } from "../../helpers/translate";

const t = (key) => {
  return translate("ListGatewayProfilesJS", key);
};

class ListGatewayProfiles extends Component {
  constructor() {
    super();

    this.state = {
      dialogOpen: false,
    };
  }

  getPage(limit, offset, callbackFunc) {
    GatewayProfileStore.list(0, limit, offset, callbackFunc);
  }

  getRow(obj) {
    return (
      <TableRow id={obj.id} hover>
        <TableCellLink to={`/gateway-profiles/${obj.id}`}>
          {obj.name}
        </TableCellLink>
        <TableCellLink to={`/network-servers/${obj.networkServerID}`}>
          {obj.networkServerName}
        </TableCellLink>
      </TableRow>
    );
  }

  toggleHelpDialog = () => {
    this.setState({
      dialogOpen: !this.state.dialogOpen,
    });
  };

  render() {
    return (
      <Grid container spacing={4}>
        <Dialog
          open={this.state.dialogOpen}
          onClose={this.toggleHelpDialog}
          aria-labelledby="help-dialog-title"
          aria-describedby="help-dialog-description"
        >
          <DialogTitle id="help-dialog-title">{t("HelpTitle")}</DialogTitle>
          <DialogContent>
            <DialogContentText id="help-dialog-description">
              {t("HelpDescription")}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.toggleHelpDialog} color="primary">
              {t("Close")}
            </Button>
          </DialogActions>
        </Dialog>

        <TitleBar
          buttons={[
            <TitleBarButton
              key={1}
              label={t("Create")}
              icon={<Plus />}
              to={`/gateway-profiles/create`}
            />,
            <TitleBarButton
              key={2}
              label={t("Help")}
              icon={<HelpCircleOutline />}
              onClick={this.toggleHelpDialog}
            />,
          ]}
        >
          <TitleBarTitle title={t("GatewayProfiles")} />
        </TitleBar>
        <Grid item xs={12}>
          <DataTable
            header={
              <TableRow>
                <TableCell>{t("Name")}</TableCell>
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

export default ListGatewayProfiles;
