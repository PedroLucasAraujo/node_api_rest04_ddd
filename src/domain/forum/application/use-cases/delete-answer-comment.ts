import { Either, left, right } from "@/core/either";
import { AnswerCommentsRepository } from "../repositories/answer-comments-repository";

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string;
  answerCommentId: string;
}

type DeleteAnswerCommentUseCaseResponse = Either<string, {}>;

export class DeleteAnswerCommentUseCase {
  constructor(private answersCommentsRepository: AnswerCommentsRepository) {}
  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answerComment =
      await this.answersCommentsRepository.findById(answerCommentId);

    if (!answerComment) {
      return left("Answer not found.");
    }

    if (answerComment.authorId.toString() !== authorId) {
      throw new Error("Not allowed.");
    }

    await this.answersCommentsRepository.delete(answerComment);

    return right({});
  }
}
