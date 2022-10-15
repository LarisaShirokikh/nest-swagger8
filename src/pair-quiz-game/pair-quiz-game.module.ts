import { Module } from '@nestjs/common';
import { PairQuizGameService } from './pair-quiz-game.service';
import { PairQuizGameController } from './pair-quiz-game.controller';

@Module({
  controllers: [PairQuizGameController],
  providers: [PairQuizGameService]
})
export class PairQuizGameModule {}
