/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const path = require(`path`);

module.exports = {
  entry: `./src/index.js`,
  output: {
    filename: `bundle.js`,
    path: path.join(__dirname, `public`),
    publicPath: `/`,
  },
  devServer: {
    contentBase: path.join(__dirname, `public`),
    historyApiFallback: true,
    compress: false,
    port: 1337,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: `babel-loader`,
        },
      }
    ],
  },
  devtool: `source-map`,
  resolve: {
    extensions: [`.js`, `.jsx`, `.ts`, `.tsx`],
    alias: {
      "@": path.resolve(__dirname, `src`),
    }
  },
};
