import React from "react";
import ReactDOM from "react-dom";

import "typeface-roboto";
import Leaflet from "leaflet";
import { Chart } from "chart.js";
import { loadMessages } from "devextreme/localization";
import { MatrixElement, MatrixController } from "chartjs-chart-matrix";
import "chartjs-adapter-moment";

import App from "./App";

import "leaflet/dist/leaflet.css";
import "leaflet.awesome-markers/dist/leaflet.awesome-markers.css";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/base16-light.css";
import "react-leaflet-markercluster/dist/styles.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./index.css";

// import ruMessages from "./locales/ru.json";
// import kzMessages from "./locales/kz.json";
// import enMessages from "./locales/en.json";
import translations from "./locales/translations.json";
import { locale } from "devextreme/localization";

Leaflet.Icon.Default.imagePath =
  "//cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/";
Chart.register(MatrixController, MatrixElement);
if (!localStorage.getItem("language")) {
  localStorage.setItem("language", "en");
  locale(localStorage.getItem("language"));
}
locale(localStorage.getItem("language"));

loadMessages({
  ru: translations.ru,
  kz: translations.kz,
  en: translations.en,
});

ReactDOM.render(<App />, document.getElementById("root"));
