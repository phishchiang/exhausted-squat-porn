export default function sketch(p) {
  let rotation = 0;
  let video;
  let appFianlResult;
  let pose;
  let width;
  let height;

  p.setup = function() {
    p.createCanvas(640, 320);
    video = p.createCapture(p.VIDEO);
    video.size(640, 320);
    video.hide();
  };

  p.myCustomRedrawAccordingToNewPropsHandler = function(props) {
    if (props.rotation !== null) {
      rotation = (props.rotation * Math.PI) / 180;
    }
    if (props.appFianlResult !== null) {
      appFianlResult = props.appFianlResult;
    }
    if (props.pose !== null) {
      pose = props.pose;
    }
    if (props.width !== null) {
      width = props.windowDimensions.width * 0.975;
    }
    if (props.height !== null) {
      height = props.windowDimensions.height;
    }
  };

  p.draw = function() {
    p.push();
    p.translate(video.width, 0);
    p.scale(-1, 1);
    p.image(video, 0, 0);
    if (pose) {
      pose.keypoints.map(item => {
        let x = item.position.x;
        let y = item.position.y;
        p.fill(16, 153, 227);
        p.ellipse(x, y, 16, 16);
      });
    }
    p.pop();
    // p.image(video, 0, 0);
    // p.background(100);
    // p.normalMaterial();
    // p.noStroke();
    // p.push();
    // p.rotateY(rotation);
    // p.box(100);
    // p.pop();

    // p.fill(0);
    // p.noStroke();
    // p.textSize(64);
    // p.textAlign(p.CENTER, p.CENTER);
    // p.text(appFianlResult, 320, 180);
  };

  // p.windowResized = function() {
  //   p.resizeCanvas(width, width * 0.5625);
  // };
}
