const withImages = require('next-images')

module.exports = withImages({
    useFileSystemPublicRoutes: false,
    generateBuildId: async () => {
      // You can, for example, get the latest git commit hash here
      return 'my-build-id'
    },
})