export const SHARE_TEXT = "2:47 PM STUDIO mode activated. ⚡️\nReady to break limits in Goa. Let's ship.\n\n#FrameInGoa";

export async function shareToX(imageBlob?: Blob) {
  // If we have a blob and the browser supports Web Share with files
  if (imageBlob && navigator.share && navigator.canShare) {
    const file = new File([imageBlob], "frame-in-goa.png", { type: "image/png" });
    const shareData = {
      title: 'HH Goa 2026',
      text: SHARE_TEXT,
      files: [file],
    };

    if (navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        return true;
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          console.error("Error sharing:", err);
        }
        // Fallback to intent if share fails but wasn't aborted
      }
    }
  }

  // Fallback: X Intent URL (no local image attachment possible)
  const encodedText = encodeURIComponent(SHARE_TEXT);
  const intentUrl = `https://twitter.com/intent/tweet?text=${encodedText}`;
  window.open(intentUrl, '_blank');
  return false; // Indicating we fell back
}
