
export class Answer {
    question!: string;
    answer: string[] = [];
    hasOtherAnswer: boolean = false;
    otherAnswer!: string;
    type!: string;
}