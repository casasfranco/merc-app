module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  content: ['./src/**/*.{html,js}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      flex: {
        2: '2 2 0%',
        3: '3 3 0%',
      },
      boxShadow: {
        error: '0 0 0 2px rgba(245, 34, 45, 0.2)',
        success: '0 0 0 2px rgba(143, 216, 174)',
        'steel-blue': '0 0 0 2px rgba(24, 144, 255, 0.2)',
      },
      maxWidth: {
        400: '400px',
      },
      zIndex: {
        9999: 9999,
      },

      fontSize: {
        '3xl': ['1.75rem', '2.375rem'], // tailwind 30px => custom 28px
        '4xl': ['2.625rem', '1'], // tailwind 36px => custom 42px
        '5xl': ['3.125rem', '1'], // tailwind 48px => custom 50px
      },
      fontFamily: {
        content: ['proxima-nova', 'Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        // https://chir.ag/projects/name-that-color/
        alto: {
          DEFAULT: '#D3D3D3',
        },
        water: {
          light: '#DCECEB',
          lighter: '#EAF4F3',
          DEFAULT: '#D3E7E6',
        },
        navy: {
          DEFAULT: '#003972',
        },
        tradewind: {
          DEFAULT: '#59b7b3',
        },
        disabled: {
          light: '#DBDBDB',
          DEFAULT: '#333333',
        },
        mystic: {
          DEFAULT: '#dadde9',
        },
        'warm-gray': {
          light: '#acaaa5',
          DEFAULT: '#5b564d',
        },
        error: {
          dark: '#f5222d',
          light: '#FEF7F6',
          DEFAULT: '#DC2A2A',
        },
        'steel-blue': '#5d79bd',
        success: {
          light: '#f1fbf6',
          DEFAULT: '#1e824c',
        },
      },
      fill: (theme) => ({
        water: theme('colors.water'),
        navy: theme('colors.navy'),
        white: '#fff',
        disabled: theme('colors.disabled'),
      }),
      // backgroundImage: (theme) => ({
      //   'arch': `url("/src/assets/img/arch.svg")`,
      //   'circle-radio': `url("data:image/svg+xml,<svg viewBox='0 0 16 16' fill='%23003972' xmlns='http://www.w3.org/2000/svg'><circle cx='8' cy='8' r='5' /></svg>")`,
      // }),
      backgroundSize: () => ({
        contain: 'contain',
        'double-size': '200% 200%',
      }),
      minWidth: {
        1: '1rem',
        '1/6': '16.666667%',
        '1/5': '20%',
        '1/4': '25%',
        '1/3': '33.333333%',
        '1/2': '50%',
        '3/4': '75%',
      },
      minHeight: {
        0: '0',
        '1/4': '25%',
        40: '40%',
        '1/2': '50%',
        '3/4': '75%',
        full: '100%',
      },
      screens: {
        xs: '375px',
      },
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled'],
      textColor: ['disabled'],
      margin: ['last'],
      backgroundImage: ['checked'],
      ringOffsetWidth: ['focus'],
      fill: ['hover', 'focus', 'disabled'],
    },
  },
  plugins: [],
};
