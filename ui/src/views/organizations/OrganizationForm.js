import React from "react";

import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";

import Admin from "../../components/Admin";
import FormControl from "../../components/FormControl";
import FormComponent from "../../classes/FormComponent";
import Form from "../../components/Form";

import { translate } from "../../helpers/translate";

const t = (key) => {
  return translate("OrganizationFormJS", key);
};

class OrganizationForm extends FormComponent {
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
          helperText={t("nameHelper")}
          margin="normal"
          value={this.state.object.name || ""}
          onChange={this.onChange}
          inputProps={{
            pattern: "[\\w-]+",
          }}
          disabled={this.props.disabled}
          required
          fullWidth
        />
        <TextField
          id="displayName"
          label={t("displayNameLabel")}
          margin="normal"
          value={this.state.object.displayName || ""}
          onChange={this.onChange}
          disabled={this.props.disabled}
          required
          fullWidth
        />
        <Admin>
          <FormControl label={t("Gateways")}>
            <FormGroup>
              <FormControlLabel
                label={t("OrganizationCanHaveGateways")}
                control={
                  <Checkbox
                    id="canHaveGateways"
                    checked={!!this.state.object.canHaveGateways}
                    onChange={this.onChange}
                    disabled={this.props.disabled}
                    value="true"
                    color="primary"
                  />
                }
              />
            </FormGroup>
            <FormHelperText>
              {t("OrganizationCanHaveGatewaysHelper")}
            </FormHelperText>
            {!!this.state.object.canHaveGateways && (
              <TextField
                id="maxGatewayCount"
                label={t("maxGatewayCountLabel")}
                helperText={t("maxGatewayCountHelper")}
                margin="normal"
                value={this.state.object.maxGatewayCount || 0}
                onChange={this.onChange}
                type="number"
                disabled={this.props.disabled}
                required
                fullWidth
              />
            )}
          </FormControl>
          <FormControl label={t("Devices")}>
            <TextField
              id="maxDeviceCount"
              label={t("maxDeviceCountLabel")}
              helperText={t("maxDeviceCountHelper")}
              margin="normal"
              value={this.state.object.maxDeviceCount || 0}
              onChange={this.onChange}
              type="number"
              disabled={this.props.disabled}
              required
              fullWidth
            />
          </FormControl>
        </Admin>
      </Form>
    );
  }
}

export default OrganizationForm;
