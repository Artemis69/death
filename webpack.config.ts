import { Configuration } from "webpack";
import "webpack-dev-server";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

import * as path from "path";

const cwd = process.cwd();

const PUBLIC_PATH = path.resolve(cwd, "public");

export default (env: Record<string, unknown>) => {
  const dev = !!env.dev;

  const config: Configuration = {
    mode: dev ? "development" : "production",
    output: {
      path: PUBLIC_PATH,
    },
    devServer: {
      static: {
        directory: PUBLIC_PATH,
      },
      compress: true,
      port: 3000,
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
            },
          ],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css",
      }),
    ],
  };

  return config;
};
