type Config = {
  auth0: {
    domain: string;
    clientId: string;
    audience: string;
    scope: string;
  };
  services: {
    endpoints: {
      users: string;
      upload: string;
      metadata: string;
    };
  };
};

const devConfig = {
  auth0: {
    domain: "dev-2piaq4s.us.auth0.com",
    clientId: "C1yEUyfPTGICJC7xBwydqj3N7P3KiAFp",
    audience: "https://dev-2piaq4s.us.auth0.com/api/v2/",
    scope: "openid profile email read:current_user",
  },
  services: {
    endpoints: {
      users: "http://localhost:8888",
      upload: "http://localhost:8080",
      metadata: "http://localhost:8000",
    },
    // ... other stuff maybe
  },
} satisfies Config;

const prodConfig = {
  auth0: {
    domain: "soundscape.eu.auth0.com",
    clientId: "LdoV717MSSXUMujanVTqQjLCkLMsL1Ml",
    audience: "https://soundscape.eu.auth0.com/api/v2/",
    scope: "openid profile email read:current_user",
  },
  services: {
    endpoints: {
      users: "http://72.144.111.234",
      upload: "http://4.182.133.97",
      metadata: "http://72.144.120.236",
    },
    // ... other stuff maybe
  },
} satisfies Config;

export const config = import.meta.env.DEV ? devConfig : prodConfig;
// export const config = prodConfig;
