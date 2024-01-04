export default defineNuxtRouteMiddleware(async (to, from) => {
  // if FROM is /partner and TO is not /partner, then abort navigation and redirect to /partner
  if (to.path === '/uzletkoto/BK-bolla-kalman') {
    return navigateTo('/partner/0032-agro-m-zrt-');
  }
});
