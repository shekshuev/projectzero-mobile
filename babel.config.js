module.exports = function (api) {
    api.cache(true);
    return {
        presets: ["babel-preset-expo"],
        plugins: [
            [
                "module-resolver",
                {
                    alias: {
                        "@components": "./src/components",
                        "@screens": "./src/screens",
                        "@assets": "./src/assets",
                        "@features": "./src/features",
                        "@store": "./src/store",
                        "@localization": "./src/localization",
                        "@api": "./src/api",
                        "@utils": "./src/utils"
                    },
                    extensions: [".js", ".jsx", ".ts", ".tsx"]
                }
            ]
        ]
    };
};
