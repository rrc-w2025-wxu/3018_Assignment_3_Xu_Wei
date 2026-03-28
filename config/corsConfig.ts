import { CorsOptions } from "cors";

export const getCorsOptions = (): CorsOptions => {
    const isDevelopment = process.env.NODE_ENV === "development";

    if (isDevelopment) {
        return {
            /**
             * Allow all origins in development for easier testing
             */
            origin: true,

            /**
             * Allow cookies and authentication headers
             */
            credentials: true,

            /**
             * Cache preflight response for 10 minutes
             */
            maxAge: 600,
        };
    }

    return {
        /**
         * Read allowed origins from environment variable
         * and split into an array
         */
        origin: process.env.ALLOWED_ORIGINS?.split(",") || [],

        /**
         * Allow cookies and authentication headers
         */
        credentials: true,

        /**
         * Allowed HTTP methods
         */
        methods: ["GET", "POST", "PUT", "DELETE"],

        /**
         * Allowed request headers
         */
        allowedHeaders: ["Content-Type", "Authorization"],

        /**
         * Cache preflight response for 10 minutes
         */
        maxAge: 600,
    };
};
