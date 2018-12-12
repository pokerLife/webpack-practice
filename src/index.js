import 'bootstrap'
import 'jquery'
import 'bootstrap-validator'
import './index.less'
import loginValidate from './js/login'
import * as my from './js/demo'
import {
    multiply
} from './js/demo'
import {
    area,
    circumference
} from './js/circle'


$('#form').validator();


// console.log(my.firstName)
// console.log(multiply(6, 6))
// console.log(my.multiply(5, 5))

// console.log('圆面积：' + area(4));
// console.log('圆周长：' + circumference(14));