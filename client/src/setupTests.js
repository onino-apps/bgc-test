import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { createSerializer } from "enzyme-to-json";
import "jest-enzyme";

// Set the default serializer for Jest to be the from enzyme-to-json
// This produces an easier to read (for humans) serialized format.
expect.addSnapshotSerializer(createSerializer({ mode: "deep" }));

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });
