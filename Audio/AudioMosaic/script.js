window.onload = init;
var context;
var bufferLoader;

function init() {
  // Fix up prefixing
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  context = new AudioContext();

  bufferLoader = new BufferLoader(
    context,
    [
      '../sources/src.wav',
      '../sources/org.mp3',
    ],
    finishedLoading
    );

  bufferLoader.load();
}

var src;
var org;

var srcArr;
var orgArr;

var out;

function finishedLoading(bufferList) {
  // Create two sources and play them both together.
  src = context.createBufferSource();
  org = context.createBufferSource();
  src.buffer = bufferList[0];
  org.buffer = bufferList[1];
  
  srcArr = splitArray(src.buffer.getChannelData(0), 100);
  orgArr = splitArray(org.buffer.getChannelData(0), 100);
  console.log("LOADED");
  
  out = concatenate(Float32Array, srcArr);
  
  console.log("SPLIT");
  
  //org.buffer.copyToChannel( out , 0 , 0 );
  
  //org.connect(context.destination);
  //org.start(0);
}

function concatenate(resultConstructor, arrays) {
    let totalLength = 0;
    for (let arr of arrays) {
        totalLength += arr.length;
    }
    let result = new resultConstructor(totalLength);
    let offset = 0;
    for (let arr of arrays) {
        result.set(arr, offset);
        offset += arr.length;
    }
    return result;
}

function splitArray(array, size){
    var arrays = [];
    var max = Math.floor(array.length/size)*size;
    for(var s = 0; s < max; s+=size){
        arrays.push(array.slice(s, s+size));
    }
    return arrays;
}

// da dare src.buffer.getChannelData(0)