import React from "react";

import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ChevronDown from "mdi-material-ui/ChevronDown";

import FormComponent from "../../../classes/FormComponent";
import Form from "../../../components/Form";

import { translate } from "../../../helpers/translate";

const t = (key) => {
  return translate("LoRaCloudIntegrationFormJS", key);
};

class LoRaCloudIntegrationForm extends FormComponent {
  render() {
    if (this.state.object === undefined) {
      return null;
    }

    return (
      <Form submitLabel={this.props.submitLabel} onSubmit={this.onSubmit}>
        <Tabs value={0} indicatorColor="primary">
          <Tab label={t("ModemGeolocationServices")} />
        </Tabs>
        <TextField
          id="dasToken"
          label={t("dasTokenLabel")}
          value={this.state.object.dasToken || ""}
          onChange={this.onChange}
          margin="normal"
          helperText={t("dasTokenHelper")}
          type="password"
          required
          fullWidth
        />
        <FormControl fullWidth margin="normal">
          <FormGroup>
            <FormControlLabel
              label={t("ImUsing")}
              control={
                <Checkbox
                  id="das"
                  checked={!!this.state.object.das}
                  onChange={this.onChange}
                  color="primary"
                />
              }
            />
          </FormGroup>
        </FormControl>
        {!!this.state.object.das && (
          <TextField
            id="dasGNSSPort"
            label={t("dasGNSSPortLabel")}
            value={this.state.object.dasGNSSPort || 0}
            onChange={this.onChange}
            type="number"
            margin="normal"
            helperText={t("dasGNSSPortHelper")}
            fullWidth
          />
        )}
        {!!this.state.object.das && (
          <TextField
            id="dasModemPort"
            label={t("dasModemPortLabel")}
            value={this.state.object.dasModemPort || 0}
            onChange={this.onChange}
            type="number"
            margin="normal"
            helperText={t("dasModemPortHelper")}
            fullWidth
          />
        )}
        {!!this.state.object.das && (
          <FormControl fullWidth margin="normal">
            <FormGroup>
              <FormControlLabel
                label={t("UseReceiveTimestamp")}
                control={
                  <Checkbox
                    id="dasGNSSUseRxTime"
                    checked={!!this.state.object.dasGNSSUseRxTime}
                    onChange={this.onChange}
                    color="primary"
                  />
                }
              />
              <FormHelperText>{t("UseReceiveTimestampHelper")}</FormHelperText>
            </FormGroup>
          </FormControl>
        )}
        {!!this.state.object.das && (
          <FormControl fullWidth margin="normal">
            <FormGroup>
              <FormControlLabel
                label={t("ImUsing1")}
                control={
                  <Checkbox
                    id="dasStreamingGeolocWorkaround"
                    checked={!!this.state.object.dasStreamingGeolocWorkaround}
                    onChange={this.onChange}
                    color="primary"
                  />
                }
              />
              <FormHelperText>{t("ImUsing1Helper")}</FormHelperText>
            </FormGroup>
          </FormControl>
        )}
        <br />
        <br />
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ChevronDown />}>
            {t("AdvancedGeolocationOptions")}
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div>
              <FormControl fullWidth margin="normal">
                <FormGroup>
                  <FormControlLabel
                    label={t("geolocationTDOALabel")}
                    control={
                      <Checkbox
                        id="geolocationTDOA"
                        checked={!!this.state.object.geolocationTDOA}
                        onChange={this.onChange}
                        color="primary"
                      />
                    }
                  />
                </FormGroup>
                <FormHelperText>{t("geolocationTDOAHelper")}</FormHelperText>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <FormGroup>
                  <FormControlLabel
                    label={t("geolocationRSSILabel")}
                    control={
                      <Checkbox
                        id="geolocationRSSI"
                        checked={!!this.state.object.geolocationRSSI}
                        onChange={this.onChange}
                        color="primary"
                      />
                    }
                  />
                </FormGroup>
                <FormHelperText>{t("geolocationRSSIHelper")}</FormHelperText>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <FormGroup>
                  <FormControlLabel
                    label={t("geolocationWifiLabel")}
                    control={
                      <Checkbox
                        id="geolocationWifi"
                        checked={!!this.state.object.geolocationWifi}
                        onChange={this.onChange}
                        color="primary"
                      />
                    }
                  />
                </FormGroup>
                <FormHelperText>{t("geolocationWifiHelper")}</FormHelperText>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <FormGroup>
                  <FormControlLabel
                    label={t("geolocationGNSSLabel")}
                    control={
                      <Checkbox
                        id="geolocationGNSS"
                        checked={!!this.state.object.geolocationGNSS}
                        onChange={this.onChange}
                        color="primary"
                      />
                    }
                  />
                </FormGroup>
                <FormHelperText>{t("geolocationGNSSHelper")}</FormHelperText>
              </FormControl>
              {(this.state.object.geolocationTDOA ||
                this.state.object.geolocationRSSI) && (
                <TextField
                  id="geolocationBufferTTL"
                  label={t("geolocationBufferTTLLabel")}
                  type="number"
                  margin="normal"
                  value={this.state.object.geolocationBufferTTL || 0}
                  onChange={this.onChange}
                  helperText={t("geolocationBufferTTLHelper")}
                  fullWidth
                />
              )}
              {(this.state.object.geolocationTDOA ||
                this.state.object.geolocationRSSI) && (
                <TextField
                  id="geolocationMinBufferSize"
                  label={t("geolocationMinBufferSizeLabel")}
                  type="number"
                  margin="normal"
                  value={this.state.object.geolocationMinBufferSize || 0}
                  onChange={this.onChange}
                  helperText={t("geolocationMinBufferSizeHelper")}
                  fullWidth
                />
              )}
              {this.state.object.geolocationWifi && (
                <TextField
                  id="geolocationWifiPayloadField"
                  label={t("wifiPayloadFieldLabel")}
                  value={this.state.object.geolocationWifiPayloadField || ""}
                  onChange={this.onChange}
                  margin="normal"
                  helperText={t("wifiPayloadFieldHelper")}
                  required
                  fullWidth
                />
              )}
              {this.state.object.geolocationGNSS && (
                <TextField
                  id="geolocationGNSSPayloadField"
                  label={t("GNSSPayloadFieldLabel")}
                  value={this.state.object.geolocationGNSSPayloadField || ""}
                  onChange={this.onChange}
                  margin="normal"
                  helperText={t("GNSSPayloadFieldHelper")}
                  required
                  fullWidth
                />
              )}
              {this.state.object.geolocationGNSS && (
                <FormControl fullWidth margin="normal">
                  <FormGroup>
                    <FormControlLabel
                      label={t("UseReceiveTimestamp")}
                      control={
                        <Checkbox
                          id="geolocationGNSSUseRxTime"
                          checked={!!this.state.object.geolocationGNSSUseRxTime}
                          onChange={this.onChange}
                          color="primary"
                        />
                      }
                    />
                  </FormGroup>
                  <FormHelperText>
                    {t("UseReceiveTimestampHelper")}
                  </FormHelperText>
                </FormControl>
              )}
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Form>
    );
  }
}

export default LoRaCloudIntegrationForm;
