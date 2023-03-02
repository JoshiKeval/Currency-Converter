import { Test } from "@nestjs/testing";

import { ConverterController } from "./converter.controller";
import { ConverterService } from "./converter.service";

describe("ConverterController", () => {
  let converterController: ConverterController;
  // let converterService: ConverterService;
  const mockConverterService = {};

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

  it("Create", () => {
    expect(
      converterController.getData({
        from: "usd",
        want: "inr",
        amount: 1,
      })
    ).toEqual({
      From: "usd",
      Want: "inr",
      EnterAmount: 1,
    });
  });
});
