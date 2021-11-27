const glob = require('glob');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');


const config = ({ filename, input, output, production }) => {
    let optimization = {
        usedExports: false
    };

    if (production === 'false') {
        optimization = {
            mangleWasmImports: false,
            minimize: false,
            usedExports: false
        };
    }

    return {
        entry: {
            [filename || 'app']: glob.sync(`${input}/{,!(node_modules)/**/}!(webpack)*!(.d).ts`)
        },
        mode: (production === 'false' ? 'development' : 'production'),
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/
                }
            ]
        },
        optimization,
        output: {
            path: output,
        },
        resolve: {
            extensions: ['.js', '.ts', '.tsx'],
            plugins: [
                new TsconfigPathsPlugin()
            ]
        }
    };
};


module.exports = config;
