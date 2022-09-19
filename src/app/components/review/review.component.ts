import { QuestionAnswerService } from 'src/app/services/question-answer.service';
import { Answer } from 'src/app/models/Answer';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  constructor(private location: Location, private questionAnswerService: QuestionAnswerService) { }

  allAnswers: Answer[] = [];
  ngOnInit(): void {
    this.allAnswers = this.questionAnswerService.getAnswers();
  }

  goBack() {
    this.location.back();
  }
}
