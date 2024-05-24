import React, { Component } from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import moment from "moment";

import GatewayStore from "../../stores/GatewayStore";

import { translate } from "../../helpers/translate";

const t = (key) => {
  return translate("GatewayCertificateJS", key);
};

class GatewayCertificate extends Component {
  constructor() {
    super();

    this.state = {
      caCert: null,
      tlsCert: null,
      tlsKey: null,
      buttonDisabled: false,
    };
  }

  requestCertificate = () => {
    this.setState({
      buttonDisabled: true,
    });

    GatewayStore.generateClientCertificate(
      this.props.match.params.gatewayID,
      (resp) => {
        this.setState({
          tlsKey: resp.tlsKey,
          tlsCert: resp.tlsCert,
          caCert: resp.caCert,
          expiresAt: moment(resp.expiresAt).format("lll"),
        });
      }
    );
  };

  render() {
    return (
      <Card>
        <CardContent>
          <Typography gutterBottom>{t("Info")}</Typography>
          {this.state.tlsCert == null && (
            <Button
              onClick={this.requestCertificate}
              disabled={this.state.buttonDisabled}
            >
              {t("GenerateCertificate")}
            </Button>
          )}
          {this.state.tlsCert != null && (
            <form>
              <TextField
                id="expiresAt"
                label={t("expiresAtLabel")}
                margin="normal"
                value={this.state.expiresAt}
                helperText={t("expiresAtHelper")}
                disabled
                fullWidth
              />
              <TextField
                id="caCert"
                label={t("caCertLabel")}
                margin="normal"
                value={this.state.caCert}
                rows={10}
                multiline
                fullWidth
                helperText={t("caCertHelper")}
              />
              <TextField
                id="tlsCert"
                label={t("tlsCertLabel")}
                margin="normal"
                value={this.state.tlsCert}
                rows={10}
                multiline
                fullWidth
                helperText={t("caCertHelper")}
              />
              <TextField
                id="tlsKey"
                label={t("tlsKeyLabel")}
                margin="normal"
                value={this.state.tlsKey}
                rows={10}
                multiline
                fullWidth
                helperText={t("tlsKeyHelper")}
              />
            </form>
          )}
        </CardContent>
      </Card>
    );
  }
}

export default GatewayCertificate;
