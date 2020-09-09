class helpers{
    static checkIfDataIsNotEmpty(data, obj, messageError){
        if(data == null || data == '') {
            obj.errors.push(messageError)
            if(obj.status != 401){
                obj.status = 401
            }
        }
    }
    static checkIfDataIsValide(regex, data, obj, messageError){
        if(!regex.test(data)){
            obj.errors.push(messageError)
            if (obj.status != 401) {
                obj.status = 401
            }
        }
    }
}

module.exports = helpers