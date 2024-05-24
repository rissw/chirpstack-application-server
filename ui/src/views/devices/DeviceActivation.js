import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";
import Typograhy from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import { Delete, Close } from "mdi-material-ui";
import {
  Grid,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";

import FormComponent from "../../classes/FormComponent";
import AESKeyField from "../../components/AESKeyField";
import DevAddrField from "../../components/DevAddrField";
import Form from "../../components/Form";
import DeviceStore from "../../stores/DeviceStore";
import theme from "../../theme";
import DeviceAdmin from "../../components/DeviceAdmin";
import TitleBarButton from "../../components/TitleBarButton";

import { translate } from "../../helpers/translate";

const t = (key) => {
  return translate("DeviceActivationJS", key);
};

const styles = {
  link: {
    color: theme.palette.primary.main,
  },
  buttons: {
    textAlign: "right",
  },
};

class LW10DeviceActivationForm extends FormComponent {
  constructor() {
    super();
    this.getRandomDevAddr = this.getRandomDevAddr.bind(this);
  }

  getRandomDevAddr(cb) {
    DeviceStore.getRandomDevAddr(this.props.match.params.devEUI, (resp) => {
      cb(resp.devAddr);
    });
  }

  render() {
    if (this.state.object === undefined) {
      return <div></div>;
    }

    return (
      <Form submitLabel={this.props.submitLabel} onSubmit={this.onSubmit}>
        <DevAddrField
          id="devAddr"
          label={t("devAddrLabel")}
          margin="normal"
          value={this.state.object.devAddr || ""}
          onChange={this.onChange}
          disabled={this.props.disabled}
          randomFunc={this.getRandomDevAddr}
          helperText={t("devAddrHelper")}
          fullWidth
          required
          random
        />
        <AESKeyField
          id="nwkSEncKey"
          label={t("nwkSEncKey10Label")}
          margin="normal"
          value={this.state.object.nwkSEncKey || ""}
          onChange={this.onChange}
          disabled={this.props.disabled}
          fullWidth
          required
          random
        />
        <AESKeyField
          id="appSKey"
          label={t("appSKey10Label")}
          margin="normal"
          value={this.state.object.appSKey || ""}
          onChange={this.onChange}
          disabled={this.props.disabled}
          required
          fullWidth
          random
        />
        <TextField
          id="fCntUp"
          label={t("fCntUp10Label")}
          margin="normal"
          type="number"
          value={this.state.object.fCntUp || 0}
          onChange={this.onChange}
          disabled={this.props.disabled}
          required
          fullWidth
        />
        <TextField
          id="nFCntDown"
          label={t("nFCntDown10Label")}
          margin="normal"
          type="number"
          value={this.state.object.nFCntDown || 0}
          onChange={this.onChange}
          disabled={this.props.disabled}
          required
          fullWidth
        />
      </Form>
    );
  }
}

class LW11DeviceActivationForm extends FormComponent {
  constructor() {
    super();
    this.getRandomDevAddr = this.getRandomDevAddr.bind(this);
  }

  getRandomDevAddr(cb) {
    DeviceStore.getRandomDevAddr(this.props.match.params.devEUI, (resp) => {
      cb(resp.devAddr);
    });
  }

  render() {
    if (this.state.object === undefined) {
      return <div></div>;
    }

    return (
      <Form submitLabel={this.props.submitLabel} onSubmit={this.onSubmit}>
        <DevAddrField
          id="devAddr"
          label={t("devAddr")}
          margin="normal"
          value={this.state.object.devAddr || ""}
          onChange={this.onChange}
          disabled={this.props.disabled}
          randomFunc={this.getRandomDevAddr}
          fullWidth
          required
          random
        />
        <AESKeyField
          id="nwkSEncKey"
          label={t("nwkSEncKey11Label")}
          margin="normal"
          value={this.state.object.nwkSEncKey || ""}
          onChange={this.onChange}
          disabled={this.props.disabled}
          fullWidth
          required
          random
        />
        <AESKeyField
          id="sNwkSIntKey"
          label={t("sNwkSIntKey11Label")}
          margin="normal"
          value={this.state.object.sNwkSIntKey || ""}
          onChange={this.onChange}
          disabled={this.props.disabled}
          fullWidth
          required
          random
        />
        <AESKeyField
          id="fNwkSIntKey"
          label={t("fNwkSIntKey11Label")}
          margin="normal"
          value={this.state.object.fNwkSIntKey || ""}
          onChange={this.onChange}
          disabled={this.props.disabled}
          fullWidth
          required
          random
        />
        <AESKeyField
          id="appSKey"
          label={t("appSKey11Label")}
          margin="normal"
          value={this.state.object.appSKey || ""}
          onChange={this.onChange}
          disabled={this.props.disabled}
          required
          fullWidth
          random
        />
        <TextField
          id="fCntUp"
          label={t("fCntUp11Label")}
          margin="normal"
          type="number"
          value={this.state.object.fCntUp || 0}
          onChange={this.onChange}
          disabled={this.props.disabled}
          required
          fullWidth
        />
        <TextField
          id="nFCntDown"
          label={t("nFCntDown11Label")}
          margin="normal"
          type="number"
          value={this.state.object.nFCntDown || 0}
          onChange={this.onChange}
          disabled={this.props.disabled}
          required
          fullWidth
        />
        <TextField
          id="aFCntDown"
          label={t("aFCntDown11Label")}
          margin="normal"
          type="number"
          value={this.state.object.aFCntDown || 0}
          onChange={this.onChange}
          disabled={this.props.disabled}
          required
          fullWidth
        />
      </Form>
    );
  }
}

LW10DeviceActivationForm = withStyles(styles)(LW10DeviceActivationForm);
LW11DeviceActivationForm = withStyles(styles)(LW11DeviceActivationForm);

class DeviceActivation extends Component {
  constructor() {
    super();
    this.state = {
      dialogOpen: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.clearDevNonces = this.clearDevNonces.bind(this);
  }

  componentDidMount() {
    DeviceStore.getActivation(this.props.match.params.devEUI, (resp) => {
      if (resp === null) {
        this.setState({
          deviceActivation: {
            deviceActivation: {},
          },
        });
      } else {
        this.setState({
          deviceActivation: resp,
        });
      }
    });
  }

  onSubmit(deviceActivation) {
    let act = deviceActivation;
    act.devEUI = this.props.match.params.devEUI;

    if (this.props.deviceProfile.macVersion.startsWith("1.0")) {
      act.fNwkSIntKey = act.nwkSEncKey;
      act.sNwkSIntKey = act.nwkSEncKey;
    }

    DeviceStore.activate(act, (resp) => {
      this.props.history.push(
        `/organizations/${this.props.match.params.organizationID}/applications/${this.props.match.params.applicationID}`
      );
    });
  }

  toggleDevNonceDialog = () => {
    this.setState({
      dialogOpen: !this.state.dialogOpen,
    });
  };

  clearDevNonces() {
    if (window.confirm(t("clearConfirmation"))) {
      DeviceStore.clearDevNonces(this.props.match.params.devEUI, (resp) => {
        this.props.history.push(
          `/organizations/${this.props.match.params.organizationID}/applications/${this.props.match.params.applicationID}/devices/${this.props.match.params.devEUI}`
        );
        this.toggleDevNonceDialog();
      });
    }
  }

  render() {
    if (this.state.deviceActivation === undefined) {
      return null;
    }

    let submitLabel = null;
    if (!this.props.deviceProfile.supportsJoin) {
      submitLabel = translate("reactivateDevice");
    }

    let showForm = false;
    if (
      !this.props.deviceProfile.supportsJoin ||
      (this.props.deviceProfile.supportsJoin &&
        this.state.deviceActivation.deviceActivation.devAddr !== undefined)
    ) {
      showForm = true;
    }

    return (
      <Grid container spacing={1}>
        <DeviceAdmin organizationID={this.props.match.params.organizationID}>
          <Grid item xs={12} className={this.props.classes.buttons}>
            <TitleBarButton
              label={t("clearDevNonce")}
              icon={<Delete />}
              color="secondary"
              onClick={this.toggleDevNonceDialog}
            />
            <Dialog
              open={this.state.dialogOpen}
              onClose={this.toggleDevNonceDialog}
              aria-labelledby="devnonce-dialog-title"
              aria-describedby="devnonce-dialog-description"
            >
              <DialogTitle id="devnonce-dialog-title">
                {t("aboutDevNonceClear")}
              </DialogTitle>
              <DialogContent dividers>
                <DialogContentText
                  id="devnonce-dialog-description"
                  component="div"
                >
                  <DialogContentText>{t("aboutText")}</DialogContentText>
                  <strong>{t("note")}:</strong>
                  <ul>
                    <li>{t("note1")}</li>
                    <li>{t("note2")}</li>
                    <li>{t("note3")}</li>
                  </ul>
                  <h3 align="center">{t("deleteConfirmation")}</h3>
                </DialogContentText>
              </DialogContent>
              <DialogActions style={{ justifyContent: "center" }}>
                <TitleBarButton
                  label={t("yes")}
                  icon={<Delete />}
                  color="secondary"
                  onClick={this.clearDevNonces}
                />
                <TitleBarButton
                  label={t("no")}
                  icon={<Close />}
                  color="primary"
                  onClick={this.toggleDevNonceDialog}
                />
              </DialogActions>
            </Dialog>
          </Grid>
        </DeviceAdmin>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              {showForm &&
                this.props.deviceProfile.macVersion.startsWith("1.0") && (
                  <LW10DeviceActivationForm
                    submitLabel={submitLabel}
                    object={this.state.deviceActivation.deviceActivation}
                    onSubmit={this.onSubmit}
                    disabled={this.props.deviceProfile.supportsJoin}
                    match={this.props.match}
                    deviceProfile={this.props.deviceProfile}
                  />
                )}
              {showForm &&
                this.props.deviceProfile.macVersion.startsWith("1.1") && (
                  <LW11DeviceActivationForm
                    submitLabel={submitLabel}
                    object={this.state.deviceActivation.deviceActivation}
                    onSubmit={this.onSubmit}
                    disabled={this.props.deviceProfile.supportsJoin}
                    match={this.props.match}
                    deviceProfile={this.props.deviceProfile}
                  />
                )}
              {!showForm && (
                <Typograhy variant="body1">
                  {t("notActivatedMessage")}
                </Typograhy>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(DeviceActivation);
