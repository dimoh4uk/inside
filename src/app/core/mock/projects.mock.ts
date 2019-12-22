import { ProjectInterface } from '../../index/services/pojects/projects.service';

export const projectsMock: Array<ProjectInterface> = [
  {
    id: 1,
    name: 'Prosvet',
    location: 'Perm / Russia',
    description: 'This is the project where your hands are free, endorphin warms your body and eyes thanks for everything you see.',
    videos: [
      {
        id: 373147536,
        quality: '240p',
        currentTime: 5,
        preview: 'prosvet/1.png'
      },
      {
        id: 373147536,
        currentTime: 20,
        quality: '240p',
        preview: 'prosvet/2.png'
      },
      {
        id: 373147536,
        currentTime: 35,
        quality: '240p',
        preview: 'prosvet/3.png'
      },
    ]
  },
  {
    id: 2,
    name: 'Iceland / Another Planet',
    location: 'Lofoten / Iceland',
    description: 'The rhythm of the city, its enormous buildings and avenues slowly but surely erase one simple thought from your mind - the best designer is nature.',
    videos: [
      {
        id: 240723331,
        quality: '240p',
        currentTime: 5,
        preview: 'Iceland/1.png'
      },
      {
        id: 240723331,
        currentTime: 20,
        quality: '240p',
        preview: 'Iceland/2.png'
      },
      {
        id: 240723331,
        currentTime: 35,
        quality: '240p',
        preview: 'Iceland/3.png'
      },
    ]
  },
  {
    id: 3,
    name: 'Goldmint',
    location: 'Moscow / Russia',
    description: 'Crypto startup Goldmint. The promo was filmed as part of the company\'s ICO with our friends from SUICIDE VENTURES.',
    videos: [
      {
        id: 230467866,
        quality: '240p',
        currentTime: 5,
        preview: 'goldmint/1.png'
      },
      {
        id: 230467866,
        currentTime: 20,
        quality: '240p',
        preview: 'goldmint/2.png'
      },
      {
        id: 230467866,
        currentTime: 35,
        quality: '240p',
        preview: 'goldmint/3.png'
      },
    ]
  },
  {
    id: 4,
    name: 'BaskKids Winter',
    location: 'Perm / Russia',
    description: 'Every little hero needs to have own super costume.',
    videos: [
      {
        id: 338807784,
        quality: '240p',
        currentTime: 5,
        preview: 'bask/1.png'
      },
      {
        id: 338807784,
        currentTime: 20,
        quality: '240p',
        preview: 'bask/2.png'
      },
      {
        id: 338807784,
        currentTime: 35,
        quality: '240p',
        preview: 'bask/3.png'
      },
    ]
  },
  {
    id: 5,
    name: 'INSIDE Party',
    location: 'Moscow / Russia',
    description: 'Dont call us to shoot your party if you dont want it to look like this..',
    videos: [
      {
        id: 337354669,
        quality: '240p',
        currentTime: 5,
        preview: 'party/1.png'
      },
      {
        id: 337354669,
        currentTime: 20,
        quality: '240p',
        preview: 'party/2.png'
      },
      {
        id: 337354669,
        currentTime: 35,
        quality: '240p',
        preview: 'party/3.png'
      },
    ]
  },
  {
    id: 6,
    name: 'SCL 4K',
    location: 'Moscow / Russia',
    description: 'Does a car have a soul? Does this monster have a soul?',
    videos: [
      {
        id: 216148273,
        quality: '240p',
        currentTime: 5,
        preview: 'scl/1.png'
      },
      {
        id: 216148273,
        currentTime: 20,
        quality: '240p',
        preview: 'scl/2.png'
      },
      {
        id: 216148273,
        currentTime: 35,
        quality: '240p',
        preview: 'scl/3.png'
      },
    ]
  },
];
