import { NextFunction, Request, Response } from "express";
import { uploadFile } from "../controllers/upload.controller";
import { processCSVFile } from "../services/csvProcessor.service";
import * as fileUtil from "../utils/fileUtil";
import path from "path";

jest.mock("../services/csvProcessor.service");
jest.mock("../utils/fileUtil");

describe("uploadFile Controller", () => {
  const mockProcessCSVFile = processCSVFile as jest.MockedFunction<
    typeof processCSVFile
  >;
  const mockGenerateInputOutputFilename =
    fileUtil.generateInputOutputFilename as jest.MockedFunction<
      typeof fileUtil.generateInputOutputFilename
    >;

  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: Partial<NextFunction>;
  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;

  beforeEach(() => {
    req = {
      file: {
        path: "uploads/test.csv",
      } as Express.Multer.File,
    };

    jsonMock = jest.fn();
    statusMock = jest.fn(() => ({ json: jsonMock })) as any;

    res = {
      status: statusMock,
      json: jsonMock,
    };

    mockGenerateInputOutputFilename.mockReturnValue("sales-output.csv");
    mockProcessCSVFile.mockResolvedValue({
      departments: 2,
      time: 123,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should process file and return success response", async () => {
    await uploadFile(req as Request, res as Response, next as NextFunction);

    expect(mockGenerateInputOutputFilename).toHaveBeenCalledWith("sales");
    expect(mockProcessCSVFile).toHaveBeenCalledWith(
      "uploads/test.csv",
      path.join("public/outputs", "sales-output.csv")
    );

    expect(res.json).toHaveBeenCalledWith({
      message: "File processed successfully",
      downloadUrl: "/outputs/sales-output.csv",
      metrics: {
        departments: 2,
        time: 123,
      },
    });
  });

  it("should return 400 if no file is uploaded", async () => {
    req.file = undefined;

    await uploadFile(req as Request, res as Response, next as NextFunction);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith({ message: "No file uploaded" });
  });
});
