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
        id: 264385188,
        quality: '240p',
      },
      {
        id: 264385188,
        currentTime: 10,
        quality: '240p',
      },
      {
        id: 264385188,
        currentTime: 15,
        quality: '240p',
      },
    ]
  }, {
    id: 2,
    name: 'Reel’ 2018',
    location: 'WORLDWIDE',
    description: 'Stable crypto currency, backed by gold. Our own blockchain with PoS ' +
      'onsensus algorithm. ATM buying/selling and storing physical gold.',
    videos: [
      {
        id: 240723331,
        quality: '240p',
      },
      {
        id: 240723331,
        currentTime: 10,
        quality: '240p',
      },
      {
        id: 240723331,
        currentTime: 15,
        quality: '240p',
      },
    ]
  },
];
