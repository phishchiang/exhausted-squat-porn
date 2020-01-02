import React, { useState, useRef, Fragment, useEffect } from "react";
import { findDOMNode } from "react-dom";
import ReactPlayer from "react-player";
import screenfull from "screenfull";
import "./responsive-player.css";

import VIDEO_DOTI_URL from "./video/doit.webm";
import VIDEO_SEXY_URL from "./video/sexy.webm";

export default function VideoPlayer({ appFianlResult, startPlay }) {
  const [playing, setPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [url, setUrl] = useState(VIDEO_SEXY_URL);
  const [played, setPlayed] = useState(0);
  const [lastPlayed, setLastPlayed] = useState(0);

  const player = useRef();

  useEffect(() => {
    if (startPlay) {
      setPlaying(true);
    } else {
      setPlaying(false);
    }
  }, [startPlay]);

  useEffect(() => {
    if (url === VIDEO_SEXY_URL && isReady) {
      // console.log("url changed");
      player.current.seekTo(lastPlayed);
    }
  }, [url, isReady]);

  useEffect(() => {
    setIsReady(false);
    if (appFianlResult === "YES") {
      setUrl(VIDEO_SEXY_URL);
    } else {
      setLastPlayed(played);
      setUrl(VIDEO_DOTI_URL);
    }
  }, [appFianlResult]);

  const switchVid = currentVid => {
    setIsReady(false);
    if (currentVid === VIDEO_SEXY_URL) {
      setLastPlayed(played);
      setUrl(VIDEO_DOTI_URL);
    } else {
      setUrl(VIDEO_SEXY_URL);
    }
  };

  const onClickPlayer = () => {
    console.log(screenfull.isEnabled);
    // debugger;
    screenfull.toggle(findDOMNode(player.current));
  };

  const handleProgress = state => {
    setPlayed(state.played);
  };

  return (
    <div className="player-wrapper">
      <ReactPlayer
        id="result-vids"
        url={url}
        ref={player}
        className="react-player"
        width="100%"
        height="100%"
        playing={playing}
        controls={false}
        light={false}
        played={0}
        loop={true}
        onProgress={handleProgress}
        // onSeek={e => console.log("onSeek", e)}
        onReady={() => setIsReady(true)}
        onClick={() => onClickPlayer()}
      />
      {/* <button onClick={() => setPlaying(!playing)}>PlayPause</button>
      <button onClick={() => switchVid(url)} className="GGG">
        switchVid
      </button> */}
    </div>
  );
}
