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

  static initUploadClient = setGoogleAuthStatus => {
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
  };

  static requestThumbClient = youtubeVideoId => (
    gapi.client.request({
      method: 'GET',
      path: '/youtube/v3/videos',
      params: {
        part: 'snippet',
        id: youtubeVideoId
      }
    })
  );

  static authenticate = () => {
    const auth = gapi.auth2.getAuthInstance();
    auth.signIn();
  }
}
