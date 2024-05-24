import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

import SessionStore from "../stores/SessionStore";
import NetworkServerStore from "../stores/NetworkServerStore";
import ServiceProfileStore from "../stores/ServiceProfileStore";
import DeviceProfileStore from "../stores/DeviceProfileStore";

import { formatMessage as translate } from "devextreme/localization";

class SetupHelper extends Component {
  constructor() {
    super();
    this.state = {
      nsDialog: false,
      spDialog: false,
      dpDialog: false,
      organizationID: null,
    };

    this.test = this.test.bind(this);
    this.testNetworkServer = this.testNetworkServer.bind(this);
    this.testServiceProfile = this.testServiceProfile.bind(this);
    this.testDeviceProfile = this.testDeviceProfile.bind(this);
  }

  componentDidMount() {
    SessionStore.on("change", this.test);
    SessionStore.on("organization.change", this.test);

    this.test();
  }

  componentWillUnmount() {
    SessionStore.removeListener("change", this.test);
    SessionStore.removeListener("organization.change", this.test);
  }

  componentDidUpdate(prevProps) {
    if (prevProps === this.props) {
      return;
    }

    this.test();
  }

  test() {
    this.testNetworkServer();
    this.testServiceProfile(() => {
      this.testDeviceProfile(() => {});
    });
  }

  testServiceProfile(callbackFunc) {
    if (SessionStore.getOrganizationID === null) {
      callbackFunc();
      return;
    }

    if (
      !!localStorage.getItem(
        "spDialogDismiss" + SessionStore.getOrganizationID()
      )
    ) {
      callbackFunc();
      return;
    }

    if (
      !SessionStore.isAdmin() &&
      !SessionStore.isOrganizationAdmin(SessionStore.getOrganizationID())
    ) {
      callbackFunc();
      return;
    }

    ServiceProfileStore.list(
      SessionStore.getOrganizationID(),
      0,
      0,
      0,
      (resp) => {
        if (
          resp.totalCount === "0" &&
          !(this.state.nsDialog || this.state.dpDialog)
        ) {
          this.setState({
            spDialog: true,
          });
        } else {
          callbackFunc();
        }
      }
    );
  }

  testDeviceProfile(callbackFunc) {
    if (SessionStore.getOrganizationID === null) {
      callbackFunc();
      return;
    }

    if (
      !!localStorage.getItem(
        "dpDialogDismiss" + SessionStore.getOrganizationID()
      )
    ) {
      callbackFunc();
      return;
    }

    if (
      !SessionStore.isAdmin() &&
      !SessionStore.isOrganizationAdmin(SessionStore.getOrganizationID())
    ) {
      callbackFunc();
      return;
    }

    DeviceProfileStore.list(
      SessionStore.getOrganizationID(),
      0,
      0,
      0,
      (resp) => {
        if (
          resp.totalCount === "0" &&
          !(this.state.nsDialog || this.state.dpDialog)
        ) {
          this.setState({
            dpDialog: true,
          });
        } else {
          callbackFunc();
        }
      }
    );
  }

  testNetworkServer() {
    if (!!localStorage.getItem("nsDialogDismiss") || !SessionStore.isAdmin()) {
      return;
    }

    NetworkServerStore.list(0, 0, 0, (resp) => {
      if (resp.totalCount === 0) {
        this.setState({
          nsDialog: true,
        });
      }
    });
  }

  toggleDialog(name) {
    let state = this.state;
    state[name] = !state[name];

    if (name === "nsDialog") {
      localStorage.setItem(name + "Dismiss", true);
    } else if (SessionStore.getOrganizationID() !== null) {
      localStorage.setItem(
        name + "Dismiss" + SessionStore.getOrganizationID(),
        true
      );
    }

    this.setState(state);
  }

  render() {
    const orgID = SessionStore.getOrganizationID();

    return (
      <div>
        <Dialog
          open={this.state.nsDialog}
          onClose={this.toggleDialog.bind(this, "nsDialog")}
        >
          <DialogTitle>{translate("addNetServerQ")}</DialogTitle>
          <DialogContent>
            <DialogContentText paragraph>
              {translate("addNetServerHelperInfo")}
            </DialogContentText>
            <DialogContentText>
              {translate("wouldYouLikeToConnectQ")}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              color="primary"
              component={Link}
              to="/network-servers/create"
              onClick={this.toggleDialog.bind(this, "nsDialog")}
            >
              {translate("addSubmit")}
            </Button>
            <Button
              color="primary"
              onClick={this.toggleDialog.bind(this, "nsDialog")}
            >
              {translate("dismiss")}
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={this.state.spDialog}
          onClose={this.toggleDialog.bind(this, "spDialog")}
        >
          <DialogTitle>{translate("addServiceProfileQ")}</DialogTitle>
          <DialogContent>
            <DialogContentText paragraph>
              {translate("addServiceProfileHelperInfo")}
            </DialogContentText>
            <DialogContentText>
              {translate("wouldYouLikeToCreateServiceProfileQ")}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              color="primary"
              component={Link}
              to={`/organizations/${orgID}/service-profiles/create`}
              onClick={this.toggleDialog.bind(this, "spDialog")}
            >
              {translate("createServiceProfile")}
            </Button>
            <Button
              color="primary"
              onClick={this.toggleDialog.bind(this, "spDialog")}
            >
              {translate("dismiss")}
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={this.state.dpDialog}
          onClose={this.toggleDialog.bind(this, "dpDialog")}
        >
          <DialogTitle>{translate("addDeviceProfileQ")}</DialogTitle>
          <DialogContent>
            <DialogContentText paragraph>
              {translate("addDeviceProfileHelperInfo")}
            </DialogContentText>
            <DialogContentText>
              {translate("wouldYouLikeToCreateDeviceProfileQ")}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              color="primary"
              component={Link}
              to={`/organizations/${orgID}/device-profiles/create`}
              onClick={this.toggleDialog.bind(this, "dpDialog")}
            >
              {translate("createDeviceProfile")}
            </Button>
            <Button
              color="primary"
              onClick={this.toggleDialog.bind(this, "dpDialog")}
            >
              {translate("dismiss")}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withRouter(SetupHelper);
