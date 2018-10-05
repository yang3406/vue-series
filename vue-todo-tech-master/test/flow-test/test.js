/*@flow*/

function add(x, y) {
  return x + y
}

add('Hello', 11)  //在当前目录打开终端 执行flow 

function addthis(x: number, y: number): number {
  return x + y
}

addthis('Hello', 11)