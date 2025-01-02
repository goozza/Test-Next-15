import { SubresourceIntegrityPlugin as SriWebpackPlugin } from "webpack-subresource-integrity";
import { createSecureHeaders } from "next-secure-headers";
import { Configuration } from "webpack";

module.exports = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: createSecureHeaders({
          contentSecurityPolicy: {
            directives: {
              defaultSrc: ["'self'"],
              styleSrc: ["'self'", "'unsafe-inline'"],
              imgSrc: ["'self'"],
              baseURI: "self", // Corrected this line to use 'baseURI'
              formAction: "self",
              frameAncestors: ["none"], // Corrected this line
            },
          },
          frameGuard: "deny",
          noopen: "noopen",
          nosniff: "nosniff",
          xssProtection: "sanitize",
          forceHTTPSRedirect: [
            true,
            { maxAge: 60 * 60 * 24 * 360, includeSubDomains: true },
          ],
          referrerPolicy: "same-origin",
        }),
      },
    ];
  },
  webpack(config: Configuration) {
    if (config.output) {
      // Add a type guard to check if 'output' is defined
      config.output.crossOriginLoading = "anonymous";
    }

    // Ensure plugins is always an array
    if (!config.plugins) {
      config.plugins = [];
    }

    config.plugins.push(
      new SriWebpackPlugin({
        hashFuncNames: ["sha256", "sha384"],
        enabled: true,
      })
    );
    return config;
  },
};
