const measureUnits = {
  GR: 'GR',
  KG: 'KG',
  ML: 'ML',
  L: 'L',
};

const INCOTERMS = {
  EXW: 'EXW',
  CFR: 'CFR',
  FOB: 'FOB',
  CIF: 'CIF',
};

const incotermsSelect = [
  {
    id: INCOTERMS.EXW,
    title: INCOTERMS.EXW,
  },
  {
    id: INCOTERMS.CFR,
    title: INCOTERMS.CFR,
  },
  {
    id: INCOTERMS.FOB,
    title: INCOTERMS.FOB,
  },
  {
    id: INCOTERMS.CIF,
    title: INCOTERMS.CIF,
  },
];

const measureUnitsSelect = [
  {
    id: measureUnits.GR,
    title: measureUnits.GR,
  },
  {
    id: measureUnits.KG,
    title: measureUnits.KG,
  },
  {
    id: measureUnits.ML,
    title: measureUnits.ML,
  },
  {
    id: measureUnits.L,
    title: measureUnits.L,
  },
];

const containerTypes = {
  A_SMALL: { value: 'A_SMALL', title: '20 pies' },
  A_BIG: { value: 'A_BIG', title: '40 pies' },
  A_BIG_HIGH_CUBE: { value: 'A_BIG_HIGH_CUBE', title: '40 pies High Cube' },
  B_SMALL: { value: 'B_SMALL', title: '20 pies' },
  B_BIG: { value: 'B_BIG', title: '40 pies' },
  B_BIG_HIGH_CUBE: { value: 'B_BIG_HIGH_CUBE', title: '40 pies High Cube' },
  C_BOXCAR: { value: 'C_BOXCAR', title: 'Boxcar' },
  D_TOLVA: { value: 'D_TOLVA', title: 'Tolva' },
};

const containerTypesGroupSelect = [
  {
    label: 'A - Container Dry Box',
    options: [
      {
        label: containerTypes.A_SMALL.title,
        value: containerTypes.A_SMALL.value,
      },
      {
        label: containerTypes.A_BIG.title,
        value: containerTypes.A_BIG.value,
      },
      {
        label: containerTypes.A_BIG_HIGH_CUBE.title,
        value: containerTypes.A_BIG_HIGH_CUBE.value,
      },
    ],
  },
  {
    label: 'B - Container Reefer (Refrigerado)',
    options: [
      {
        label: containerTypes.B_SMALL.title,
        value: containerTypes.B_SMALL.value,
      },
      {
        label: containerTypes.B_BIG.title,
        value: containerTypes.B_BIG.value,
      },
      {
        label: containerTypes.B_BIG_HIGH_CUBE.title,
        value: containerTypes.B_BIG_HIGH_CUBE.value,
      },
    ],
  },

  {
    label: 'C - Boxcar (tren)',
    options: [
      {
        label: containerTypes.C_BOXCAR.title,
        value: containerTypes.C_BOXCAR.value,
      },
    ],
  },
  {
    label: 'D - Tolva (tren)',
    options: [
      {
        label: containerTypes.D_TOLVA.title,
        value: containerTypes.D_TOLVA.value,
      },
    ],
  },
  {
    label: 'No Especificado',
    options: [
      {
        value: containerTypes.NO_SPECIFIED,
        label: 'No Especificado',
      },
    ],
  },
];

export {
  measureUnits,
  measureUnitsSelect,
  incotermsSelect,
  containerTypes,
  containerTypesGroupSelect,
};
