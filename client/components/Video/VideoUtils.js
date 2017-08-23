export function convertPercentageToSecs(percentage, duration) {
  return percentage * duration;
}

export function convertSecsToPercentage(secs, duration) {
  return secs / duration;
}

export function updatePlayedPercentage(played, duration, secondsToUpdate) {
  const convertedSecs = convertPercentageToSecs(played, duration);
  let updatedSeconds = convertedSecs + secondsToUpdate;
  if (updatedSeconds < 0) {
    updatedSeconds = 0;
  }

  return convertSecsToPercentage(updatedSeconds, duration);
}
