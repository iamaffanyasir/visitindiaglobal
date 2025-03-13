export const isMobileDevice = () => {
  return window.innerWidth <= 768;
};

export const isTabletDevice = () => {
  return window.innerWidth > 768 && window.innerWidth <= 1024;
};

export default { isMobileDevice, isTabletDevice };
