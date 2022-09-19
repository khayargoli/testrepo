import { Router } from '@angular/router';
import { QuestionAnswerFormat } from 'src/app/models/QuestionAnswerFormat';
import { AddQuestionComponent } from './../../dialogs/add-question/add-question.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { QuestionAnswerService } from 'src/app/services/question-answer.service';
import { Answer } from 'src/app/models/Answer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public dialog: MatDialog, private questionAnswerService: QuestionAnswerService, private router: Router) { }


  allQuestions: QuestionAnswerFormat[] = [];
  allAnswers: Answer[] = [];

  ngOnInit(): void {
  }


  addQuestion() {
    let dialogRef = this.dialog.open(AddQuestionComponent, {
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.data) {
        let questionFormat: QuestionAnswerFormat = result.data;
        this.questionAnswerService.addQuestion(questionFormat);
        const answer = new Answer();
        answer['question'] = questionFormat.question;
        answer['hasOtherAnswer'] = false;
        answer['otherAnswer'] = '';
        answer['answer'] = [];
        answer['type'] = questionFormat.answerFormat;
        this.allAnswers.push(answer);
        this.populateQuestions();
      }
    });
  }




  onCheckboxChange(event: any, qIndex: number, value: string) {
    if (event.checked) {
      this.allAnswers[qIndex].answer.push(value);
    } else {
      let index = this.allAnswers[qIndex].answer.findIndex(x => x == value);
      this.allAnswers[qIndex].answer.splice(index, 1);
    }
    console.log(this.allAnswers);
  }

  populateQuestions() {
    this.allQuestions = this.questionAnswerService.getQuestions();
  }

  review() {
    console.log(this.allAnswers);
    this.questionAnswerService.setAnswers(this.allAnswers);
    this.router.navigate(['review']);
  }



  isAllMandatoryFilled() {

    let isFilled = true;

    for (let i = 0; i < this.allQuestions.length; i++) {
      if (this.allAnswers[i].hasOtherAnswer && this.allQuestions[i].isRequired && this.allAnswers[i].otherAnswer.length == 0) {
        isFilled = false;
        break;
      } else if (this.allQuestions[i].isRequired) {
        if (this.allQuestions[i].answerFormat == 'Choice' && this.allAnswers[i].answer.length == 0 && !this.allAnswers[i].hasOtherAnswer) {
          isFilled = false;
          break;
        } else if (this.allQuestions[i].answerFormat == 'Paragraph' && this.allAnswers[i].answer[0].length == 0) {
          isFilled = false;
          break;
        }
      }
    }

    return isFilled;
  }
}
