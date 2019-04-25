import Command from './../index';
/**
 * getInfoList
 *
 */
function demo1() {
  let cmd = new Command('portal/Portal/access');
  cmd.action = 'plo.info.getInfoList';
  cmd.name = '前端开发';
  cmd.success = function(res) {
    console.log(res);
  };
  cmd.ajax();
}

demo1();
