// Third-Party Libraries
import * as Sentry from '@sentry/node';

// Utils and Helpers
import { constants } from '@Utils/constant';

Sentry.init({
    dsn: constants.SENTRY_DSN,
    tracesSampleRate: 1.0,
    environment: constants.MODE
});
