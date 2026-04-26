export const DRINK_CHOICES = {
  alcohol: 'Alcohol please',
  nonAlcoholic: 'Non-alcoholic drink',
  water: 'I am good with water',
};

const LEGACY_DRINK_MAP = {
  Yes: DRINK_CHOICES.alcohol,
  Maybe: DRINK_CHOICES.nonAlcoholic,
  No: DRINK_CHOICES.water,
};

export const DRINKS_OPTIONS = [
  DRINK_CHOICES.alcohol,
  DRINK_CHOICES.nonAlcoholic,
  DRINK_CHOICES.water,
];

export const DRINKS_EMOJI = {
  [DRINK_CHOICES.alcohol]: '🥂',
  [DRINK_CHOICES.nonAlcoholic]: '🥤',
  [DRINK_CHOICES.water]: '💧',
  Yes: '🥂',
  Maybe: '🥤',
  No: '💧',
};

export const DRINKS_COLOR = {
  [DRINK_CHOICES.alcohol]: 'bg-pastel-pink-l text-pink-700',
  [DRINK_CHOICES.nonAlcoholic]: 'bg-pastel-sky-l text-blue-700',
  [DRINK_CHOICES.water]: 'bg-pastel-lav-l text-violet-700',
};

export function normalizeDrinkPreference(value) {
  return LEGACY_DRINK_MAP[value] || value || '';
}

export function isAlcoholPreference(value) {
  return normalizeDrinkPreference(value) === DRINK_CHOICES.alcohol;
}