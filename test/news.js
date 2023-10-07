const { expect } = require("chai");
const sinon = require("sinon");
const jwt = require("jsonwebtoken");
const fetch = require("node-fetch");
const authController = require("../src/controller/getNews"); // Import your controller function

describe("Authentication Controller", () => {
  beforeEach(() => {
    // Mock jwt.verify and fetch using sinon
    sinon.stub(jwt, "verify");
    sinon.stub(fetch, "Promise").resolves({
      json: () => Promise.resolve([]), // Mocking an empty response for simplicity
    });
  });

  afterEach(() => {
    sinon.restore();
  });

  // ... Previous test cases

  it("should get news based on user preferences", async () => {
    // Mock request and response objects
    const req = {
      headers: {
        authorization: "Bearer fakeAccessToken",
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      send: sinon.stub(),
    };

    // Mock jwt.verify
    jwt.verify.callsFake((token, secret, callback) => {
      callback(null, { email: "test@example.com" });
    });

    // Call the function
    await authController.getNews(req, res);

    // Assertions
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.send.called).to.be.true;
    // You may want to assert on the response data structure as well
    // You can also enhance this test by using fetch-mock or other mocking libraries
  });

  it("should handle unauthorized access", async () => {
    // Mock request and response objects
    const req = {
      headers: {
        authorization: "Bearer fakeAccessToken",
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      send: sinon.stub(),
    };

    // Mock jwt.verify to simulate an error
    jwt.verify.callsFake((token, secret, callback) => {
      callback(new Error("Unauthorized"));
    });

    // Call the function
    await authController.getNews(req, res);

    // Assertions
    expect(res.status.calledWith(401)).to.be.true;
    expect(res.send.calledWith("<h3>Unauthorized</h3>")).to.be.true;
  });

  // ... Additional test cases
});
