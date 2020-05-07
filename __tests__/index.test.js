import React from "react";
import Index from "../src/pages/index.js";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";


describe("With Eclearnzyme", () => {
    it('App shows "Hello JOY"', () => {
      const app = shallow(<Index />);
      expect(app.find("p").text()).toEqual("Hello JOY");
    });
});