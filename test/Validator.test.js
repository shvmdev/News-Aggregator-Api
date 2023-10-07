const Validator = require("../src/helper/validation");
const expect = require("chai").expect;

describe("Validator functionality test", () => {
	it("should validate user info", () => {
		const user = {
			name: "Shivam Gupta",
			email: "hassan.raza@gmail.com",
			password: "$2b$08$nJtBBZtPy7tCdVNAZnoC6.Oj7SLtBOMLaMuVQdWN.shAIN1cIV1SG",
			preferences: ["sports", "music", "politics"],
			createdAt: "2023-07-04T16:12:38.912Z",
		};
		expect(Validator.validUserInfo(user)).equals(true);
	});

	it("should validate login info", () => {
		const userLoginInfo = {
			email: "hassan.raza@gmail.com",
			password: "$2b$08$nJtBBZtPy7tCdVNAZnoC6.Oj7SLtBOMLaMuVQdWN.shAIN1cIV1SG",
		};
		expect(Validator.validLoginInfo(userLoginInfo)).equals(true);
	});
});
