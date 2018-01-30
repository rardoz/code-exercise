const basename = require('path').basename

const path = (directory) => {
    const componentName = directory
        .replace(/(.*\/src\/spas\/)/g, '')
        .replace(/(\/fonts\/)|(\/fonts)$/g, '')
        .replace(/(\/scss\/)|(\/scss)$/g, '')
        .replace(/(\/components\/)|(\/components)$/g, '')
    return componentName
  }
  
module.exports = {path}