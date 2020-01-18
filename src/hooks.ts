export function useIsActiveUser() {
  return !!window.localStorage.getItem('user-commands');
}
