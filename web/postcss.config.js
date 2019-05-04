//  github : https://github.com/browserslist/browserslist#queries
//  其他博客：https://segmentfault.com/a/1190000010934375
module.exports = {
    plugins: {
        'postcss-import': {},
        'postcss-preset-env': {
            browsers: ["defaults",
                "not ie < 9",
                "last 2 versions",
                "> 1%",
                "iOS 7",
                "last 3 iOS versions"],
        },
        // 'postcss-px2rem':{
        //     remUnit: 75,  // 每一px对应得rem
        //     threeVersion: true
        // }
    },
};
