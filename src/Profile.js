import framework from './assets/framework.json';

class Profile {
  constructor() {
    this.answeredQuestions = [];
  }

  addAnswer(question, answer) {
    this.answeredQuestions.push({ question, answer });
  }

  getResults() {
    // Determine aspects
    const aspects = Object.keys(framework.aspects).reduce((acc, key) => {
      acc[key] = 0;
      return acc;
    }, {});

    this.answeredQuestions.forEach((answeredQuestion) => {
      const question = answeredQuestion.question;
      const answer = question.options[answeredQuestion.answer];
      Object.keys(answer.aspects).forEach((aspectName) => {
        const aspectValue = answer.aspects[aspectName];
        aspects[aspectName] += aspectValue;
      });
    });

    const leanings = Object.keys(aspects).map((aspectName) => {
      const cumulativeValueIsLessThanZero = aspects[aspectName] < 0;
      const aspectDefinition = framework.aspects[aspectName];
      const leaning = {
        name: aspectName,
        leaning: cumulativeValueIsLessThanZero
          ? aspectDefinition[0]
          : aspectDefinition[1],
        value: Math.abs(aspects[aspectName])
      };

      return leaning;
    });

    // Determine role
    const roles = Object.keys(framework.roles).reduce((acc, key) => {
      const role = framework.roles[key];
      const roleLeanings = [];
      role.forEach((roleLeaning) => {
        roleLeanings.push(
          leanings.find((leaning) => leaning.leaning === roleLeaning)?.value
        );
      });

      if (roleLeanings.some((roleLeaning) => roleLeaning === undefined))
        return acc;

      acc[key] = roleLeanings;
      return acc;
    }, {});

    // Sort roles by cumulative leaning value
    const sortedRoles = Object.keys(roles).sort((a, b) => {
      const aRoleLeanings = roles[a];
      const bRoleLeanings = roles[b];
      const aRoleLeaningsSum = aRoleLeanings.reduce((acc, val) => acc + val, 0);
      const bRoleLeaningsSum = bRoleLeanings.reduce((acc, val) => acc + val, 0);
      return aRoleLeaningsSum - bRoleLeaningsSum;
    });

    const role = sortedRoles[0];
    return { aspects, leanings, role };
  }
}

const profile = new Profile();

export default profile;
