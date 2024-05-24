import React from "react";

import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";

import FormComponent from "../../../classes/FormComponent";
import Form from "../../../components/Form";
import AutocompleteSelect from "../../../components/AutocompleteSelect";

import { translate } from "../../../helpers/translate";

const t = (key) => {
  return translate("MyDevicesIntegrationFormJS", key);
};

class MyDevicesIntegrationForm extends FormComponent {
  getEndpointOptions(search, callbackFunc) {
    const endpointOptions = [
      {
        value: "https://lora.mydevices.com/v1/networks/chirpstackio/uplink",
        label: t("Cayenne"),
      },
      {
        value:
          "https://lora.iotinabox.com/v1/networks/iotinabox.chirpstackio/uplink",
        label: t("IoTBox"),
      },
      { value: "custom", label: t("CustomEndpointURL") },
    ];

    callbackFunc(endpointOptions);
  }

  endpointChange = (e) => {
    let object = this.state.object;

    if (e.target.value === "custom") {
      object.endpoint = "";
    } else {
      object.endpoint = e.target.value;
    }

    this.setState({
      object: object,
    });
  };

  render() {
    if (this.state.object === undefined) {
      return null;
    }

    let endpointSelect = "custom";
    if (this.state.object.endpoint === undefined) {
      endpointSelect = "";
    }

    this.getEndpointOptions("", (options) => {
      for (let opt of options) {
        if (this.state.object.endpoint === opt.value) {
          endpointSelect = this.state.object.endpoint;
        }
      }
    });

    return (
      <Form submitLabel={this.props.submitLabel} onSubmit={this.onSubmit}>
        <FormControl fullWidth margin="normal">
          <FormLabel>{t("Title")}</FormLabel>
          <AutocompleteSelect
            id="_endpoint"
            label={t("_endpointLabel")}
            value={endpointSelect || ""}
            getOptions={this.getEndpointOptions}
            onChange={this.endpointChange}
          />
        </FormControl>
        {endpointSelect === "custom" && (
          <FormControl fullWidth margin="normal">
            <FormLabel>{t("Title1")}</FormLabel>
            <TextField
              id="endpoint"
              label={t("endpointLabel")}
              placeholder="http://host:port"
              value={this.state.object.endpoint || ""}
              onChange={this.onChange}
              margin="normal"
              required
              fullWidth
            />
          </FormControl>
        )}
      </Form>
    );
  }
}

export default MyDevicesIntegrationForm;
