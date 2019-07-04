export const lookupsInitState = {
  nationalities: [],
};

export default {
  GOT_NATIONALITIES: (state, { data }) => ({
    nationalities: data,
  }),
};
