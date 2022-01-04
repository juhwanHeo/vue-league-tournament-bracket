module.exports = {
  devServer: {
    proxy: {
      '/api': {
          // 로컬 서버 API 사용
          // target: 'http://localhost:3003'

          // 운영 서버

          // target: 'http://localhost:23003'
          target: 'http://hleague.hallym.ac.kr:23003'
      }
    }
  },
  lintOnSave: false,
  transpileDependencies: ['vuetify'],
}
