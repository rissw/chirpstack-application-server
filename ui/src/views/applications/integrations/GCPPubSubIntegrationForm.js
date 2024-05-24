import React from "react";

import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";

import FormComponent from "../../../classes/FormComponent";
import Form from "../../../components/Form";
import AutocompleteSelect from "../../../components/AutocompleteSelect";

import { translate } from "../../../helpers/translate";

const t = (key) => {
  return translate("GCPPubSubIntegrationFormJS", key);
};

class GCPPubSubIntegrationForm extends FormComponent {
  getMarshalerOptions = (search, callbackFunc) => {
    const marshalerOptions = [
      { value: "JSON", label: t("JSON") },
      { value: "PROTOBUF", label: t("ProtocolBuffers") },
      { value: "JSON_V3", label: t("JSONLegacy") },
    ];

    callbackFunc(marshalerOptions);
  };

  render() {
    if (this.state.object === undefined) {
      return null;
    }

    return (
      <Form submitLabel={this.props.submitLabel} onSubmit={this.onSubmit}>
        <FormControl fullWidth margin="normal">
          <FormLabel required>{t("PayloadMarshaler")}</FormLabel>
          <AutocompleteSelect
            id="marshaler"
            label={t("marshalerLabel")}
            value={this.state.object.marshaler || ""}
            onChange={this.onChange}
            getOptions={this.getMarshalerOptions}
            required
          />
          <FormHelperText>{t("marshalerHelper")}</FormHelperText>
        </FormControl>
        <TextField
          id="projectID"
          label={t("projectIDLabel")}
          value={this.state.object.projectID || ""}
          onChange={this.onChange}
          margin="normal"
          fullWidth
          required
        />
        <TextField
          id="topicName"
          label={t("topicNameLabel")}
          value={this.state.object.topicName || ""}
          onChange={this.onChange}
          margin="normal"
          fullWidth
          required
        />
        <TextField
          id="credentialsFile"
          label={t("credentialsFileLabel")}
          value={this.state.object.credentialsFile || ""}
          onChange={this.onChange}
          margin="normal"
          rows={10}
          helperText={t("credentialsFileHelper")}
          fullWidth
          multiline
          required
        />
      </Form>
    );
  }
}

export default GCPPubSubIntegrationForm;
