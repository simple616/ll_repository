var set = new Set();
var globalProperties=[
    "eval",
    "isFinite",
    "isNaN",
    "parseFloat",
    "parseInt",
    "decodeURI",
    "decodeURIComponent",
    "encodeURI",
    "encodeURIComponent",
    "Array",
    "Date",
    "RegExp",
    "Promise",
    "Proxy",
    "Map",
    "WeakMap",
    "Set",
    "WeakSet",
    "Function",
    "Boolean",
    "String",
    "Number",
    "Symbol",
    "Object",
    "Error",
    "EvalError",
    "ReferenceError",
    "SyntaxError",
    "TypeError",
    "URIError",
    "ArrayBuffer",
    "DataView",
    "Float32Array",
    "Float64Array",
    "Int8Array",
    "Int16Array",
    "Int32Array",
    "Uint8ClampedArray",
    "Atomics",
    "JSON",
    "Math",
    "Reflect",
];


var queue = [];

for(var p of globalProperties){
    queue.push({
        path:[p],
        object: this[p]
    })
}


let curr;

while(queue.length){
    curr = queue.shift();
    console.log(curr.path.join('.'));
    if(set.has(curr.object))
        continue;
    set.add(curr.object);

    for(let p of Object.getOwnPropertyNames(curr.object)){
        var property = Object.getOwnPropertyDescriptor(curr.object,p);

        if(property.hasOwnProperty("value") &&
        ((property.value != null) && (typeof property.value == 'object')
        || (typeof property.value == "object")) &&
         property.value instanceof Object)
            queue.push({
                path:curr.path.concat([p]),
                object:property.value
            });
        if(property.hasOwnProperty("get") && (typeof property.get == 'function'))
            queue.push({
                path:curr.path.concat([p]),
                object:property.get
            });
        if(property.hasOwnProperty("set") &&  (typeof property.set == 'function'))
            queue.push({
                path:curr.path.concat([p]),
                object:property.set
            });
    }
}
