// Filename: config/database.ts
import path from "path";

export default ({ env }) => {
  const isProd = env("NODE_ENV") === "production";

  /**
   * ✅ Local: default sqlite
   * ✅ Production/Cloud: default postgres
   *
   * Strapi Cloud provides managed Postgres by default. :contentReference[oaicite:2]{index=2}
   */
  const client = env("DATABASE_CLIENT", isProd ? "postgres" : "sqlite");

  const sslEnabled = env.bool("DATABASE_SSL", false);

  const sslConfig = sslEnabled
    ? {
        key: env("DATABASE_SSL_KEY", undefined),
        cert: env("DATABASE_SSL_CERT", undefined),
        ca: env("DATABASE_SSL_CA", undefined),
        capath: env("DATABASE_SSL_CAPATH", undefined),
        cipher: env("DATABASE_SSL_CIPHER", undefined),
        // Strapi Cloud external DB guide often uses false for this flag
        // when providers use self-signed / managed cert chains. :contentReference[oaicite:3]{index=3}
        rejectUnauthorized: env.bool("DATABASE_SSL_REJECT_UNAUTHORIZED", false),
      }
    : false;

  const connections: Record<string, any> = {
    mysql: {
      connection: {
        connectionString: env("DATABASE_URL", undefined),
        host: env("DATABASE_HOST", "localhost"),
        port: env.int("DATABASE_PORT", 3306),
        database: env("DATABASE_NAME", "strapi"),
        user: env("DATABASE_USERNAME", "strapi"),
        password: env("DATABASE_PASSWORD", "strapi"),
        ssl: sslConfig,
      },
      pool: {
        min: env.int("DATABASE_POOL_MIN", 2),
        max: env.int("DATABASE_POOL_MAX", 10),
      },
    },

    postgres: {
      connection: {
        // If DATABASE_URL exists, it overrides host/port/user/pass in Strapi/Knex :contentReference[oaicite:4]{index=4}
        connectionString: env("DATABASE_URL", undefined),
        host: env("DATABASE_HOST", "localhost"),
        port: env.int("DATABASE_PORT", 5432),
        database: env("DATABASE_NAME", "strapi"),
        user: env("DATABASE_USERNAME", "strapi"),
        password: env("DATABASE_PASSWORD", "strapi"),
        schema: env("DATABASE_SCHEMA", "public"),
        ssl: sslConfig,
      },
      pool: {
        min: env.int("DATABASE_POOL_MIN", 2),
        max: env.int("DATABASE_POOL_MAX", 10),
      },
    },

    sqlite: {
      connection: {
        // Keep this Strapi-generated path style (works with dist builds too) :contentReference[oaicite:5]{index=5}
        filename: path.join(
          __dirname,
          "..",
          "..",
          env("DATABASE_FILENAME", ".tmp/data.db")
        ),
      },
      useNullAsDefault: true,
    },
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env.int("DATABASE_CONNECTION_TIMEOUT", 60000),
    },
  };
};
