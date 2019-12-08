import {ProjectInterface} from '../../index/services/pojects/projects.service';

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
      },
      {
        id: 313783547,
      },
      {
        id: 277404813,
      },
    ]
  }, {
    id: 2,
    name: 'Prosvet',
    location: ' Perm / Russia',
    description: 'Stable crypto currency, backed by gold. Our own blockchain with PoS onsensus algorithm. ' +
      'ATM buying/selling and storing physical gold.',
    videos: [
      {
        id: 337206288,
      },
      {
        id: 240723331,
      },
      {
        id: 264385188,
      },
    ]
  },
];
