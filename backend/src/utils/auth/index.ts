import passport from 'passport';

import jwtStrategy from './strategies/jwt.strategy';

const setupPassport = () => {
    passport.use(jwtStrategy);
}

export default setupPassport
