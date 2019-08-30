module.exports = app => {
  const pushTest = require("../controllers/push-notification.controller");

  // Add a new trip status update
  app.post("/push-notifications", pushTest.addOne);
};
