import _import from './_import';

export const routes = [
  //showFooterBar 是否显示底部图标 auth 是否需要登录  title标题
  { path: '/', component: _import('home'), meta: { showFooterBar: false, auth: false, title: '' } },
];
