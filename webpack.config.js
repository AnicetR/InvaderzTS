const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin") 

module.exports = {
  entry: "./src/index.ts",
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".js", ".json"]
  },
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "invaderz.js"
  },
  module: {
    rules: [
      { 
        test: /\.ts?$/, 
        loader: "awesome-typescript-loader"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({      
      template: "./src/index.html" 
    })
  ]
}