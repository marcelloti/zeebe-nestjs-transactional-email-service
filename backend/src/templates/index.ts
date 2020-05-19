export const templates = {
  marketing: {
    subject: 'See all cool things about {{product}}!',
    body: {
      name: '{{firstName}} {{lastName}}',
      intro: `This is {{product}}!`,
      action: {
        instructions: 'With the {{product}}, you will have all in your hands!',
        button: {
          color: '#22BC66',
          text: 'See more',
          link: '{{baseUrl}}/knowmore?address={{email}}',
        },
      },
    },
  },
  welcome: {
    subject: 'Welcome!',
    body: {
      name: '{{firstName}} {{lastName}}',
      intro: `Welcome to {{product}}!`,
      action: {
        instructions: 'To confirm your subscription, please click here:',
        button: {
          color: '#22BC66',
          text: 'Confirm subscription',
          link: '{{baseUrl}}/confirm?address={{email}}',
        },
      },
    },
  },
};
