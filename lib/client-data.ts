export type User = {
  id: string;
  naam: string;
  rol: 'admin' | 'team' | 'klant';
};

export type ClientData = {
  naam: string;
  voornaamContact: string;
  logo: string;

  projectFase: string;
  volgendeMijlpaal: string;

  users: User[];

  actieveModules: {
    berichten: boolean;
    aanvragen: boolean;
    samenwerking: boolean;
    planning: boolean;
    documenten: boolean;
    opleveringen: boolean;
    merkportaal: boolean;
    socialMedia: boolean;
  };
};

export const clientData: ClientData = {
  naam: 'Hoeve Sprey',
  voornaamContact: 'Tijmen',
  logo: '/klant-logo.png',

  projectFase: 'Website ontwikkeling',
  volgendeMijlpaal: 'Nieuwe homepageversie op vrijdag 26 april',

  users: [
    { id: 'tijmen', naam: 'Tijmen', rol: 'admin' },
    { id: 'merie', naam: 'Mérie', rol: 'team' },
    { id: 'bram', naam: 'Bram', rol: 'klant' },
    { id: 'twan', naam: 'Twan', rol: 'klant' },
  ],

  actieveModules: {
    berichten: true,
    aanvragen: true,
    samenwerking: true,
    planning: true,
    documenten: true,
    opleveringen: true,
    merkportaal: true,
    socialMedia: true,
  },
};

//
// HELPERS
//

export function getCurrentUser() {
  return clientData.users.find((u) => u.id === 'tijmen');
}

export function getUsersForMentions(type: 'intern' | 'klant') {
  if (type === 'intern') {
    return clientData.users.filter((u) => u.rol !== 'klant');
  }

  return clientData.users;
}

export function getUserNameById(id: string) {
  return clientData.users.find((u) => u.id === id)?.naam || id;
}