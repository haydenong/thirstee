// ALL KEYS FOR AUTH

module.exports = {
    'facebook': {
        'clientID': '1131881666879044',
        'clientSecret': '2f5082a768e0e82445d639699e3e1deb',
        'callbackURL': '/auth/facebook/callback',
        'profileFields': ['id', 'first_name', 'last_name', 'gender', 'email', 'picture']
    },
    'google': {
        'clientID': '659516795365-h0ddpko7dkctr2fdl1gcmdlv1jimh49r.apps.googleusercontent.com',
        'clientSecret': 'pu5-nFKofTE3vWZc-tjhAUf-',
        'callbackURL': '/auth/google/callback'
    }
};

