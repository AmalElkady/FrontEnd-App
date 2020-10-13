import React from "react";
import WeatherDetail from "../../Weather/WeatherDetail";
import CardLayout from "../../CardLayout";

const WeatherCard = () => {
  return (
    <CardLayout styleName="col-lg-6">
      <WeatherDetail />
    </CardLayout>
  );
};

export default WeatherCard;
