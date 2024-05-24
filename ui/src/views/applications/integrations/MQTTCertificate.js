import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import moment from "moment";

import ApplicationStore from "../../../stores/ApplicationStore";

import { translate } from "../../../helpers/translate";

const t = (key) => {
  return translate("MQTTCertificateJS", key);
};

class MQTTCertificate extends Component {
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

    ApplicationStore.generateMQTTIntegrationClientCertificate(
      this.props.match.params.applicationID,
      (resp) => {
        this.setState({
          caCert: resp.caCert,
          tlsCert: resp.tlsCert,
          tlsKey: resp.tlsKey,
          expiresAt: moment(resp.expiresAt).format("lll"),
        });
      }
    );
  };

  render() {
    return (
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title={t("Title")} />
            <CardContent>
              <Typography gutterBottom>{t("Description")}</Typography>
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
                  />
                  <TextField
                    id="tlsKey"
                    label={t("tlsKeyLabel")}
                    margin="normal"
                    value={this.state.tlsKey}
                    rows={10}
                    multiline
                    fullWidth
                  />
                </form>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

export default MQTTCertificate;
