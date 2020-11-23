module.exports = {
    pages: {
        login: {
            entry: 'src/auth/main.js',
            template: 'public/index.html',
        },
        register: {
            entry: 'src/auth/main.js',
            template: 'public/index.html',
        },
        logout: {
            entry: 'src/auth/main.js',
            template: 'public/index.html',
        },
        admin: {
            entry: 'src/dashboard/main.js',
            template: 'public/index.html',
        },
        client: {
            entry: 'src/dashboard/main.js',
            template: 'public/index.html',
        },
        index: {
            entry: 'src/index/main.js',
            template: 'public/index.html',
        },
    }
}
