module.exports = {
  devServer: {
    proxy: {
      '/api': {
          // 로컬 서버 API 사용
          target: 'http://localhost:3003'
      }
    }
  },
  lintOnSave: false,
  transpileDependencies: ['vuetify'],
}
