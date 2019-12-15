import { ProjectInterface } from '../../index/services/pojects/projects.service';

export const projectsMock: Array<ProjectInterface> = [
  {
    id: 1,
    name: 'Prosvet',
    location: ' Perm / Russia',
    description: 'Stable crypto currency, backed by gold. Our own blockchain with PoS onsensus algorithm. ' +
      'ATM buying/selling and storing physical gold.',
    videos: [
      {
        url: 'rasa_1.gif',
      }, {
        url: 'rasa_2.gif',
      }, {
        url: 'rasa_3.gif',
      },
    ]
  },
];
