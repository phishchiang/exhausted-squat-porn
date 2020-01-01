const GESTURE_STATE = {
  UNKNOWN: "UNKNOWN",
  Stage01: "Stage01",
  Stage02: "Stage02",
  Stage03: "Stage03"
};
const num_01 = 1;
const counterLogin = state => {
  let result = num_01 + state;
  console.log(result);
  return result;
  // if(state)
};

export default { counterLogin, num_01 };
