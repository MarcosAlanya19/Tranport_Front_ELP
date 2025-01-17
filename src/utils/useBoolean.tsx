import React from 'react';

export const useBoolean = (initial = false) => {
  const [active, setActive] = React.useState(initial);

  const actions = React.useRef({
    on: () => setActive(true),
    off: () => setActive(false),
    toggle: () => setActive((s) => !s),
    set: setActive,
  }).current;

  return { active, ...actions };
};
