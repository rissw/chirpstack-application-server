import React from "react";

import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormHelperText from "@material-ui/core/FormHelperText";

import FormComponent from "../../classes/FormComponent";
import AESKeyField from "../../components/AESKeyField";
import DevAddrField from "../../components/DevAddrField";
import Form from "../../components/Form";
import AutocompleteSelect from "../../components/AutocompleteSelect";
import theme from "../../theme";

import { translate } from "../../helpers/translate";

const t = (key) => {
  return translate("MulticastGroupFormJS", key);
};

const styles = {
  formLabel: {
    fontSize: 12,
  },
  link: {
    color: theme.palette.primary.main,
  },
};

class MulticastGroupForm extends FormComponent {
  getRandomKey(len) {
    let cryptoObj = window.crypto || window.msCrypto;
    let b = new Uint8Array(len);
    cryptoObj.getRandomValues(b);

    return Buffer.from(b).toString("hex");
  }

  getRandomMcAddr = (cb) => {
    cb(this.getRandomKey(4));
  };

  getRandomSessionKey = (cb) => {
    cb(this.getRandomKey(16));
  };

  getGroupTypeOptions(search, callbackFunc) {
    const options = [
      { value: "CLASS_B", label: t("ClassB") },
      { value: "CLASS_C", label: t("ClassC") },
    ];

    callbackFunc(options);
  }

  getPingSlotPeriodOptions(search, callbackFunc) {
    const pingSlotPeriodOptions = [
      { value: 32 * 1, label: `${t("every")} ${t("second")}` },
      { value: 32 * 2, label: `${t("every")} ${t("2seconds")}` },
      { value: 32 * 4, label: `${t("every")} ${t("4seconds")}` },
      { value: 32 * 8, label: `${t("every")} ${t("8seconds")}` },
      { value: 32 * 16, label: `${t("every")} ${t("16seconds")}` },
      { value: 32 * 32, label: `${t("every")} ${t("32seconds")}` },
      { value: 32 * 64, label: `${t("every")} ${t("64seconds")}` },
      { value: 32 * 128, label: `${t("every")} ${t("128seconds")}` },
    ];

    callbackFunc(pingSlotPeriodOptions);
  }

  render() {
    if (this.state.object === undefined) {
      return null;
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
        <DevAddrField
          id="mcAddr"
          label={t("mcAddrLabel")}
          margin="normal"
          value={this.state.object.mcAddr || ""}
          onChange={this.onChange}
          disabled={this.props.disabled}
          randomFunc={this.getRandomMcAddr}
          fullWidth
          required
          random
        />
        <AESKeyField
          id="mcNwkSKey"
          label={t("mcNwkSKeyLabel")}
          margin="normal"
          value={this.state.object.mcNwkSKey || ""}
          onChange={this.onChange}
          disabled={this.props.disabled}
          fullWidth
          required
          random
        />
        <AESKeyField
          id="mcAppSKey"
          label={t("mcAppSKeyLabel")}
          margin="normal"
          value={this.state.object.mcAppSKey || ""}
          onChange={this.onChange}
          disabled={this.props.disabled}
          fullWidth
          required
          random
        />
        <TextField
          id="fCnt"
          label={t("fCntLabel")}
          margin="normal"
          type="number"
          value={this.state.object.fCnt || 0}
          onChange={this.onChange}
          required
          fullWidth
        />
        <TextField
          id="dr"
          label={t("drLabel")}
          helperText={"drHelper"}
          margin="normal"
          type="number"
          value={this.state.object.dr || 0}
          onChange={this.onChange}
          required
          fullWidth
        />
        <TextField
          id="frequency"
          label={`${t("frequencyLabel")} (${t("Hz")})`}
          helperText={t("frequencyHelper")}
          margin="normal"
          type="number"
          value={this.state.object.frequency || 0}
          onChange={this.onChange}
          required
          fullWidth
        />
        <FormControl fullWidth margin="normal">
          <FormLabel className={this.props.classes.formLabel} required>
            {t("MulticastGroupType")}
          </FormLabel>
          <AutocompleteSelect
            id="groupType"
            label={t("SelectMulticastGroupType")}
            value={this.state.object.groupType || ""}
            onChange={this.onChange}
            getOptions={this.getGroupTypeOptions}
            required
          />
          <FormHelperText>{t("MulticastGroupTypeInfo")}</FormHelperText>
        </FormControl>
        {this.state.object.groupType === "CLASS_B" && (
          <FormControl fullWidth margin="normal">
            <FormLabel className={this.props.classes.formLabel} required>
              {t("ClassB")} {t("pingSlotPeriodicity")}
            </FormLabel>
            <AutocompleteSelect
              id="pingSlotPeriod"
              label={t("SelectClassBPingSlotPeriodicity")}
              value={this.state.object.pingSlotPeriod || ""}
              onChange={this.onChange}
              getOptions={this.getPingSlotPeriodOptions}
              required
            />
            <FormHelperText>
              {t("ClassB")} {t("pingSlotPeriodicity")}.
            </FormHelperText>
          </FormControl>
        )}
      </Form>
    );
  }
}

export default withStyles(styles)(MulticastGroupForm);
