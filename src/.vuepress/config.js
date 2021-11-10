module.exports = {
    dest: 'docs',
    base: '/doc-api-laravel-8/',
    title: 'API con Laravel 8',
    description: 'Esta guía le dará un ejemplo de como crear una API Rest con Laravel 8 y Passport',
    head: [
        ['meta', { name: 'theme-color', content: '#3eaf7c' }],
        ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
        ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
    ],
    themeConfig: {
        editLinks: false,
        editLinkText: '',
        lastUpdated: false,
        nav: [{
            text: 'Guía',
            link: '/introduccion/',
        }],
        sidebar: [
            '/introduccion/',
            '/instalacion/',
            '/basedatos/',
            '/modelos/',
            '/seeder-factory-faker/',
            '/controlador-ruta/',
            '/passport/',
            '/login/',
            '/rutas-protegidas/',
            '/cerrar-sesion/',
            '/crud-generos/',
        ]
    },

    /**
     * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
     */
    plugins: [
        '@vuepress/plugin-back-to-top',
        '@vuepress/plugin-medium-zoom',
    ]
}