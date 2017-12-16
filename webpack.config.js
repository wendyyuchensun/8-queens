const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractPlugin = new ExtractTextPlugin({
   filename: 'style.css'
})

module.exports = {
  entry: "./src/script.ts",
  output: {
    filename: "script.js",
    path: __dirname + "/dist"
  },
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
      { test: /\.css$/, use: [ 'style-loader',  'css-loader'] },
      { test: /\.scss$/, use: extractPlugin.extract({ use: ['css-loader', 'sass-loader'] }) }
    ]
  },
  plugins: [extractPlugin]
}
