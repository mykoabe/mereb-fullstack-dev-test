import mock from "mock-fs";
import fs from "fs";
import { processCSVFile } from "../services/csvProcessor.service";

const csvSample = `New York,202-01-01,100
Boston,202-01-01,50
New York,202-01-01,30`;

describe("processCSVFile", () => {
  beforeEach(() => {
    mock({
      uploads: {
        "test.csv": csvSample,
      },
      "public/outputs": {},
    });
  });

  afterEach(() => {
    mock.restore();
  });

  it("should process CSV correctly", async () => {
    const result = await processCSVFile(
      "uploads/test.csv",
      "public/outputs/out.csv"
    );

    expect(result.departments).toBe(2);
    expect(typeof result.time).toBe("number");

    const output = fs.readFileSync("public/outputs/out.csv", "utf-8");

    expect(output).toContain("Department Name,Total Number of Sales");
    expect(output).toContain("New York,130");
    expect(output).toContain("Boston,50");
  });
});
