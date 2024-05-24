import React from "react";

import TextField from "@material-ui/core/TextField";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";

import FormComponent from "../../classes/FormComponent";
import Form from "../../components/Form";
import AutocompleteSelect from "../../components/AutocompleteSelect";
import NetworkServerStore from "../../stores/NetworkServerStore";

import { translate } from "../../helpers/translate";

const t = (key) => {
  return translate("ServiceProfileFormJS", key);
};

class ServiceProfileForm extends FormComponent {
  constructor() {
    super();
    this.getNetworkServerOption = this.getNetworkServerOption.bind(this);
    this.getNetworkServerOptions = this.getNetworkServerOptions.bind(this);
  }

  getNetworkServerOption(id, callbackFunc) {
    NetworkServerStore.get(id, (resp) => {
      callbackFunc({
        label: resp.networkServer.name,
        value: resp.networkServer.id,
      });
    });
  }

  getNetworkServerOptions(search, callbackFunc) {
    NetworkServerStore.list(0, 999, 0, (resp) => {
      const options = resp.result.map((ns, i) => {
        return { label: ns.name, value: ns.id };
      });
      callbackFunc(options);
    });
  }

  render() {
    if (this.state.object === undefined) {
      return <div></div>;
    }

    return (
      <Form
        submitLabel={this.props.submitLabel}
        onSubmit={this.onSubmit}
        disabled={this.props.disabled}
      >
        <TextField
          id="name"
          label={t("nameLabel")}
          margin="normal"
          value={this.state.object.name || ""}
          onChange={this.onChange}
          helperText={t("nameHelper")}
          disabled={this.props.disabled}
          required
          fullWidth
        />
        {!this.props.update && (
          <FormControl fullWidth margin="normal">
            <FormLabel required>Network-server</FormLabel>
            <AutocompleteSelect
              id="networkServerID"
              label={t("networkServerIDLabel")}
              value={this.state.object.networkServerID || null}
              onChange={this.onChange}
              getOption={this.getNetworkServerOption}
              getOptions={this.getNetworkServerOptions}
            />
            <FormHelperText>{t("networkServerIDHelper")}</FormHelperText>
          </FormControl>
        )}
        <FormControl fullWidth margin="normal">
          <FormControlLabel
            label={t("AddGatewayMetadata")}
            control={
              <Checkbox
                id="addGWMetaData"
                checked={!!this.state.object.addGWMetaData}
                onChange={this.onChange}
                disabled={this.props.disabled}
                color="primary"
              />
            }
          />
          <FormHelperText>{t("MetadataHelper")}</FormHelperText>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <FormControlLabel
            label={t("EnableNetworkGeolocation")}
            control={
              <Checkbox
                id="nwkGeoLoc"
                checked={!!this.state.object.nwkGeoLoc}
                onChange={this.onChange}
                disabled={this.props.disabled}
                color="primary"
              />
            }
          />
          <FormHelperText>{t("NetworkGeolocationHelper")}</FormHelperText>
        </FormControl>
        <TextField
          id="devStatusReqFreq"
          label={t("devStatusReqFreqLabel")}
          margin="normal"
          type="number"
          value={this.state.object.devStatusReqFreq || 0}
          onChange={this.onChange}
          helperText={t("devStatusReqFreqHelper")}
          disabled={this.props.disabled}
          fullWidth
        />
        {this.state.object.devStatusReqFreq > 0 && (
          <FormControl fullWidth margin="normal">
            <FormGroup>
              <FormControlLabel
                label={t("ReportBatteryLevel")}
                control={
                  <Checkbox
                    id="reportDevStatusBattery"
                    checked={!!this.state.object.reportDevStatusBattery}
                    onChange={this.onChange}
                    disabled={this.props.disabled}
                    color="primary"
                  />
                }
              />
              <FormControlLabel
                label={t("ReportLinkMargin")}
                control={
                  <Checkbox
                    id="reportDevStatusMargin"
                    checked={!!this.state.object.reportDevStatusMargin}
                    onChange={this.onChange}
                    disabled={this.props.disabled}
                    color="primary"
                  />
                }
              />
            </FormGroup>
          </FormControl>
        )}
        <TextField
          id="drMin"
          label={t("drMinLabel")}
          margin="normal"
          type="number"
          value={this.state.object.drMin || 0}
          onChange={this.onChange}
          helperText={t("drMinHelper")}
          disabled={this.props.disabled}
          fullWidth
          required
        />
        <TextField
          id="drMax"
          label={t("drMaxLabel")}
          margin="normal"
          type="number"
          value={this.state.object.drMax || 0}
          onChange={this.onChange}
          helperText={t("drMaxHelper")}
          disabled={this.props.disabled}
          fullWidth
          required
        />
        <FormControl fullWidth margin="normal">
          <FormControlLabel
            label={t("PrivateGateways")}
            control={
              <Checkbox
                id="gwsPrivate"
                checked={!!this.state.object.gwsPrivate}
                onChange={this.onChange}
                disabled={this.props.disabled}
                color="primary"
              />
            }
          />
          <FormHelperText>{t("PrivateGatewaysHelper")}</FormHelperText>
        </FormControl>
      </Form>
    );
  }
}

export default ServiceProfileForm;
