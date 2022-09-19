import { QuestionAnswerService } from './../../services/question-answer.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { QuestionAnswerFormat } from 'src/app/models/QuestionAnswerFormat';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent implements OnInit {

  answerFormats: string[] = ['Choice', 'Paragraph']
  questionFormat: QuestionAnswerFormat = new QuestionAnswerFormat;


  constructor(public dialogRef: MatDialogRef<AddQuestionComponent>) {
    this.questionFormat.answerOptions = [{ optionText: "" }];
  }


  ngOnInit(): void {
  }

  onAnswerFormatChange(event: any) {
    this.questionFormat.answerOptions = [];
    this.questionFormat.answerFormat = event.value;
  }


  addMoreOptions() {
    if (this.questionFormat.answerOptions.length == 0) {
      this.questionFormat.answerOptions.push({ optionText: "" }, { optionText: "" });
    } else {
      this.questionFormat.answerOptions.push({ optionText: "" });
    }

  }


  submit() {
    this.dialogRef.close({ data: this.questionFormat })

  }

}
