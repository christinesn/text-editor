import React from "react";

export function useFullscreen() {
  const [fullscreen, setFullscreen] = React.useState(false);

  function isFullscreen() {
    return (
      document.fullscreenElement ||
      document.mozFullScreenElement ||
      document.webkitFullscreenElement ||
      document.msFullscreenElement ||
      document.fullscreen ||
      document.mozFullScreen ||
      document.webkitIsFullScreene ||
      document.fullScreenMode
    );
  }

  React.useEffect(() => {
    function handleFullscreenChange() {
      if (isFullscreen()) {
        setFullscreen(true);
      } else {
        setFullscreen(false);
      }
    }

    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("msfullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "msfullscreenchange",
        handleFullscreenChange
      );
    };
  }, []);

  function toggleFullscreen() {
    const doc = document.documentElement;

    if (!isFullscreen()) {
      if (doc.requestFullscreen) {
        doc.requestFullscreen();
      } else if (doc.moxRequestFullscreen) {
        doc.moxRequestFullscreen();
      } else if (doc.webkitRequestFullscreen) {
        doc.webkitRequestFullscreen();
      } else if (doc.msRequestFullscreen) {
        doc.msRequestFullscreen();
      }
      setFullscreen(true);
      return;
    }

    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.moxCancelFullscreen) {
      document.moxCancelFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
    setFullscreen(false);
  }

  function fullscreenPossible() {
    const doc = document.documentElement;

    return (
      doc.requestFullscreen ||
      doc.moxRequestFullscreen ||
      doc.webkitRequestFullscreen ||
      doc.msRequestFullscreen
    );
  }

  return {
    toggleFullscreen,
    fullscreenPossible,
    fullscreen
  };
}
