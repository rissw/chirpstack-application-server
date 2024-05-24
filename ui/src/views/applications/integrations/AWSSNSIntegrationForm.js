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
  return translate("AWSSNSIntegrationFormJS", key);
};

class AWSSNSIntegrationForm extends FormComponent {
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
          id="region"
          label={t("regionLabel")}
          value={this.state.object.region || ""}
          onChange={this.onChange}
          margin="normal"
          fullWidth
          required
        />
        <TextField
          id="accessKeyID"
          label={t("accessKeyIDLabel")}
          value={this.state.object.accessKeyID || ""}
          onChange={this.onChange}
          margin="normal"
          fullWidth
          required
        />
        <TextField
          id="secretAccessKey"
          label={t("secretAccessKeyLabel")}
          value={this.state.object.secretAccessKey || ""}
          onChange={this.onChange}
          margin="normal"
          type="password"
          fullWidth
          required
        />
        <TextField
          id="topicARN"
          label={t("topicARNLabel")}
          value={this.state.object.topicARN || ""}
          onChange={this.onChange}
          margin="normal"
          fullWidth
          required
        />
      </Form>
    );
  }
}

export default AWSSNSIntegrationForm;
