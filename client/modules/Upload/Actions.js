export const SET_STEP = 'SET_STEP';
export const SET_VIDEO_DATA =  'SET_VIDEO_DATA';

export const setStep = step => ({
  type: SET_STEP,
  step
});

export const setVideoData = (title, description) => ({
  type: SET_VIDEO_DATA,
  title,
  description
})
