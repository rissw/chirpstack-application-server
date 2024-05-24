import React from "react";

import TextField from "@material-ui/core/TextField";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";

import FormComponent from "../../classes/FormComponent";
import Form from "../../components/Form";
import FormControl from "../../components/FormControl";
import { formatMessage as translate } from "devextreme/localization";

class NetworkServerForm extends FormComponent {
  constructor() {
    super();
    this.state = {
      tab: 0,
    };

    this.onChangeTab = this.onChangeTab.bind(this);
  }

  onChangeTab(event, value) {
    this.setState({
      tab: value,
    });
  }

  render() {
    if (this.state.object === undefined) {
      return null;
    }

    return (
      <Form submitLabel={this.props.submitLabel} onSubmit={this.onSubmit}>
        <Tabs
          value={this.state.tab}
          indicatorColor="primary"
          textColor="primary"
          onChange={this.onChangeTab}
        >
          <Tab label={translate("general")} />
          <Tab label={translate("gatewayDiscovery")} />
          <Tab label={translate("tlsCertificates")} />
        </Tabs>
        {this.state.tab === 0 && (
          <div>
            <TextField
              id="name"
              label={translate("networkServerName")}
              fullWidth={true}
              margin="normal"
              value={this.state.object.name || ""}
              onChange={this.onChange}
              helperText={translate("hostNameHelper")}
              required={true}
            />
            <TextField
              id="server"
              label={translate("networkServerServer")}
              fullWidth={true}
              margin="normal"
              value={this.state.object.server || ""}
              onChange={this.onChange}
              helperText={translate("hostNameHelper")}
              required={true}
            />
          </div>
        )}
        {this.state.tab === 1 && (
          <div>
            <FormControl label={translate("gatewayDiscovery")}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      id="gatewayDiscoveryEnabled"
                      checked={!!this.state.object.gatewayDiscoveryEnabled}
                      onChange={this.onChange}
                      value="true"
                      color="primary"
                    />
                  }
                  label={translate("enableGatewayDiscovery")}
                />
              </FormGroup>
              <FormHelperText>
                {translate("enableGatewayDiscoveryHelper")}
              </FormHelperText>
            </FormControl>
            {this.state.object.gatewayDiscoveryEnabled && (
              <TextField
                id="gatewayDiscoveryInterval"
                label={translate("intervalPerDay")}
                type="number"
                fullWidth={true}
                margin="normal"
                value={this.state.object.gatewayDiscoveryInterval}
                onChange={this.onChange}
                helperText={translate("intervalHelper")}
                required={true}
              />
            )}
            {this.state.object.gatewayDiscoveryEnabled && (
              <TextField
                id="gatewayDiscoveryTXFrequency"
                label={translate("txFrequency")}
                type="number"
                fullWidth={true}
                margin="normal"
                value={this.state.object.gatewayDiscoveryTXFrequency}
                onChange={this.onChange}
                helperText={translate("frequencyHelper")}
                required={true}
              />
            )}
            {this.state.object.gatewayDiscoveryEnabled && (
              <TextField
                id="gatewayDiscoveryDR"
                label={translate("txDataRate")}
                type="number"
                fullWidth={true}
                margin="normal"
                value={this.state.object.gatewayDiscoveryDR}
                onChange={this.onChange}
                helperText={translate("dataRateHelper")}
                required={true}
              />
            )}
          </div>
        )}
        {this.state.tab === 2 && (
          <div>
            <FormControl label={translate("appServerCerts")}>
              <FormGroup>
                <TextField
                  id="caCert"
                  label={translate("caCertificate")}
                  fullWidth={true}
                  margin="normal"
                  value={this.state.object.caCert || ""}
                  onChange={this.onChange}
                  helperText={translate("caHelper")}
                  multiline
                  rows="4"
                />
                <TextField
                  id="tlsCert"
                  label={translate("tlsCertificate")}
                  fullWidth={true}
                  margin="normal"
                  value={this.state.object.tlsCert || ""}
                  onChange={this.onChange}
                  helperText={translate("tlsHelper")}
                  multiline
                  rows="4"
                />
                <TextField
                  id="tlsKey"
                  label={translate("tlsKey")}
                  fullWidth={true}
                  margin="normal"
                  value={this.state.object.tlsKey || ""}
                  onChange={this.onChange}
                  helperText={translate("tlsKeyHelper")}
                  multiline
                  rows="4"
                />
              </FormGroup>
            </FormControl>

            <FormControl label={translate("netServerCerts")}>
              <FormGroup>
                <TextField
                  id="routingProfileCACert"
                  label={translate("caCertificate")}
                  fullWidth={true}
                  margin="normal"
                  value={this.state.object.routingProfileCACert || ""}
                  onChange={this.onChange}
                  helperText={translate("caHelper")}
                  multiline
                  rows="4"
                />
                <TextField
                  id="routingProfileTLSCert"
                  label={translate("tlsCertificate")}
                  fullWidth={true}
                  margin="normal"
                  value={this.state.object.routingProfileTLSCert || ""}
                  onChange={this.onChange}
                  helperText={translate("tlsHelper")}
                  multiline
                  rows="4"
                />
                <TextField
                  id="routingProfileTLSKey"
                  label={translate("tlsKey")}
                  fullWidth={true}
                  margin="normal"
                  value={this.state.object.routingProfileTLSKey || ""}
                  onChange={this.onChange}
                  helperText={translate("tlsKeyHelper")}
                  multiline
                  rows="4"
                />
              </FormGroup>
            </FormControl>
          </div>
        )}
      </Form>
    );
  }
}

export default NetworkServerForm;
