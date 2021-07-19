module.exports = {
    transpileDependencies: ['vuetify'],
    devServer: {
        disableHostCheck: true,
    },
    chainWebpack: (config) => {
        config.module
            .rule('vue')
            .use('vue-loader')
            .tap((options) => {
                options.transformAssetUrls = {
                    'vl-style-icon': 'src',
                    ...options.transformAssetUrls,
                };
                return options;
            });
    },
    // chainWebpack: (config) => {
    //     config.module
    //         .rule('vue')
    //         .use('vue-loader')
    //         .loader('vue-loader')
    //         .tap((options) => {
    //             return {
    //                 transformAssetUrls: {
    //                     'vl-style-icon': 'src',
    //                 },
    //             };
    //         });
    // },
};
