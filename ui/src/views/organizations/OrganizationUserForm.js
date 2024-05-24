import React from "react";

import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";

import FormComponent from "../../classes/FormComponent";
import Form from "../../components/Form";

import { translate } from "../../helpers/translate";

const t = (key) => {
  return translate("OrganizationUserFormJS", key);
};

class OrganizationUserForm extends FormComponent {
  render() {
    if (this.state.object === undefined) {
      return <div></div>;
    }

    return (
      <Form submitLabel={this.props.submitLabel} onSubmit={this.onSubmit}>
        <TextField
          label={t("Email")}
          id="email"
          margin="normal"
          value={this.state.object.email || ""}
          onChange={this.onChange}
          required
          fullWidth
          disabled={this.props.update}
        />
        <Typography variant="body1">{t("PermissionsHelper")}</Typography>
        <FormControl fullWidth margin="normal">
          <FormControlLabel
            label={t("UserIsOrganizationAdmin")}
            control={
              <Checkbox
                id="isAdmin"
                checked={!!this.state.object.isAdmin}
                onChange={this.onChange}
                color="primary"
              />
            }
          />
          <FormHelperText>{t("OrganizationAdminHelper")}</FormHelperText>
        </FormControl>
        {!!!this.state.object.isAdmin && (
          <FormControl fullWidth margin="normal">
            <FormControlLabel
              label={t("UserIsDeviceAdmin")}
              control={
                <Checkbox
                  id="isDeviceAdmin"
                  checked={!!this.state.object.isDeviceAdmin}
                  onChange={this.onChange}
                  color="primary"
                />
              }
            />
            <FormHelperText>{t("DeviceAdminHelper")}</FormHelperText>
          </FormControl>
        )}
        {!!!this.state.object.isAdmin && (
          <FormControl fullWidth margin="normal">
            <FormControlLabel
              label={t("UserIsGatewayAdmin")}
              control={
                <Checkbox
                  id="isGatewayAdmin"
                  checked={!!this.state.object.isGatewayAdmin}
                  onChange={this.onChange}
                  color="primary"
                />
              }
            />
            <FormHelperText>{t("GatewayAdminHelper")}</FormHelperText>
          </FormControl>
        )}
      </Form>
    );
  }
}

export default OrganizationUserForm;
