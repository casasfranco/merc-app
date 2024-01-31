const urls = {
  user: {
    login: '/login',
  },
};

const config = {
  debug: process.env.REACT_APP_DEBUG,
  a11y: process.env.REACT_APP_A11Y,
  auth0: {
    domain: process.env.REACT_APP_AUTH0_DOMAIN,
    clientID: process.env.REACT_APP_AUTH0_CLIENTID,
    audience: process.env.REACT_APP_AUTH0_AUDIENCE,
  },
  api: {
    baseUrl: process.env.REACT_APP_API_BASEURL,
  },
  segment: {
    apiKey: process.env.REACT_APP_SEGMENT_APIKEY,
  },
  launchDarkly: {
    clientId: process.env.REACT_APP_LAUNCHDARKLY_CLIENTID,
  },
  phc: {
    baseUrl: process.env.REACT_APP_PHC_BASEURL,
  },
  melissaData: {
    licenseKey: process.env.REACT_APP_MELISSADATA_LICENSEKEY,
    expressEntryEndpoint:
      process.env.REACT_APP_MELISSADATA_EXPRESSENTRYENDPOINT,
  },
  files: {
    maxNumber: 10,
    videoSize: 500,
    otherSize: 10,
  },
  urls,
};

export default config;
