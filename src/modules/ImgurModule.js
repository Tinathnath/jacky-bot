const Axios = require('axios');
const util = require('util');

const endpoints = {
    baseApiUrl: "https://api.imgur.com/3/",
    galleryEndpoint: "gallery/r/"
}


module.exports = class ImgurModule {
    constructor(appId) {
        this.appId = appId;
    }

    /**
     * Request a gallery with subreddit on Imgur
     * @param {string} search 
     */
    requestGallery(search) {
        let self = this;
        let q = new Promise((resolve, reject) => {
            let url = util.format("%s%s%s", endpoints.baseApiUrl, endpoints.galleryEndpoint, search);
            Axios.get(url, {
                headers: {
                    Authorization: 'Client-ID ' + self.appId,
                    Accept: 'application/json'
                }
            }).then((result) => {

            }).catch((error) => {

            });
        });

        return q;
    }
}