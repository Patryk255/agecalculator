'use strict';

const dayI = document.querySelector('#dayI');
const monthI = document.querySelector('#monthI');
const yearI = document.querySelector('#yearI');

const mError = document.querySelector('.monthError');
const dError = document.querySelector('.dayError');
const yError = document.querySelector('.yearError');
const button = document.querySelector('.arrow');

const daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
let month;


const checkMonth = function () {
    if (monthI.value <= 0){
        mError.innerHTML = "Invalid Month"
        monthI.classList.add('inputError');
    }else{
    if (monthI.value.length == 1){
        mError.innerHTML = "This field is required"
        monthI.classList.add('inputError');
    }else{
    if (monthI.value[0] == 0)
    {
        month = monthI.value.slice()[1];
        
    }
    else{
        month = monthI.value;
        
    }
    if (Number(month) > 12){
        return checkDay(false);
    }else{
        return checkDay(true);;
    }
}
    }
    
} 

const checkDay = function(validation) {
    if(validation){
        if (dayI.value <= 0){
            dError.innerHTML = "Invalid Day"
            dayI.classList.add('inputError');
        }else{
        if (dayI.value.length == 0){
            dError.innerHTML = "This field is required"
            dayI.classList.add('inputError');
        }else{
        mError.innerHTML = '';
        monthI.classList.remove('inputError')
        if (dayI.value <= daysInMonth[month - 1]){
            dError.innerHTML = '';
            dayI.classList.remove('inputError');
            checkYear(true);
        }else{
            dError.innerHTML = 'Invalid Day';
            dayI.classList.add('inputError');
        }
    }
}
    }else{
        mError.innerHTML = "Invalid Month";
        monthI.classList.add('inputError');
    }
}

const checkYear = function(validation){
     let dateObject = new Date;
    if(validation){
        if (yearI.value <= 0){
            yError.innerHTML = "Invalid Year"
            yearI.classList.add('inputError');
        }else{
        if (yearI.value.length == 0){
            yError.innerHTML = "This field is required";
            yearI.classList.add('inputError');
        }else{
        if (yearI.value <= dateObject.getFullYear()){
            yError.innerHTML = "";
            yearI.classList.remove('inputError');
            let getAgeText = `${yearI.value}/${month}/${dayI.value}`;
            let result = [getAge(getAgeText)][0].split('/');
            console.log(result);
            document.querySelector('.yearResult span').innerHTML = result[0]
            document.querySelector('.monthResult span').innerHTML = result[1]
            document.querySelector('.dayResult span').innerHTML = result[2]
        }else{
            if (yearI.value >  dateObject.getFullYear()){
                yError.innerHTML = "Year must be in the past";
                yearI.classList.add('inputError');
            }else{
            yError.innerHTML = "Invalid Year";
            yearI.classList.add('inputError');
            }
        }}
    }
}
}

function getAge(dateString) {
    var today = new Date();
    var DOB = new Date(dateString);
    var totalMonths = (today.getFullYear() - DOB.getFullYear()) * 12 + today.getMonth() - DOB.getMonth();
    totalMonths += today.getDay() < DOB.getDay() ? -1 : 0;
    var years = today.getFullYear() - DOB.getFullYear();
    if (DOB.getMonth() > today.getMonth())
        years = years - 1;
    else if (DOB.getMonth() === today.getMonth())
        if (DOB.getDate() > today.getDate())
            years = years - 1;

    var days;
    var months;

    if (DOB.getDate() > today.getDate()) {
        months = (totalMonths % 12);
        if (months == 0)
            months = 11;
        var x = today.getMonth();
        switch (x) {
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12: {
                var a = DOB.getDate() - today.getDate();
                days = 31 - a;
                break;
            }
            default: {
                var a = DOB.getDate() - today.getDate();
                days = 30 - a;
                break;
            }
        }

    }
    else {
        days = today.getDate() - DOB.getDate();
        if (DOB.getMonth() === today.getMonth())
            months = (totalMonths % 12);
        else
            months = (totalMonths % 12) + 1;
    }
    var age = years + '/' + months + '/' + days;
    return age;
}

button.addEventListener('click', function() {
    checkMonth();
})