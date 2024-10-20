export const categoryTextMap: Record<
  PieceCategory,
  { heading: string; subheading: string }
> = {
  warm_up: {
    heading: 'Warm Ups',
    subheading: 'Your standard warm ups',
  },
  exercise: {
    heading: 'Exercises/Etudes',
    subheading: 'Any exercises/etudes you are currently working on',
  },
  current: {
    heading: 'Current Pieces',
    subheading: 'Your main pieces that you are currently working on',
  },
  refresh: {
    heading: 'Refresh Pieces',
    subheading: 'Pieces you have learned but want to keep fresh',
  },
  past: {
    heading: 'Past Pieces',
    subheading:
      'Pieces you have worked on in the past and are no longer working on',
  },
};
