import emptyAvatar from '../assets/profile.png';

export const newUser = {
  username: '',
  email: '',
  password: '',
  isVerified: false,
  picture: [
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: emptyAvatar,
    },
  ],
  role: 'user',
  color: '#ffffff',
};
