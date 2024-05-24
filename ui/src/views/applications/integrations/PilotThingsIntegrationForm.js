import React from "react";

import TextField from "@material-ui/core/TextField";

import FormComponent from "../../../classes/FormComponent";
import Form from "../../../components/Form";

import { translate } from "../../../helpers/translate";

const t = (key) => {
  return translate("PilotThingsIntegrationFormJS", key);
};

class PilotThingsIntegrationForm extends FormComponent {
  render() {
    if (this.state.object === undefined) {
      return null;
    }

    return (
      <Form submitLabel={this.props.submitLabel} onSubmit={this.onSubmit}>
        <TextField
          id="server"
          label={t("serverLabel")}
          placeholder="https://host:port"
          value={this.state.object.server || ""}
          onChange={this.onChange}
          margin="normal"
          required
          fullWidth
        />

        <TextField
          id="token"
          label={t("tokenLabel")}
          value={this.state.object.token || ""}
          onChange={this.onChange}
          margin="normal"
          required
          fullWidth
        />
      </Form>
    );
  }
}

export default PilotThingsIntegrationForm;
