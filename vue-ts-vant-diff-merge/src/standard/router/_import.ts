//export default file => require('@/standard/views/' + file + '/index.vue');
export default function (file: string): any {
  return require('@/standard/views/' + file + '/index.vue');
}
