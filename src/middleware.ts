import middleware from "next-auth/middleware"

export default middleware;

export const config = {
    matcher: ['/profile', '/cart', '/order', '/confirmation','/reservation'],
}