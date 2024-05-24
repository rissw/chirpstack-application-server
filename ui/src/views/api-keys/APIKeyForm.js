import React from "react";

import TextField from "@material-ui/core/TextField";

import FormComponent from "../../classes/FormComponent";
import Form from "../../components/Form";
import InternalStore from "../../stores/InternalStore";

import { formatMessage as translate } from "devextreme/localization";

class APIKeyForm extends FormComponent {
  constructor() {
    super();
    this.state = {
      token: null,
      id: null,
    };
  }

  onSubmit = (e) => {
    e.preventDefault();

    let apiKey = this.state.object;
    apiKey.isAdmin = this.props.isAdmin || false;
    apiKey.organizationID = this.props.organizationID || 0;
    apiKey.applicationID = this.props.applicationID || 0;

    InternalStore.createAPIKey(apiKey, (resp) => {
      this.setState({
        token: resp.jwtToken,
        id: resp.id,
      });
    });
  };

  render() {
    if (this.state.object === undefined) {
      return null;
    }

    if (this.state.token !== null) {
      return (
        <div>
          <TextField
            id="id"
            label={translate("apiKeyID")}
            value={this.state.id}
            margin="normal"
            disabled
            fullWidth
          />
          <TextField
            id="name"
            label={translate("apiKeyName")}
            value={this.state.object.name}
            margin="normal"
            disabled
            fullWidth
          />
          <TextField
            id="jwtToken"
            label={translate("token")}
            value={this.state.token}
            rows={5}
            margin="normal"
            helperText={translate("tokenHelper")}
            fullWidth
            multiline
          />
        </div>
      );
    }

    return (
      <Form submitLabel={this.props.submitLabel} onSubmit={this.onSubmit}>
        <TextField
          id="name"
          label={translate("apiKeyName")}
          helperText={translate("apiKeyNameHelper")}
          margin="normal"
          value={this.state.object.name || ""}
          onChange={this.onChange}
          required
          fullWidth
        />
      </Form>
    );
  }
}

export default APIKeyForm;
