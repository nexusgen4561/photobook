import avatarPersonnel from './assets/avatar-personnel.svg'

export const tree = {
  id: 1,
  person: {
    id: 1,
    avatar: avatarPersonnel,
    department: 'Office of the President',
    name: 'Office of the President',
  },
  hasChild: true,
  hasParent: false,
  children: [
    {
      id: 2,
      person: {
        id: 2,
        avatar: avatarPersonnel,
        department: 'Legal Office',
        name: 'Legal Office',
      },
      hasChild: false,
      hasParent: true,
      children: [],
    },
    {
      id: 3,
      person: {
        id: 3,
        avatar: avatarPersonnel,
        department: 'Compliance Committee',
        name: 'Compliance Committee',
      },
      hasChild: false,
      hasParent: true,
      children: [],
    },
    {
      id: 4,
      person: {
        id: 4,
        avatar: avatarPersonnel,
        department: 'Quality Assurance / Corporate HSE',
        name: 'Quality Assurance / Corporate HSE',
      },
      hasChild: false,
      hasParent: true,
      children: [],
    },
    {
      id: 5,
      person: {
        id: 5,
        avatar: avatarPersonnel,
        department: 'Corporate Information Technology',
        name: 'Corporate Information Technology',
      },
      hasChild: false,
      hasParent: true,
      children: [],
    },
  ],
}