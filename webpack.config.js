const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin") 

module.exports = {
  entry: "./src/index.ts",
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json", ".png", ".jpg", '.gif', '.svg']
  },
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "invaderz.js"
  },
  module: {
    rules: [
      { 
        test: /\.tsx?$/, 
        loader: "awesome-typescript-loader"
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.svg$/i,
        use: ['svg-inline-loader'],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({      
      template: "./src/index.html" 
    })
  ]
}