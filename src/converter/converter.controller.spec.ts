import { Test } from "@nestjs/testing";
import { ConverterController } from "./converter.controller";
import { ConverterService } from "./converter.service";

describe("intialize ConverterController", () => {
  let converterController: ConverterController;
  // let converterService: ConverterService;
  const mockConverterService = {
    getData: jest.fn().mockResolvedValue({
      From: "usd",
      Want: "inr",
      EnterAmount: 1,
      Converted_Amount: 80,
    }),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [ConverterController],
      providers: [
        { provide: ConverterService, useValue: mockConverterService },
      ],
    }).compile();
    // converterService = module.get<ConverterService>(ConverterService);
    converterController = module.get<ConverterController>(ConverterController);
  });

  it("should be defined", () => {
    expect(converterController).toBeDefined();
  });

  describe("Get Converted Data", () => {
    test("Get Doller from inr", async () => {
      expect(
        await converterController.getData({
          from: "usd",
          want: "inr",
          amount: 1,
        })
      ).toEqual({
        From: "usd",
        Want: "inr",
        EnterAmount: 1,
        Converted_Amount: 80,
      });
    });
  });
});
