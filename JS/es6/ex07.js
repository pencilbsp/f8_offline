// JS là ngôn ngữ lập trình bất đồng bộ
/**
 * 3 cách để xử lý bất đồng bộ
 * - Callback
 * - Promise
 * - Async / Await fucntion
 */

const downloadImage = (ballback, ...args) => {
  setTimeout(() => {
    console.log("Download thành công");
    if (typeof ballback === "function") {
      ballback(args);
    }
  }, 1000);
};

const showMessage = (size) => {
  console.log("Hiển thị hình ảnh", size);
};

// downloadImage(() => {
//   showMessage("big");
// });
// downloadImage(showMessage, "big");
// showMessage();

// Promise

const getUser = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(["User 1", "User 2", "User 3"]);
    }, 1000);
  });
};

// getUser()
//   .then((user) => {
//     console.log(user);
//     showMessage();
//   })
//   .catch((error) => {
//     console.log(error);
//   })
//   .finally(() => {
//     console.log("Hoàn thành");
//   });

// Promise chaining

const getA = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("get A");
      resolve();
    }, 1000);
  });
};
const getB = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("get B");
      resolve();
    }, 500);
  });
};
const getC = () => {
  setTimeout(() => {
    console.log("get C");
  }, 2000);
};

// getA().then(() => {
//   getB().then(() => {
//     getC();
//   });
// });

getA()
  .then(() => {
    return getB();
  })
  .then(() => {
    return getC();
  });

// getA();
// getB();
// getC();

// try {} catch(exception) {}

try {
  getA();
} catch (error) {}
