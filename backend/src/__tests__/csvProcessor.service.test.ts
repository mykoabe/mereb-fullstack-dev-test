import { Worker } from "worker_threads";
import { processCSVFile } from "../services/csvProcessor.service";

jest.mock("worker_threads", () => {
  const events = require("events");
  return {
    Worker: jest.fn().mockImplementation(() => {
      const emitter = new events.EventEmitter();
      process.nextTick(() => {
        emitter.emit("message", { departments: 2, time: 123 });
        emitter.emit("exit", 0);
      });
      return emitter;
    }),
  };
});

describe("processCSVFile", () => {
  it("should return departments and time from worker thread", async () => {
    const result = await processCSVFile(
      "uploads/test.csv",
      "public/outputs/out.csv"
    );

    expect(result).toEqual({ departments: 2, time: 123 });

    expect(Worker).toHaveBeenCalledWith(expect.any(String), {
      workerData: {
        inputPath: "uploads/test.csv",
        outputPath: "public/outputs/out.csv",
      },
    });
  });

  it("should reject if worker exits with non-zero code", async () => {
    // Override default mock to simulate error exit
    (Worker as unknown as jest.Mock).mockImplementationOnce(() => {
      const events = require("events");
      const emitter = new events.EventEmitter();
      process.nextTick(() => {
        emitter.emit("exit", 1);
      });
      return emitter;
    });

    await expect(
      processCSVFile("uploads/test.csv", "public/outputs/out.csv")
    ).rejects.toThrow("Worker stopped with exit code 1");
  });

  it("should reject if worker sends an error", async () => {
    (Worker as unknown as jest.Mock).mockImplementationOnce(() => {
      const events = require("events");
      const emitter = new events.EventEmitter();
      process.nextTick(() => {
        emitter.emit("message", { error: "CSV parsing failed" });
        emitter.emit("exit", 0);
      });
      return emitter;
    });

    await expect(
      processCSVFile("uploads/test.csv", "public/outputs/out.csv")
    ).rejects.toThrow("CSV parsing failed");
  });
});
