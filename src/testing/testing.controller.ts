import { Controller, Delete } from '@nestjs/common';
import { TestingService } from './testing.service';

@Controller('testing')
export class TestingController {
  constructor(private readonly testingService: TestingService) {}



  @Delete(':all-data')
  async remove() {
    return this.testingService.deleteAll();
  }
}
