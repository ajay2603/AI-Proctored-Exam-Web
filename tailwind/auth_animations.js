const keyframes = {
  "lef-rit": {
    from: {
      transform: "translateX(-50px)",
      opacity: 0,
    },
    to: {
      transform: "translateX(0px)",
      opacity: 1,
    },
  },
  "rit-lef": {
    from: {
      transform: "translateX(50px)",
      opacity: 0,
    },
    to: {
      transform: "translateX(0px)",
      opacity: 1,
    },
  },
  "top-dow": {
    from: {
      transform: "translateY(50px)",
      opacity: 0,
    },
    to: {
      transform: "translateY(0px)",
      opacity: 1,
    },
  },
  "dow-top": {
    from: {
      transform: "translateY(-50px)",
      opacity: 0,
    },
    to: {
      transform: "translateY(0px)",
      opacity: 1,
    },
  },
  "to-op": {
    from: {
      opacity: 1,
    },
    to: {
      opacity: 0,
    },
  },
  "to-vis": {
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  },
};

const animation = {
  "lef-rit": "lef-rit 1s ease-in-out",
  "rit-lef": "rit-lef 1s ease-in-out",
  "top-dow": "top-dow 1s ease-in-out",
  "dow-top": "dow-top 1s ease-in-out",
  "to-op": "to-op 0.5s ease-in",
  "to-vis": "to-vis 0.5s ease-in",
};

export default { keyframes, animation };
