import axios from 'axios';

import { GOOGLE_API_KEY, GOOGLE_CLIENT_KEY } from 'config/Constants';
import MediaUploader from './MediaUploader';
import { API_ROOT } from '../config/EnvironmentConfig';

const UPLOAD_SCOPE = 'https://www.googleapis.com/auth/youtube';
const LOGIN_SCOPE = 'https://www.googleapis.com/auth/youtube';
const BASE_URL = API_ROOT;
const GET_UPLOAD_STATUS_INTERVAL_MILLIS = 60 * 1000;

let instance = null;

export default class Google {
  constructor() {
    if (!instance) {
      instance = this;
    }
    return instance;
  }

  static initYoutubeThumbnail() {
    gapi.load('client', () => {
      gapi.client.init({
        apiKey: GOOGLE_API_KEY
      });
    });
  }

  static isAuthorized() {
    const that = this;
    const auth = gapi.auth2.getAuthInstance();
    const user = auth.currentUser.get();
    const hasGrantedScopes = user.hasGrantedScopes(UPLOAD_SCOPE);
    if (hasGrantedScopes) {
      this.idToken = user.getAuthResponse().id_token;
      user.reloadAuthResponse().then(response => {
        that.accessToken = response.access_token;
      });
    }
    return hasGrantedScopes;
  }

  static initYoutubeUpload(setGoogleAuthStatus) {
    gapi.load('client:auth2', () => {
      gapi.client.init({
        apiKey: GOOGLE_API_KEY,
        clientId: GOOGLE_CLIENT_KEY,
        scope: UPLOAD_SCOPE
      }).then(() => {
        setGoogleAuthStatus(Google.isAuthorized());
        // update auth status when signIn status changes
        gapi.auth2.getAuthInstance().isSignedIn.listen(() => {
          setGoogleAuthStatus(Google.isAuthorized());
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
          .then(() => resolve());
      });
    });
  }

  static getAccessToken() {
    const auth = gapi.auth2.getAuthInstance();
    const user = auth.currentUser.get();
    const hasGrantedScopes = user.hasGrantedScopes(LOGIN_SCOPE);
    if (hasGrantedScopes) {
      return new Promise(resolve => {
        user.reloadAuthResponse()
          .then(response => resolve(response));
      });
    }
  }

  static getYoutubeThumbnail(youtubeVideoId) {
    return gapi.client.request({
      method: 'GET',
      path: '/youtube/v3/videos',
      params: {
        part: 'snippet',
        id: youtubeVideoId
      }
    });
  }

  static authorize() {
    const auth = gapi.auth2.getAuthInstance();
    auth.signIn();
  }

  static authorizeForSignIn() {
    const auth = gapi.auth2.getAuthInstance();
    return auth.signIn().then(() => {
      const user = auth.currentUser.get();

      user.reloadAuthResponse()
        .then(response => resolve(response));
    });
  }

  static isUserSignedIn() {
    const auth = gapi.auth2.getAuthInstance();
    return auth.isSignedIn.get();
  }

  static signOutUser() {
    const auth = gapi.auth2.getAuthInstance();
    return auth.signOut();
  }

  static uploadVideo(
    file,
    handleUploading, handleUploadingFinished,
    handleProcessing, handleProcessingFinished
  ) {
    if (file == null) {
      return;
    }
    const that = this;
    var metadata = {
      snippet: {
        title: 'Flass',
        description: '강의 동영상'
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
        try {
          var errorResponse = JSON.parse(data);
          message = errorResponse.error.message;
        } finally {
          alert(message);
        }
      },
      onProgress(data) {
        const progress = data.loaded / data.total;
        handleUploading(progress * 100);
      },
      onComplete(data) {
        var uploadResponse = JSON.parse(data);
        handleUploadingFinished();
        Google.getUploadStatus(uploadResponse.id, handleProcessing, handleProcessingFinished);
      }
    });
    // This won't correspond to the *exact* start of the upload, but it should be close enough.
    uploader.upload();
  }

  static getUploadStatus(videoId, handleProcessing, handleProcessingFinished) {
    return gapi.client.request({
      path: '/youtube/v3/videos',
      params: {
        part: 'status,processingDetails,snippet',
        id: videoId
      },
      callback: response => {
        if (response.error) {
          // The status polling failed.
          console.error(response.error.message);
          setTimeout(
            Google.getUploadStatus(videoId, handleProcessing, handleProcessingFinished),
            GET_UPLOAD_STATUS_INTERVAL_MILLIS
          );
        } else {
          var uploadStatus = response.items[0].status.uploadStatus;
          const processingDetails = response.items[0].processingDetails;
          let progress;
          switch (uploadStatus) {
            // This is a non-final status, so we need to poll again.
            case 'uploaded':
              if (processingDetails.processingProgress) {
                progress = processingDetails.processingProgress.partsProcessed
                  / processingDetails.processingProgress.partsTotal;
                handleProcessing(progress * 100);
              }
              setTimeout(
                Google.getUploadStatus(videoId, handleProcessing, handleProcessingFinished),
                GET_UPLOAD_STATUS_INTERVAL_MILLIS
              );
              break;
            // The video was successfully transcoded and is available.
            case 'processed':
              if (processingDetails.thumbnailsAvailability == 'inProgress') {
                setTimeout(
                  Google.getUploadStatus(videoId, handleProcessing, handleProcessingFinished),
                  GET_UPLOAD_STATUS_INTERVAL_MILLIS
                );
              } else {
                handleProcessingFinished(videoId, response.items[0].snippet.thumbnails);
              }
              break;
            // All other statuses indicate a permanent transcoding failure.
            default:
              console.error('ERROR');
              break;
          }
        }
      }
    });
  }

  static storeAccessToken() {
    const form = new FormData();
    form.append('id_token', this.idToken);

    axios.post(`${BASE_URL}/users.json`, form)
      .then(response => {
        // console.log(response);
      })
      .catch(error => {
        // console.log(error);
      });
  }
}
