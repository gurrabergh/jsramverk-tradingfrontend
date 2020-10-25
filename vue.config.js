module.exports = {
    chainWebpack(config) {
        config.optimization.minimizer("terser").tap(args => {
          const { terserOptions } = args[0]
          terserOptions.mangle = {
            safari10: true,
            reserved: ["$super"]
          }
          return args
        })
      }
  }