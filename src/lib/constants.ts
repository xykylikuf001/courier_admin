export const PROJECT_NAME = process.env.NEXT_PUBLIC_PROJECT_NAME;

export const AUTH_TOKEN = "access_token";
export const AUTH_TOKEN_COOKIE: string = "Authorization";
export const AUTH_REFRESH_TOKEN = "refresh_token";
export const AUTH_LOGIN_REDIRECT = "/dashboard";
export const AUTH_LOGOUT_REDIRECT = "/auth/sign-in";

export const AUTH_LOGIN_URL = "/auth/sign-in";
export const AUTH_LOGOUT_URL = "/auth/logout";

export const AUTH_REMEMBER_ME = "remember_me";

export const COOKIE_DEFAULT_AGE = 10 * 365 * 24 * 60 * 60
export const COOKIE_PATH = process.env.NEXT_PUBLIC_COOKIE_PATH
export const COOKIE_SAME_SITE: true | false | "lax" | "strict" | "none" | undefined = "strict"
export const COOKIE_THEME = 'APP_THEME'
export const COOKIE_DRAWER_STATE = 'drawer_state'
export const COOKIE_ENABLE_SECURE = process.env.NEXT_PUBLIC_ENABLE_COOKIE_SECURE === "true"

export const BASE_URL = typeof window !== "undefined" ? process.env.NEXT_PUBLIC_BASE_URL : process.env.BASE_SERVER_URL
export const IMAGE_HOST = process.env.NEXT_PUBLIC_IMAGE_HOST

export const IS_PRODUCTION =  process.env.NODE_ENV === "production";
export const IS_PRODUCTION_BUILD = process.env.NODE_ENV === "production";

const VERCEL_URL = process.env.NEXT_PUBLIC_VERCEL_URL ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` : ""

export const WEBAPP_URL =
    process.env.NEXT_PUBLIC_WEBAPP_URL ||
    VERCEL_URL ||
    "http://localhost:3000"
export const WEBSITE_URL = process.env.NEXT_PUBLIC_WEBSITE_URL || "http://localhost:3000"

export const DEFAULT_LOCALE = "tk";

// NEXT CACHING DEFAULTS
export const MD_DELAY = 0; // revalidate at every 1 day
