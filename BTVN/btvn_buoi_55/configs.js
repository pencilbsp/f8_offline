import { join } from "path"

export const APP_DIR = join(process.cwd(), "src")

export const APP_PORT = Number(process.env.PORT || 5001)
export const TOKEN_SECRET = process.env.TOKEN_SECRET
export const COOKIE_SECRET = process.env.COOKIE_SECRET

export const VIEW_DIR = join(APP_DIR, "views")
export const DATABASE_DIR = join(APP_DIR, "database")
export const STATIC_DIR = join(APP_DIR, "..", "public")

export const TIME_TO_USER_ACTIVE = 30 * 60 * 1000 // 30 phút

export const SESSION_EXPIRES_TIME = 1000 * 60 * 60 * 24 * 365 * 10 // 10 năm
