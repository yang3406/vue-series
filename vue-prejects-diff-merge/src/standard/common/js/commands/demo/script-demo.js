/**
 * getInfoList
 *
 */
function demo1() {
  var cmd = new Command();
  cmd.action = 'plo.info.getInfoList';
  cmd.name = '前端开发';
  cmd.success = function(res) {
    console.log(res);
  };
  cmd.post();
}
demo1();
