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
    value: INCOTERMS.EXW,
    label: INCOTERMS.EXW,
  },
  {
    value: INCOTERMS.CFR,
    label: INCOTERMS.CFR,
  },
  {
    value: INCOTERMS.FOB,
    label: INCOTERMS.FOB,
  },
  {
    value: INCOTERMS.CIF,
    label: INCOTERMS.CIF,
  },
];

const measureUnitsSelect = [
  {
    value: measureUnits.GR,
    label: measureUnits.GR,
  },
  {
    value: measureUnits.KG,
    label: measureUnits.KG,
  },
  {
    value: measureUnits.ML,
    label: measureUnits.ML,
  },
  {
    value: measureUnits.L,
    label: measureUnits.L,
  },
];

const containerTypes = {
  A_SMALL: { value: 'A_SMALL', label: '20 pies' },
  A_BIG: { value: 'A_BIG', label: '40 pies' },
  A_BIG_HIGH_CUBE: { value: 'A_BIG_HIGH_CUBE', label: '40 pies High Cube' },
  B_SMALL: { value: 'B_SMALL', label: '20 pies' },
  B_BIG: { value: 'B_BIG', label: '40 pies' },
  B_BIG_HIGH_CUBE: { value: 'B_BIG_HIGH_CUBE', label: '40 pies High Cube' },
  C_BOXCAR: { value: 'C_BOXCAR', label: 'Boxcar' },
  D_TOLVA: { value: 'D_TOLVA', label: 'Tolva' },
};

const containerTypesGroupSelect = [
  {
    label: 'A - Container Dry Box',
    options: [
      {
        label: containerTypes.A_SMALL.label,
        value: containerTypes.A_SMALL.value,
      },
      {
        label: containerTypes.A_BIG.label,
        value: containerTypes.A_BIG.value,
      },
      {
        label: containerTypes.A_BIG_HIGH_CUBE.label,
        value: containerTypes.A_BIG_HIGH_CUBE.value,
      },
    ],
  },
  {
    label: 'B - Container Reefer (Refrigerado)',
    options: [
      {
        label: containerTypes.B_SMALL.label,
        value: containerTypes.B_SMALL.value,
      },
      {
        label: containerTypes.B_BIG.label,
        value: containerTypes.B_BIG.value,
      },
      {
        label: containerTypes.B_BIG_HIGH_CUBE.label,
        value: containerTypes.B_BIG_HIGH_CUBE.value,
      },
    ],
  },

  {
    label: 'C - Boxcar (tren)',
    options: [
      {
        label: containerTypes.C_BOXCAR.label,
        value: containerTypes.C_BOXCAR.value,
      },
    ],
  },
  {
    label: 'D - Tolva (tren)',
    options: [
      {
        label: containerTypes.D_TOLVA.label,
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
