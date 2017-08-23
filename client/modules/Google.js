import axios from 'axios';

import { GOOGLE_API_KEY, GOOGLE_CLIENT_KEY } from '../../config/Constants';
import MediaUploader from './MediaUploader';

const UPLOAD_SCOPE = 'https://www.googleapis.com/auth/youtube.upload';
const LOGIN_SCOPE = 'https://www.googleapis.com/auth/youtube.upload';
const BASE_URL = 'http://localhost:3000';

let instance = null;

export default class Google {
  constructor() {
    if (!instance) {
      instance = this;
    }
    return instance;
  }

  static initThumbClient = () => {
    gapi.load('client', () => {
      gapi.client.init({
        apiKey: GOOGLE_API_KEY
      });
    });
  }

  static isAuthenticated() {
    const that = this;
    const auth = gapi.auth2.getAuthInstance();
    const user = auth.currentUser.get();
    const hasGrantedScopes = user.hasGrantedScopes(UPLOAD_SCOPE);
    if (hasGrantedScopes) {
      this.idToken = user.getAuthResponse().id_token;
      user.reloadAuthResponse().then(response => {
        that.accessToken = response.access_token;
        Google.storeAccessToken();
      });
    }
    return hasGrantedScopes;
  }

  static initUploadClient(setGoogleAuthStatus) {
    gapi.load('client:auth2', () => {
      gapi.client.init({
        apiKey: GOOGLE_API_KEY,
        clientId: GOOGLE_CLIENT_KEY,
        scope: UPLOAD_SCOPE
      }).then(() => {
        setGoogleAuthStatus(Google.isAuthenticated());
        // update auth status when signIn status changes
        gapi.auth2.getAuthInstance().isSignedIn.listen(() => {
          setGoogleAuthStatus(Google.isAuthenticated());
        });
      });
    });
  }

  static initGoogleAuthService() {
    return new Promise(resolve => {
      gapi.load('client:auth2', () => {
        gapi.client.init({
          apiKey: GOOGLE_API_KEY,
          client_id: GOOGLE_CLIENT_KEY,
          scope: LOGIN_SCOPE
        })
        .then(res => resolve(res));
      });
    });
  }

  static getAccessToken() {
    const auth = gapi.auth2.getAuthInstance();
    const user = auth.currentUser.get();
    const hasGrantedScopes = user.hasGrantedScopes(LOGIN_SCOPE);
    console.log('hasGrantedScopes');
    console.log(hasGrantedScopes);
    if (hasGrantedScopes) {
      return new Promise(resolve => {
        user.reloadAuthResponse()
          .then(response => resolve(response));
      });
    }
  }

  static requestThumbClient(youtubeVideoId) {
    return gapi.client.request({
      method: 'GET',
      path: '/youtube/v3/videos',
      params: {
        part: 'snippet',
        id: youtubeVideoId
      }
    });
  }

  static authenticate() {
    const auth = gapi.auth2.getAuthInstance();
    auth.signIn();
  }

  static authenticateForSignIn() {
    const auth = gapi.auth2.getAuthInstance();

    return new Promise(resolve => (
      auth.signIn().then(() => {
        const user = auth.currentUser.get();

        user.reloadAuthResponse()
          .then(response => resolve(response));
      })
    ));
  }

  static isUserSignedIn() {
    const auth = gapi.auth2.getAuthInstance();
    return auth.isSignedIn.get();
  }

  static signOutUser() {
    const auth = gapi.auth2.getAuthInstance();
    return auth.signOut();
  }

  static uploadVideo(file, setThumbURL) {
    if (file == null) {
      return;
    }
    const that = this;
    var metadata = {
      snippet: {
        title: 'title',
        description: 'description'
        // tags: ["tag1", ["tag2"]]
      },
      status: {
        privacyStatus: 'unlisted'
      }
    };
    var uploader = new MediaUploader({
      baseUrl: 'https://www.googleapis.com/upload/youtube/v3/videos',
      file,
      token: that.accessToken,
      metadata,
      params: {
        part: Object.keys(metadata).join(',')
      },
      onError(data) {
        var message = data;
        // Assuming the error is raised by the YouTube API, data will be
        // a JSON string with error.message set. That may not be the
        // only time onError will be raised, though.
        try {
          var errorResponse = JSON.parse(data);
          message = errorResponse.error.message;
        } finally {
          alert(message);
        }
      },
      onProgress(data) {
        // var currentTime = Date.now();
        var bytesUploaded = data.loaded;
        var totalBytes = data.total;
        // The times are in millis, so we need to divide by 1000 to get seconds.
        // var bytesPerSecond = bytesUploaded / ((currentTime - uploadStartTime) / 1000);
        // var estimatedSecondsRemaining = (totalBytes - bytesUploaded) / bytesPerSecond;
        // var percentageComplete = (bytesUploaded * 100) / totalBytes;

        // $('#upload-progress').attr({
        //   value: bytesUploaded,
        //   max: totalBytes
        // });
        //
        // $('#percent-transferred').text(percentageComplete);
        // $('#bytes-transferred').text(bytesUploaded);
        // $('#total-bytes').text(totalBytes);
        //
        // $('.during-upload').show();
        console.log(`${bytesUploaded} / ${totalBytes}`);
      },
      onComplete(data) {
        var uploadResponse = JSON.parse(data);
        // this.videoId = uploadResponse.id;
        // $('#video-id').text(this.videoId);
        // $('.post-upload').show();
        // this.pollForVideoStatus();
        // console.log(uploadResponse);
        setThumbURL(uploadResponse.id);
      }
    });
    // This won't correspond to the *exact* start of the upload, but it should be close enough.
    uploader.upload();
  }

  static storeAccessToken() {
    const form = new FormData();
    form.append('id_token', this.idToken);

    axios.post(`${BASE_URL}/users.json`, form)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
  }
}
