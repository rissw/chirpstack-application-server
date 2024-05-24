import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";

import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/mode/javascript/javascript";

import FormComponent from "../../classes/FormComponent";
import Form from "../../components/Form";

import { translate } from "../../helpers/translate";

const t = (key) => {
  return translate("DeviceQueueItemFormJS", key);
};

const styles = {
  codeMirror: {
    zIndex: 1,
  },
};

class DeviceQueueItemForm extends FormComponent {
  constructor() {
    super();

    this.state = {
      tab: 0,
    };
  }

  onTabChange = (e, v) => {
    this.setState({
      tab: v,
    });
  };

  onCodeChange = (field, editor, data, newCode) => {
    let object = this.state.object;
    object[field] = newCode;
    this.setState({
      object: object,
    });
  };

  render() {
    if (this.state.object === undefined) {
      return null;
    }

    const codeMirrorOptions = {
      lineNumbers: true,
      mode: "javascript",
      theme: "default",
    };

    let objectCode = this.state.object.jsonObject;
    if (objectCode === "" || objectCode === undefined) {
      objectCode = `{}`;
    }

    return (
      <Form submitLabel={this.props.submitLabel} onSubmit={this.onSubmit}>
        <TextField
          id="fPort"
          label={t("Port")}
          margin="normal"
          value={this.state.object.fPort || ""}
          onChange={this.onChange}
          helperText={t("PortHelper")}
          required
          fullWidth
          type="number"
        />
        <FormControl fullWidth margin="normal">
          <FormControlLabel
            label={t("ConfirmedDownlink")}
            control={
              <Checkbox
                id="confirmed"
                checked={!!this.state.object.confirmed}
                onChange={this.onChange}
                color="primary"
              />
            }
          />
        </FormControl>
        <Tabs
          value={this.state.tab}
          onChange={this.onTabChange}
          indicatorColor="primary"
        >
          <Tab label={t("Base64Encoded")} />
          <Tab label={t("JSONObject")} />
        </Tabs>
        {this.state.tab === 0 && (
          <TextField
            id="data"
            label={t("Base64EncodedString")}
            margin="normal"
            value={this.state.object.data || ""}
            onChange={this.onChange}
            required
            fullWidth
          />
        )}
        {this.state.tab === 1 && (
          <FormControl fullWidth margin="normal">
            <CodeMirror
              value={objectCode}
              className={this.props.classes.codeMirror}
              options={codeMirrorOptions}
              onBeforeChange={this.onCodeChange.bind(this, "jsonObject")}
            />
            <FormHelperText>{t("FormHelper")}</FormHelperText>
          </FormControl>
        )}
      </Form>
    );
  }
}

export default withStyles(styles)(DeviceQueueItemForm);
