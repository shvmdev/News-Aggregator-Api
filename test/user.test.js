const { expect } = require("chai");
const sinon = require("sinon");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const authController = require("../src/controller/user");

// Mocked data
const db = {
  users: {
    "test@example.com": {
      name: "Test User",
      email: "test@example.com",
      password: bcrypt.hashSync("testpassword", 8),
      preferences: [],
      createdAt: new Date(),
    },
  },
};

describe("Authentication Controller", () => {
  beforeEach(() => {
    // Mock fs.writeFileSync and jwt.verify using sinon
    sinon.stub(fs, "writeFileSync");
    sinon.stub(jwt, "verify");
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should register a user", () => {
    // Mock request and response objects
    const req = {
      body: {
        name: "New User",
        email: "newuser@example.com",
        password: "newpassword",
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      send: sinon.stub(),
    };

    // Mock jwt.sign
    sinon.stub(jwt, "sign").returns("fakeAccessToken");

    // Call the function
    authController.register(req, res);

    // Assertions
    expect(res.status.calledWith(200)).to.be.true;
    expect(
      res.send.calledWithMatch({ message: "User registered successfully" })
    ).to.be.true;
    expect(fs.writeFileSync.calledOnce).to.be.true;
    expect(jwt.sign.calledOnce).to.be.true;
  });

  it("should handle registration error for existing user", () => {
    // Mock request and response objects
    const req = {
      body: {
        name: "Test User",
        email: "test@example.com",
        password: "testpassword",
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      send: sinon.stub(),
    };

    // Call the function
    authController.register(req, res);

    // Assertions
    expect(res.status.calledWith(404)).to.be.true;
    expect(res.send.calledWith("<h3>User already exists</h3>")).to.be.true;
  });

  it("should log in a user", () => {
    // Mock request and response objects
    const req = {
      body: {
        email: "test@example.com",
        password: "testpassword",
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      send: sinon.stub(),
    };

    // Mock jwt.sign
    sinon.stub(jwt, "sign").returns("fakeAccessToken");

    // Call the function
    authController.login(req, res);

    // Assertions
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.send.calledWithMatch({ message: "Login successful" })).to.be
      .true;
    expect(jwt.sign.calledOnce).to.be.true;
  });

  it("should handle login error for incorrect credentials", () => {
    // Mock request and response objects
    const req = {
      body: {
        email: "test@example.com",
        password: "incorrectpassword",
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      send: sinon.stub(),
    };

    // Call the function
    authController.login(req, res);

    // Assertions
    expect(res.status.calledWith(401)).to.be.true;
    expect(res.send.calledWith("<h3>Incorrect credentials</h3>")).to.be.true;
  });

  it("should get user preferences", () => {
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
    authController.getPreferences(req, res);

    // Assertions
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.send.calledWithMatch({ message: "success" })).to.be.true;
  });

  it("should update user preferences", () => {
    // Mock request and response objects
    const req = {
      headers: {
        authorization: "Bearer fakeAccessToken",
      },
      body: {
        preferences: "preference1,preference2",
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
    authController.updatePreferences(req, res);

    // Assertions
    expect(res.status.calledWith(200)).to.be.true;
    expect(
      res.send.calledWithMatch({ message: "preferences updated successfully" })
    ).to.be.true;
    // You might want to assert on the updated preferences as well
  });
});
