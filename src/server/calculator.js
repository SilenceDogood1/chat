 
 const calculator = (request, response) => {
 const {number1, number2, operation} = request.body;
 let errorMessage;
    //const req = JSON.parse(request.body);
    console.log(request.body);


    if (number1 !== undefined && number2 !== undefined && operation !== undefined) {
        if (typeof number1 === "number" && typeof number2 === "number"  ) {
            if (operation !== "multiply") {
                errorMessage = "Current API supports only multiply operation";
            } 
        } else {
            errorMessage = "One of the arguments not numbers";
        }
    } else {
        errorMessage = "One of argument is missing or invalid";
    }

    if (errorMessage){
        response.json({
            "code": 500,
            "error": errorMessage
        })
    } else {
        response.json({
            "code": 200,
            "data": {"result": number1 * number2}
        })
    }
};

export default calculator