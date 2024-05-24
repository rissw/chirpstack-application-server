import React from "react";

import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";

import FormComponent from "../../../classes/FormComponent";
import Form from "../../../components/Form";
import AutocompleteSelect from "../../../components/AutocompleteSelect";

import { translate } from "../../../helpers/translate";

const t = (key) => {
  return translate("InfluxDBIntegrationFormJS", key);
};

const styles = {
  formLabel: {
    fontSize: 12,
  },
};

class InfluxDBIntegrationForm extends FormComponent {
  getPrecisionOptions(search, callbackFunc) {
    const precisionOptions = [
      { value: "NS", label: t("Nanosecond") },
      { value: "U", label: t("Microsecond") },
      { value: "MS", label: t("Millisecond") },
      { value: "S", label: t("Second") },
      { value: "M", label: t("Minute") },
      { value: "H", label: t("Hour") },
    ];

    callbackFunc(precisionOptions);
  }

  getVersionOptions(search, callbackFunc) {
    const versionOptions = [
      { value: "INFLUXDB_1", label: "InfuxDB 1.x" },
      { value: "INFLUXDB_2", label: "InfuxDB 2.x" },
    ];

    callbackFunc(versionOptions);
  }

  render() {
    if (this.state.object === undefined) {
      return null;
    }

    return (
      <Form submitLabel={this.props.submitLabel} onSubmit={this.onSubmit}>
        <FormControl fullWidth margin="normal">
          <FormLabel className={this.props.classes.formLabel} required>
            {"InfluxDBVersion"}
          </FormLabel>
          <AutocompleteSelect
            id="version"
            label={t("SelectInfluxDBVersion")}
            value={this.state.object.version || ""}
            onChange={this.onChange}
            getOptions={this.getVersionOptions}
          />
        </FormControl>
        <TextField
          id="endpoint"
          label={t("endpointLabel")}
          placeholder="http://localhost:8086/api/v2/write"
          value={this.state.object.endpoint || ""}
          onChange={this.onChange}
          margin="normal"
          required
          fullWidth
        />
        {this.state.object.version === "INFLUXDB_1" && (
          <TextField
            id="username"
            label={t("usernameLabel")}
            value={this.state.object.username || ""}
            onChange={this.onChange}
            margin="normal"
            fullWidth
          />
        )}
        {this.state.object.version === "INFLUXDB_1" && (
          <TextField
            id="password"
            label={t("passwordLabel")}
            value={this.state.object.password || ""}
            type="password"
            onChange={this.onChange}
            margin="normal"
            fullWidth
          />
        )}
        {this.state.object.version === "INFLUXDB_1" && (
          <TextField
            id="db"
            label={t("dbName")}
            value={this.state.object.db || ""}
            onChange={this.onChange}
            margin="normal"
            fullWidth
            required
          />
        )}
        {this.state.object.version === "INFLUXDB_1" && (
          <TextField
            id="retentionPolicyName"
            label={t("retentionPolicyNameLabel")}
            helperText={t("retentionPolicyNameHelper")}
            value={this.state.object.retentionPolicyName || ""}
            onChange={this.onChange}
            margin="normal"
            fullWidth
          />
        )}
        {this.state.object.version === "INFLUXDB_1" && (
          <FormControl fullWidth margin="normal">
            <FormLabel className={this.props.classes.formLabel} required>
              {t("TimestamPrecision")}
            </FormLabel>
            <AutocompleteSelect
              id="precision"
              label={t("precisionLabel")}
              value={this.state.object.precision || ""}
              onChange={this.onChange}
              getOptions={this.getPrecisionOptions}
            />
            <FormHelperText>{t("precisionHelper")}</FormHelperText>
          </FormControl>
        )}
        {this.state.object.version === "INFLUXDB_2" && (
          <TextField
            id="organization"
            label={t("organizationLabel")}
            value={this.state.object.organization || ""}
            onChange={this.onChange}
            margin="normal"
            fullWidth
            required
          />
        )}
        {this.state.object.version === "INFLUXDB_2" && (
          <TextField
            id="bucket"
            label={t("bucketLabel")}
            value={this.state.object.bucket || ""}
            onChange={this.onChange}
            margin="normal"
            fullWidth
            required
          />
        )}
        {this.state.object.version === "INFLUXDB_2" && (
          <TextField
            id="token"
            label={t("tokenLabel")}
            value={this.state.object.token || ""}
            type="password"
            onChange={this.onChange}
            margin="normal"
            fullWidth
            required
          />
        )}
      </Form>
    );
  }
}

export default withStyles(styles)(InfluxDBIntegrationForm);
