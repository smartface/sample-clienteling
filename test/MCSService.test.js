import {expect} from "chai";
import MCSServive from "../scripts/service/MCSService";

describe("MCSServive Service", function() {
  describe("Login", function() {
    it("should be logged in", async function(){
      MCSServive.login();
    });
  });
});
