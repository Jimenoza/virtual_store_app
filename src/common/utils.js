export function replace_host(url){
    if ( Platform.OS === 'android'){
        return url.replace('localhost','10.0.2.2');
    }
    return url;
}