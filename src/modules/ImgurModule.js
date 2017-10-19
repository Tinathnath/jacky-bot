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
                    Authorization: util.format('Client-ID %s', self.appId),
                    Accept: 'application/json'
                }
            }).then((result) => {
                if(result.status == 200)
                    resolve(result.data.data); //first .data for Axios' Promise, second .data is in Imgur response body
                else
                    reject(result.statusText);
            }).catch((error) => {
                reject(error);
            });
        });

        return q;
    }
}