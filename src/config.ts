const DEVELOPMENT_ENVIRONMENT = 'development';
const environment = process.env.NODE_ENV || DEVELOPMENT_ENVIRONMENT;
export const host: string = (environment === DEVELOPMENT_ENVIRONMENT ? 'http://localhost:3000' : '');
export const refreshInterval = 10;