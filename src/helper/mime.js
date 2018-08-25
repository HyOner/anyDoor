const path = require('path');

const mimeTypes = {
    'css': {
        content: 'text/css',
        icon: 'icon-file'
    },
    'gif': {
        content: 'image/gif',
        icon: 'icon-file-image'
    },
    'html': {
        content: 'text/html',
        icon: 'icon-HTML'
    },
    'ico': {
        content: 'image/x-icon',
        icon: 'icon-file-image'
    },
    'jpeg': {
        content: 'image/jpeg',
        icon: 'icon-file-image'
    },
    'jpg': {
        content: 'image/jpeg',
        icon: 'icon-file-image'
    },
    'js': {
        content: 'text/javascript',
        icon: 'icon-file'
    },
    'json': {
        content: 'application/json',
        icon: 'icon-file'
    },
    'pdf': {
        content: 'application/pdf',
        icon: 'icon-file-pdf'
    },
    'png': {
        content: 'image/png',
        icon: 'icon-file-image'
    },
    'svg': {
        content: 'image/svg+xml',
        icon: 'icon-file-image'
    },
    'swf': {
        content: 'application/x-shockwave-flash',
        icon: 'icon-play-circle'
    },
    'tiff': {
        content: 'image/tiff',
        icon: 'icon-file-image'
    },
    'txt': {
        content: 'text/plain',
        icon: 'icon-file-unknown'
    },
    'wav': {
        content: 'audio/x-wav',
        icon: 'icon-play-circle'
    },
    'wma': {
        content: 'audio/x-ms-wma',
        icon: 'icon-play-circle'
    },
    'wmv': {
        content: 'video/x-ms-wmv',
        icon: 'icon-play-circle'
    },
    'xml': {
        content: 'text/xml',
        icon: 'icon-play-circle'
    },
}

function getContentType(filePath) {
    let ext = path.extname(filePath).split('.').pop().toLowerCase()

    if (!ext) {
        ext = filePath
    }
    if (mimeTypes[ext]) {
        return mimeTypes[ext].content
    } else {
        return mimeTypes['txt'].content;
    }
}

function getContentIcon(filePath) {
    let ext = path.extname(filePath).split('.').pop().toLowerCase()

    if (!ext) {
        ext = filePath
    }
    if (mimeTypes[ext]) {
        return mimeTypes[ext].icon
    } else {
        return mimeTypes['txt'].icon;
    }
}
module.exports = {
    getContentType,
    getContentIcon
}
