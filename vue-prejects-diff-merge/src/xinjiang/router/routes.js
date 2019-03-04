import _import from './_import';

export const routes = [
  { name: 'home', path: '/', component: _import('home'), meta: { keepAlive: true } },// 需要被缓存
  { name: 'art', path: '/art', component: _import('art') },
];
