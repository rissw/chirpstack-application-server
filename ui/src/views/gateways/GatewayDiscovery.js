import React, { Component } from "react";
import ReactDOM from "react-dom";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import L from "leaflet";
import {
  Map,
  Marker,
  Polyline,
  Popup,
  MapControl,
  withLeaflet,
} from "react-leaflet";

import MapTileLayer from "../../components/MapTileLayer";
import GatewayStore from "../../stores/GatewayStore";

import { translate } from "../../helpers/translate";

const t = (key) => {
  return translate("GatewayDiscoveryJS", key);
};

const styles = {
  mapLegend: {
    background: "rgba(255,255,255,0.7)",
    padding: 10,
    borderRadius: 5,
  },

  mapLegendList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    opacity: 1,
  },

  mapLegendListItem: {
    fontWeight: "bold",
    padding: 3,
  },

  label: {
    display: "block",
    float: "left",
    marginRight: 10,
    width: 24,
  },
};

class GatewayDiscovery extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    GatewayStore.getLastPing(this.props.gateway.id, (ping) => {
      this.setState({
        ping: ping,
      });
    });
  }

  getColor(dbm) {
    if (dbm >= -100) {
      return "#FF0000";
    } else if (dbm >= -105) {
      return "#FF7F00";
    } else if (dbm >= -110) {
      return "#FFFF00";
    } else if (dbm >= -115) {
      return "#00FF00";
    } else if (dbm >= -120) {
      return "#00FFFF";
    }
    return "#0000FF";
  }

  render() {
    if (this.state.ping === undefined || this.state.ping.pingRX.length === 0) {
      return (
        <Card>
          <CardContent>
            <Typography variant="body1">{t("NoDiscovered")}</Typography>
            <List>
              <ListItem dense>
                <Typography variant="body1">{t("NoPing")}</Typography>
              </ListItem>
              <ListItem dense>
                <Typography variant="body1">
                  {t("DisabledPingFeature")}
                </Typography>
              </ListItem>
              <ListItem dense>
                <Typography variant="body1">{t("PingNotReceived")}</Typography>
              </ListItem>
            </List>
          </CardContent>
        </Card>
      );
    }

    let position = [0, 0];
    if (
      this.props.gateway.location !== undefined &&
      this.props.gateway.location.latitude !== undefined &&
      this.props.gateway.location.longitude !== undefined
    ) {
      position = [
        this.props.gateway.location.latitude,
        this.props.gateway.location.longitude,
      ];
    }

    const style = {
      height: 800,
    };

    let bounds = [];
    let markers = [];
    let lines = [];

    markers.push(
      <Marker position={position} key={`gw-${this.props.gateway.id}`}>
        <Popup>
          <span>
            {this.props.gateway.id}
            <br />
            {t("Freq")}: {this.state.ping.frequency / 1000000} {t("MHz")}
            <br />
            {t("DR")}: {this.state.ping.dr}
            <br />
            {t("Altitude")}: {this.props.gateway.location.altitude}{" "}
            {t("meters")}
          </span>
        </Popup>
      </Marker>
    );

    bounds.push(position);

    for (const rx of this.state.ping.pingRX) {
      const pingPos = [rx.latitude, rx.longitude];

      markers.push(
        <Marker position={pingPos} key={`gw-${rx.gatewayID}`}>
          <Popup>
            <span>
              {rx.gatewayID}
              <br />
              {t("RSSI")}: {rx.rssi} {t("dBm")}
              <br />
              {t("SNR")}: {rx.LoRaSNR} {t("dB")}
              <br />
              {t("Altitude")}: {rx.altitude} {t("meters")}
            </span>
          </Popup>
        </Marker>
      );

      bounds.push(pingPos);

      lines.push(
        <Polyline
          key={`line-${rx.gatewayID}`}
          positions={[position, pingPos]}
          color={this.getColor(rx.rssi)}
          opacity={0.7}
          weight={3}
        />
      );
    }

    return (
      <Paper>
        <Map
          bounds={bounds}
          maxZoom={19}
          style={style}
          animate={true}
          scrollWheelZoom={false}
        >
          <MapTileLayer />
          {markers}
          {lines}
          <LegendControl className={this.props.classes.mapLegend}>
            <ul className={this.props.classes.mapLegendList}>
              <li className={this.props.classes.mapLegendListItem}>
                <span
                  className={this.props.classes.label}
                  style={{ background: this.getColor(-100) }}
                >
                  &nbsp;
                </span>{" "}
                &gt;= -100 {t("dBm")}
              </li>
              <li className={this.props.classes.mapLegendListItem}>
                <span
                  className={this.props.classes.label}
                  style={{ background: this.getColor(-105) }}
                >
                  &nbsp;
                </span>{" "}
                &gt;= -105 {t("dBm")}
              </li>
              <li className={this.props.classes.mapLegendListItem}>
                <span
                  className={this.props.classes.label}
                  style={{ background: this.getColor(-110) }}
                >
                  &nbsp;
                </span>{" "}
                &gt;= -110 {t("dBm")}
              </li>
              <li className={this.props.classes.mapLegendListItem}>
                <span
                  className={this.props.classes.label}
                  style={{ background: this.getColor(-115) }}
                >
                  &nbsp;
                </span>{" "}
                &gt;= -115 {t("dBm")}
              </li>
              <li className={this.props.classes.mapLegendListItem}>
                <span
                  className={this.props.classes.label}
                  style={{ background: this.getColor(-120) }}
                >
                  &nbsp;
                </span>{" "}
                &gt;= -120 {t("dBm")}
              </li>
              <li className={this.props.classes.mapLegendListItem}>
                <span
                  className={this.props.classes.label}
                  style={{ background: this.getColor(-121) }}
                >
                  &nbsp;
                </span>{" "}
                &lt; -120 {t("dBm")}
              </li>
            </ul>
          </LegendControl>
        </Map>
      </Paper>
    );
  }
}

class LegendControl extends MapControl {
  componentDidMount() {
    const legend = L.control({ position: "bottomleft" });
    const jsx = <div {...this.props}>{this.props.children}</div>;

    legend.onAdd = function (map) {
      let div = L.DomUtil.create("div", "");
      ReactDOM.render(jsx, div);
      return div;
    };

    this.leafletElement = legend;
  }

  createLeafletElement() {}
}

LegendControl = withLeaflet(LegendControl);

export default withStyles(styles)(GatewayDiscovery);
