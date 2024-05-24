import React from "react";

import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Typography from "@material-ui/core/Typography";

import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/mode/javascript/javascript";

import FormComponent from "../../classes/FormComponent";
import Form from "../../components/Form";
import AutocompleteSelect from "../../components/AutocompleteSelect";
import ServiceProfileStore from "../../stores/ServiceProfileStore";

import { translate } from "../../helpers/translate";

const t = (key) => {
  return translate("ApplicationFormJS", key);
};

const styles = {
  codeMirror: {
    zIndex: 1,
  },
  formLabel: {
    fontSize: 12,
  },
};

class ApplicationForm extends FormComponent {
  constructor() {
    super();
    this.getServiceProfileOption = this.getServiceProfileOption.bind(this);
    this.getServiceProfileOptions = this.getServiceProfileOptions.bind(this);
    this.getPayloadCodecOptions = this.getPayloadCodecOptions.bind(this);
    this.onCodeChange = this.onCodeChange.bind(this);
  }

  getServiceProfileOption(id, callbackFunc) {
    ServiceProfileStore.get(id, (resp) => {
      callbackFunc({
        label: resp.serviceProfile.name,
        value: resp.serviceProfile.id,
      });
    });
  }

  getServiceProfileOptions(search, callbackFunc) {
    ServiceProfileStore.list(
      this.props.match.params.organizationID,
      0,
      999,
      0,
      (resp) => {
        const options = resp.result.map((sp, i) => {
          return { label: sp.name, value: sp.id };
        });
        callbackFunc(options);
      }
    );
  }

  getPayloadCodecOptions(search, callbackFunc) {
    const payloadCodecOptions = [
      { value: "", label: t("None") },
      { value: "CAYENNE_LPP", label: t("CayenneLPP") },
      { value: "CUSTOM_JS", label: t("CustomJS") },
    ];

    callbackFunc(payloadCodecOptions);
  }

  onCodeChange(field, editor, data, newCode) {
    let object = this.state.object;
    object[field] = newCode;
    this.setState({
      object: object,
    });
  }

  render() {
    if (this.state.object === undefined) {
      return <div></div>;
    }

    const codeMirrorOptions = {
      lineNumbers: true,
      mode: "javascript",
      theme: "default",
    };

    let payloadEncoderScript = this.state.object.payloadEncoderScript;
    let payloadDecoderScript = this.state.object.payloadDecoderScript;

    if (payloadEncoderScript === "" || payloadEncoderScript === undefined) {
      payloadEncoderScript = `// Encode encodes the given object into an array of bytes.
//  - fPort contains the LoRaWAN fPort number
//  - obj is an object, e.g. {"temperature": 22.5}
// The function must return an array of bytes, e.g. [225, 230, 255, 0]
function Encode(fPort, obj) {
  return [];
}`;
    }

    if (payloadDecoderScript === "" || payloadDecoderScript === undefined) {
      payloadDecoderScript = `// Decode decodes an array of bytes into an object.
//  - fPort contains the LoRaWAN fPort number
//  - bytes is an array of bytes, e.g. [225, 230, 255, 0]
// The function must return an object, e.g. {"temperature": 22.5}
function Decode(fPort, bytes) {
  return {};
}`;
    }

    return (
      <Form submitLabel={this.props.submitLabel} onSubmit={this.onSubmit}>
        <TextField
          id="name"
          label={t("nameLabel")}
          margin="normal"
          value={this.state.object.name || ""}
          onChange={this.onChange}
          helperText={t("nameHelper")}
          fullWidth
          required
        />
        <TextField
          id="description"
          label={t("descriptionLabel")}
          margin="normal"
          value={this.state.object.description || ""}
          onChange={this.onChange}
          fullWidth
          required
        />
        {!this.props.update && (
          <FormControl fullWidth margin="normal">
            <FormLabel className={this.props.classes.formLabel} required>
              {t("ServiceProfile")}
            </FormLabel>
            <AutocompleteSelect
              id="serviceProfileID"
              label={t("SelectServiceProfile")}
              value={this.state.object.serviceProfileID || ""}
              onChange={this.onChange}
              getOption={this.getServiceProfileOption}
              getOptions={this.getServiceProfileOptions}
            />
            <FormHelperText>{t("SelectServiceProfileHelper")}</FormHelperText>
          </FormControl>
        )}
        {this.state.object.payloadCodec !== "" &&
          this.state.object.payloadCodec !== undefined && (
            <div>
              <FormControl fullWidth margin="normal">
                <FormLabel className={this.props.classes.formLabel}>
                  {t("PayloadCodec")}
                </FormLabel>
                <AutocompleteSelect
                  id="payloadCodec"
                  label={t("SelectPayloadCodec")}
                  value={this.state.object.payloadCodec || ""}
                  onChange={this.onChange}
                  getOptions={this.getPayloadCodecOptions}
                />
                <FormHelperText>
                  {t("SelectPayloadCodecHelper1")}
                  <strong>{t("ImportantNote")}</strong>:{" "}
                  {t("SelectPayloadCodecHelper2")}
                </FormHelperText>
              </FormControl>
              {this.state.object.payloadCodec === "CUSTOM_JS" && (
                <FormControl fullWidth margin="normal">
                  <CodeMirror
                    value={payloadDecoderScript}
                    options={codeMirrorOptions}
                    onBeforeChange={this.onCodeChange.bind(
                      this,
                      "payloadDecoderScript"
                    )}
                    className={this.props.classes.codeMirror}
                  />
                  <FormHelperText>
                    {t("FMustHave")}{" "}
                    <strong>function Decode(fPort, bytes)</strong>{" "}
                    {t("DecodeMustReturns")}
                  </FormHelperText>
                </FormControl>
              )}
              {this.state.object.payloadCodec === "CUSTOM_JS" && (
                <FormControl fullWidth margin="normal">
                  <CodeMirror
                    value={payloadEncoderScript}
                    options={codeMirrorOptions}
                    onBeforeChange={this.onCodeChange.bind(
                      this,
                      "payloadEncoderScript"
                    )}
                    className={this.props.classes.codeMirror}
                  />
                  <FormHelperText>
                    {t("FMustHave")}{" "}
                    <strong>function Encode(fPort, obj)</strong>{" "}
                    {t("EncodeMustReturn")}
                  </FormHelperText>
                </FormControl>
              )}
            </div>
          )}
        {this.state.object.payloadCodec === "" && (
          <FormControl fullWidth margin="normal">
            <Typography variant="body1">{t("PayloadCodecNote")}</Typography>
          </FormControl>
        )}
      </Form>
    );
  }
}

export default withStyles(styles)(ApplicationForm);
