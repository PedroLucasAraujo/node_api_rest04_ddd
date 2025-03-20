import { CreateQuestionUseCase } from "./create-question";
import { QuestionsRepository } from "../repositories/questions-srepository";
import { Question } from "../../enterprise/entities/question";

const fakeQuestionsRepository: QuestionsRepository = {
  create: async (question: Question) => {},
};

test("create an question", async () => {
  const createQuestion = new CreateQuestionUseCase(fakeQuestionsRepository);

  const { question } = await createQuestion.execute({
    authorId: "1",
    title: "Nova Pergunta",
    content: "Nova resposta",
  });

  expect(question.id).toBeTruthy();
});
