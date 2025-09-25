export const getStatus = (
  isRecording: boolean,
  isProcessing: boolean,
  isPlaying: boolean,
  hasMemory: number,
): string => {
  if (isRecording) {
    return "Listening..."
  } else if (isProcessing) {
    return "Thinking..."
  } else if (isPlaying) {
    return "Speaking..."
  } else {
    return hasMemory > 0 ? "Ready for your next question!" : "Click me to start talking"
  }
}
