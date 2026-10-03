const debug = (...params) => {
  let gDebug = false;

  console.log("[debug]", ...params);
};

const getType = (value) => {
  if (Array.isArray(value)) {
    return "array";
  }

  if (Object.prototype.toString.call(value) === "[object Object]") {
    return "object";
  }

  return "other";
};

function deepClone(obj) {
  let id = 0;
  if (obj == null || typeof obj !== "object") {
    return obj;
  }
  // Store relation between key and cloned value.
  const keyToClonedValueMap = new Map();
  // Store relation between original value and key.
  const originalValueToKeyMap = new Map();
  // BFS queue
  const queue = [];

  const getQueueFrame = (obj, path = "", parentKey = 0) => {
    const frame = {
      path,
      type: getType(obj),
      key: id++,
      parentKey,
      value: obj,
    };

    return frame;
  };

  const setValueVisited = (obj, type, key) => {
    if (type === "other") {
      return;
    }

    originalValueToKeyMap.set(obj, key);
  };

  const setPropToTarget = (clonedValue, path, parentKey) => {
    debug("setPropToTarget", clonedValue, path, parentKey);
    if (path !== "" && keyToClonedValueMap.has(parentKey)) {
      // clonedParent[path] = clonedRoot;
      Reflect.set(keyToClonedValueMap.get(parentKey), path, clonedValue);
    }
  };

  queue.push(getQueueFrame(obj));

  while (queue.length) {
    // debug("keyToClonedValueMap", keyToClonedValueMap);
    const frame = queue.shift();

    const { path, value, parentKey, type } = frame;

    const shouldInitSelf = Boolean(!originalValueToKeyMap.has(value));
    // debug("Frame", frame, shouldInitSelf);
    switch (type) {
      case "object": {
        const keys = Reflect.ownKeys(value);
        if (!originalValueToKeyMap.has(value)) {
          keys.forEach((key) => {
            queue.push(getQueueFrame(value[key], key, frame.key));
          });
        }

        if (shouldInitSelf) {
          const newClone = {};
          keyToClonedValueMap.set(frame.key, newClone);
          setPropToTarget(newClone, path, parentKey);
        } else {
          setPropToTarget(
            // Reuse the value we cloned before.
            keyToClonedValueMap.get(originalValueToKeyMap.get(value)),
            path,
            parentKey
          );
        }

        break;
      }
      case "array": {
        if (!originalValueToKeyMap.has(value)) {
          value.forEach((item, index) => {
            queue.push(getQueueFrame(item, index, frame.key));
          });
        }

        if (shouldInitSelf) {
          const newClone = [];
          keyToClonedValueMap.set(frame.key, newClone);
          setPropToTarget(newClone, path, parentKey);
        } else {
          setPropToTarget(
            keyToClonedValueMap.get(originalValueToKeyMap.get(value)),
            path,
            parentKey
          );
        }
        break;
      }
      case "other": {
        setPropToTarget(value, path, parentKey);
        break;
      }
      default: {
        break;
      }
    }

    setValueVisited(value, type, frame.key);
  }

  const result = keyToClonedValueMap.get(0);
  debug("keyToClonedValueMap", keyToClonedValueMap);
  keyToClonedValueMap.clear();
  originalValueToKeyMap.clear();
  return result;
}

function test1() {
  const input = { loop: {}, [Symbol("b")]: "b" };
  input.loop.loop2 = input;
  console.log("Input", input);
  const result = deepClone(input);
  console.log(result, result.loop.loop2, result.loop.loop2 === result);
}

function test2() {
  const input2 = { loopArray: [], a: [1, 2] };
  input2.loopArray[0] = input2;
  console.log("Input2", input2);
  const result2 = deepClone(input2);

  console.log(result2, result2.loopArray, result2.loopArray?.[0] === result2);
}

function test3() {
  const input = {
    a: "a",
    b: [1, 2],
    c: { key: "value" },
    d: () => console.log("function"),
  };

  console.log(deepClone(input));
}

test1();
test2();
test3();
