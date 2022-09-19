import { QuestionAnswerFormat } from './../models/QuestionAnswerFormat';
import { Injectable } from '@angular/core';
import { Answer } from '../models/Answer';

@Injectable({
  providedIn: 'root'
})
export class QuestionAnswerService {
  questions: QuestionAnswerFormat[] = [];
  answers: Answer[] = [];

  constructor() { }

  addQuestion(question: QuestionAnswerFormat) {
    this.questions.push(question);
  }

  getQuestions() {
    return this.questions;
  }


  setAnswers(allAnswers: Answer[]) {
    this.answers = allAnswers;
  }

  getAnswers() {
    return this.answers;
  }


}
