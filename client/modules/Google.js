import { GOOGLE_API_KEY, GOOGLE_CLIENT_KEY } from '../../config/Constants';

const UPLOAD_SCOPE = 'https://www.googleapis.com/auth/youtube.upload';

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
    const auth = gapi.auth2.getAuthInstance();
    const user = auth.currentUser.get();
    console.log(user.hasGrantedScopes(UPLOAD_SCOPE));
    return user.hasGrantedScopes(UPLOAD_SCOPE);
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

  static uploadVideo(file, accessToken){
    var metadata = {
      snippet: {
        title: "title",
        description: "description",
        tags: ["tag1", ["tag2"]]
      },
      status: {
        privacyStatus: "unlisted"
      }
    };
    let uploadStartTime;
    var uploader = new MediaUploader({
      baseUrl: 'https://www.googleapis.com/upload/youtube/v3/videos',
      file: file,
      token: accessToken,
      metadata: metadata,
      params: {
        part: Object.keys(metadata).join(',')
      },
      onError: function(data) {
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
      }.bind(this),
      onProgress: function(data) {
        var currentTime = Date.now();
        var bytesUploaded = data.loaded;
        var totalBytes = data.total;
        // The times are in millis, so we need to divide by 1000 to get seconds.
        var bytesPerSecond = bytesUploaded / ((currentTime - uploadStartTime) / 1000);
        var estimatedSecondsRemaining = (totalBytes - bytesUploaded) / bytesPerSecond;
        var percentageComplete = (bytesUploaded * 100) / totalBytes;

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
        console.log(bytesUploaded+" / "+totalBytes);
      }.bind(this),
      onComplete: function(data) {
        var uploadResponse = JSON.parse(data);
        // this.videoId = uploadResponse.id;
        // $('#video-id').text(this.videoId);
        // $('.post-upload').show();
        // this.pollForVideoStatus();
        console.log(uploadResponse);
      }.bind(this)
    });
    // This won't correspond to the *exact* start of the upload, but it should be close enough.
    uploadStartTime = Date.now();
    uploader.upload();
  }
}
