class Profile {
  constructor() {
    this.answers = {};
  }

  setAnswers(questions, answers) {
    questions.forEach((question, index) => {
      this.answers[question.id] = answers[index];
    });
  }

  getAnswer(questionId) {
    return this.answers[questionId];
  }
}

const profile = new Profile();

export default profile;
