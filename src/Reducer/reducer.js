import { GET_DATA, NO_DATA, START_FETCH } from "../actions";

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
        let city = Object.keys(action.payload.city).map((key) => {
          const { text, spam_score, votes } = action.payload.city[key];
          let item = { id: key, text, spam_score, votes };
          return { ...item };
        });

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
    default:
      return state;
  }
};
