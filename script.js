function encodeToBase64(data) {
    return btoa(
        encodeURIComponent(data)
            .replace(/%([0-9A-F]{2})/g,
                function (_, c) {
                    return String.fromCharCode('0x' + c);
                })
    );
}

function decodeFromBase64(data) {
    return decodeURIComponent(
        Array.prototype.map.call(atob(data), function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join('')
    );
}

const encode = document.getElementById("encode");
const decode = document.getElementById("decode");

decode.addEventListener('input', function () {
    try {
        encode.value = decodeFromBase64(decode.value);
    } catch (e) {
        console.log('Unable to decode as UTF-8 string!');
        try {
            encode.value = atob(decode.value);
        } catch (e2) {
            console.log(e2);
            console.log('Invalid base64 string!');
        }
    }
}, false);

encode.addEventListener('input', function () {
    decode.value = encodeToBase64(encode.value);
}, false);
