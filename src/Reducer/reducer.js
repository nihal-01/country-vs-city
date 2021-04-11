import { GET_DATA, GET_DATA_BY_TIME, NO_DATA, START_FETCH } from "../actions";

export const reducer = (state, action) => {
  switch (action.type) {
    case GET_DATA:
      if (action.payload.country) {
        let cdata = Object.keys(action.payload.country)
          .map((key) => {
            const { text, spam_score, votes } = action.payload.country[key];
            let item = { id: key, text, spam_score, votes };
            return { ...item };
          })
          .sort((a, b) => b.votes - a.votes);

        var countryData = { "column-1": cdata, "column-2": [] };
      }

      if (action.payload.city) {
        let city = Object.keys(action.payload.city)
          .map((key) => {
            const { text, spam_score, votes } = action.payload.city[key];
            let item = { id: key, text, spam_score, votes };
            return { ...item };
          })
          .sort((a, b) => b.votes - a.votes);

        var cityData = { "column-1": city, "column-2": [] };
      }

      return {
        ...state,
        countryData,
        cityData,
        dataError: false,
        loading: false,
      };
    case START_FETCH:
      return { ...state, loading: true };
    case NO_DATA:
      return { ...state, dataError: true, loading: false };
    case GET_DATA_BY_TIME:
      if (action.payload.country) {
        let date_cdata = Object.keys(action.payload.country)
          .map((key) => {
            const { text, spam_score, votes } = action.payload.country[key];
            let item = { id: key, text, spam_score, votes };
            return { ...item };
          })
          .reverse();

        var date_country_data = { "column-1": date_cdata, "column-2": [] };
      }

      if (action.payload.city) {
        let date_city = Object.keys(action.payload.city)
          .map((key) => {
            const { text, spam_score, votes } = action.payload.city[key];
            let item = { id: key, text, spam_score, votes };
            return { ...item };
          })
          .reverse();

        var date_city_data = { "column-1": date_city, "column-2": [] };
      }
      return {
        ...state,
        countryData: date_country_data,
        cityData: date_city_data,
        dataError: false,
        loading: false,
      };
    default:
      return state;
  }
};
