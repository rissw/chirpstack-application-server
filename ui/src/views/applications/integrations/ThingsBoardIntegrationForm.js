import React from "react";

import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";

import FormComponent from "../../../classes/FormComponent";
import Form from "../../../components/Form";

import { translate } from "../../../helpers/translate";

const t = (key) => {
  return translate("ThingsBoardIntegrationFormJS", key);
};

class ThingsBoardIntegrationForm extends FormComponent {
  render() {
    if (this.state.object === undefined) {
      return null;
    }

    return (
      <Form submitLabel={this.props.submitLabel} onSubmit={this.onSubmit}>
        <TextField
          id="server"
          label={t("serverLabel")}
          placeholder="http://host:port"
          value={this.state.object.server || ""}
          onChange={this.onChange}
          margin="normal"
          required
          fullWidth
        />
        <FormHelperText>{t("serverHelper")}</FormHelperText>
      </Form>
    );
  }
}

export default ThingsBoardIntegrationForm;
