export interface IConfigProps { 
    GOOGLE_CLIENT_ID:string,
    STRIPE_PUBLIC_KEY:string,
    PAYPAL_KEY:string,
    GOOGLE_MAPS_KEY:string,
    AMPLITUDE_API_KEY:string,
    LIBRARIES:string[],
    COLORS:{GOOGLE:string},
    SENTRY_DSN:string,
    SKIP_EMAIL_VERIFICATION:string,
    SKIP_MOBILE_VERIFICATION:string,
}