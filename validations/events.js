const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validEventInput(data){
    let errors = {};

    data.title = validText(data.title) ? data.title : '';
    data.location = validText(data.location) ? data.location : '';

    if(!Validator.isLength(data.title, { min: 1, max: 100 })){
        errors.title = 'Title must be longer than 1 character and shorter than 100 characters';
    }

    if(Validator.isEmpty(data.title)){
        errors.title = 'Title field is required';
    }

    if(!Validator.isLength(data.description, { max: 500 })){
        errors.description = 'Maximum characters: 500';
    }

    if(Validator.isEmpty(data.location)){
        errors.location = 'Location field is required';
    }

    if(Validator.isEmpty(data.longitude)){
        errors.longitude = 'Longitude field is required';
    }

    

    if(Validator.isEmpty(data.latitude)){
        errors.latitude = 'Latitude field is required';
    }

    if(Validator.isEmpty(data.date)){
        errors.date = 'Date field is required';
    }


    return {
        errors, 
        isValid: Object.keys(errors).length === 0
    };
};