export const APP_PORT = Number(process.env.APP_PORT || 5001)

export const COOKIE_SECRET = process.env.COOKIE_SECRET

export const TRACKING_SERVER = process.env.TRACKING_SERVER

export const SESSION_EXPIRES_TIME = 1000 * 60 * 60 * 24 * 365 * 10 // 10 năm
