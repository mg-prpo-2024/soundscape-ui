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
      metadata: string;
    };
  };
};

const devConfig = {
  auth0: {
    domain: "dev-2piaq4s.us.auth0.com",
    clientId: "C1yEUyfPTGICJC7xBwydqj3N7P3KiAFp",
    audience: "https://dev-2piaq4s.us.auth0.com/api/v2/",
    scope: "read:current_user update:current_user_metadata",
  },
  services: {
    endpoints: {
      users: "http://localhost:8888",
      metadata: "http://localhost:8080",
    },
    // ... other stuff maybe
  },
} satisfies Config;

const prodConfig = {
  auth0: {
    domain: "soundscape.eu.auth0.com",
    clientId: "LdoV717MSSXUMujanVTqQjLCkLMsL1Ml",
    audience: "https://soundscape.eu.auth0.com/api/v2/",
    scope: "read:current_user update:current_user_metadata",
  },
  services: {
    endpoints: {
      users: "http://72.144.96.197/",
      metadata: "http://localhost:8080", // TODO
    },
    // ... other stuff maybe
  },
} satisfies Config;

export const config = import.meta.env.DEV ? devConfig : prodConfig;
// export const config = prodConfig;
