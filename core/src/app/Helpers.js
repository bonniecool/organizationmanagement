import _ from 'lodash';

export const amountFormat = amount => {
    if (!amount) return 0;
    return amount.replace(/./g, function(c, i, a) {
        return i && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
    });
};

export const sessionStoreSetItem = (key, object) => {
    try {
        const items = sessionStorage.getItem(key);
        if (items === null) {
            return sessionStorage.setItem(key, JSON.stringify(object));
        }
        const objects = JSON.parse(sessionStorage.getItem(key));
        const newObjects = Object.assign({}, object, objects);
        sessionStorage.setItem(key, JSON.stringify(newObjects));
    } catch (error) {
        console.log(error);
    }
};

export const sessionStorageGetItem = key => {
    try {
        return JSON.parse(sessionStorage.getItem(key)) || {};
    } catch (error) {
        return {};
    }
};

export const secToTime = duration => {
    //let milliseconds = parseInt((duration%1000)/100, 10)
    let seconds = parseInt(duration % 60, 10);
    let minutes = parseInt(duration / 60 % 60, 10);
    let hours = parseInt(duration / (60 * 60) % 24, 10);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;
};

export const loadAPI = (doc, type, id, src, onLoad) => {
    var js, fjs = doc.getElementsByTagName(type)[0];
    if (doc.getElementById(id)) {
        onLoad();
        return;
    }
    js = doc.createElement(type); js.id = id;
    js.src = src;
    js.onload = onLoad;
    fjs.parentNode.insertBefore(js, fjs);       
};


// export const loadAPI = (id, src, cb) => {
//     var js, fjs = document.getElementsByTagName("script")[0];
//     if (document.getElementById(id)) return;
//     js = document.createElement("script");
//     js.id = id;
//     js.src = src;
//     js.onload = cb;
//     fjs.parentNode.insertBefore(js, fjs);
// };

export const transform = object => {
    let arr = [];
    for (let p in object) {
        if (object.hasOwnProperty(p) && !Array.isArray(object[p])) {
            arr.push(
                encodeURIComponent(p) + "=" + encodeURIComponent(object[p])
            );
        }

        if (Array.isArray(object[p])) {
            object[p].forEach((item, key) => {
                arr.push(
                    encodeURIComponent(`${p}[${key}]`) +
                        "=" +
                        encodeURIComponent(item)
                );
            });
        }
    }
    return arr.join("&");
};

export const getFirstMessage = data => {
    let firstMessage = "";
    let x = 0;

    Object.keys(data).map(i => {
        if (x === 0) {
            firstMessage = data[i];
        }
        return x++;
    });
    return firstMessage;
};

export const queryStringToJSON = () => {            
    let pairs = window.location.search.slice(1).split('&');
    
    let result = {};
    pairs.forEach(function(pair) {
        pair = pair.split('=');
        result[pair[0]] = decodeURIComponent((pair[1] || '').replace(/\+/g, '%20') || '');
    });

    return JSON.parse(JSON.stringify(result));
}

export const objToQuery = (object) => {

    let arr = [];
    for(let p in object) {
        if(object.hasOwnProperty(p) && !Array.isArray(object[p])) {
            if(_.isEmpty(object[p]))
                continue;
            arr.push(encodeURIComponent(p) + "=" + encodeURIComponent(object[p] || ""))
        }

        if(Array.isArray(object[p])){
            object[p].forEach((item, key) => {
                arr.push(encodeURIComponent(`${p}[${key}]`) + "=" + encodeURIComponent(item || ""))
            })
        }

    }

    if(arr.length < 1)
        return ""
    
    return `?${arr.join("&")}`;
}

export const createOptionsfromImmutable = (obj, labelKey, valueKey, includeData = false) => {
    let list = [];
    obj.find(item => {
        let itemObj = {};
        itemObj['value'] = item.get(valueKey) || '';
        itemObj['label'] = item.get(labelKey) || "- undefined -";
        if(includeData) itemObj['data'] = item.toJS();
        list = list.concat([ itemObj ])
        return null;
    })
    return list;
}

export const loadState = async () => {
    try{
        const serializedState = await sessionStorage.getItem('_store');
        if(serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    }catch(err){
        return undefined;
    }
}

export const virtualizeHighlighter = (selected, index) => {
    if(index === -1) {
        return "table-row-header";
    }

    return( index % 2 === 0) 
        ? `table-row-even table-overflow ${selected ? "active" : ""}` 
        : `table-row-odd table-overflow ${selected? "active" : ""}`
}

export const makeArgsToUpper = (args, list) => {
    let _val = {};
    _.forEach(args, (value, key) => {
        if(list.indexOf(key) > -1){
            if(typeof value === "string"){
                _val[key] = value.toUpperCase();
            }
            return;
        }
        _val[key] = value;
    })
    return _val;
}

export const currency = new Intl.NumberFormat('en-PH', {
	minimumFractionDigits: 2,
  });