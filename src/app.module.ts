import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AuthModule } from "./auth/auth.module";
import { BlogsModule } from "./blogs/blogs.module";
import { CommentsModule } from "./comments/comments.module";
import { PairQuizGameModule } from "./pair-quiz-game/pair-quiz-game.module";
import { PostsModule } from "./posts/posts.module";
import { TestingModule } from "./testing/testing.module";
import { UsersModule } from "./users/users.module";
import { MongooseModule } from "@nestjs/mongoose";
import { AppService } from "./app.service";


@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://LoraDB:p-fkFTpRiB5r6h6@cluster0.zszv3.mongodb.net/nest-new"),
    AuthModule,
    BlogsModule,
    CommentsModule,
    PairQuizGameModule,
    PostsModule,
    TestingModule,
    UsersModule,
    //EmailModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
