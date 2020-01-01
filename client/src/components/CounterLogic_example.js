
<script>
// You can use the console window at the bottom
// Try edit message
const GESTURE_STATE = {
  UNKNOWN: 'UNKNOWN',
  LEFT: 'LEFT',
  MIDDLE: 'MIDDLE',
  RIGHT: 'RIGHT',
}

class MovementCounter {
  constructor() {
    this.count = 0
    this.state = GESTURE_STATE.UNKNOWN
    console.log("count start from: " + this.count)
  }

  setState(state) {
    if (this.state != state) {
      if (state == GESTURE_STATE.LEFT) {
        this.state = state
        console.log("[OK] LEFT received: movement detection reset")
      } else if (state == GESTURE_STATE.MIDDLE) {
        if (this.state == GESTURE_STATE.LEFT) {
          console.log("[OK] " + this.state + ">" + state)
          this.state = state
        } else {
          console.log("[Error] " + this.state + ">" + state + ": resetting to unknown")
          this.state = GESTURE_STATE.UNKNOWN
        }
      } else if (state == GESTURE_STATE.RIGHT) {
        if (this.state == GESTURE_STATE.MIDDLE) {
          console.log("[OK] " + this.state + ">" + state)
          this.state = state
          this.count++
          console.log("[OK] count increment:" + this.count)
        } else {
          console.log("[Error] " + this.state + ">" + state + ": resetting to unknown")
          this.state = GESTURE_STATE.UNKNOWN
        }
      }
    }
  }
}

mc = new MovementCounter()
// 正常情況
mc.setState(GESTURE_STATE.LEFT)
mc.setState(GESTURE_STATE.MIDDLE)
mc.setState(GESTURE_STATE.RIGHT)

// 異常情況 1
mc.setState(GESTURE_STATE.LEFT)
mc.setState(GESTURE_STATE.MIDDLE)
mc.setState(GESTURE_STATE.LEFT)

// 異常情況 2
mc.setState(GESTURE_STATE.LEFT)
mc.setState(GESTURE_STATE.RIGHT)

// 異常情況 3
mc.setState(GESTURE_STATE.RIGHT)

// 可傳入相同狀態不會中斷判斷
mc.setState(GESTURE_STATE.LEFT)
mc.setState(GESTURE_STATE.MIDDLE)
mc.setState(GESTURE_STATE.MIDDLE)
mc.setState(GESTURE_STATE.RIGHT)

</script>
