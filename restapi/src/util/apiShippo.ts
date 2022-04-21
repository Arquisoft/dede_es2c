var shippo = require('shippo')('shippo_test_ff27bc0bfaae013b84ac58f2a6ee22fa6c236bab');


module.exports = function (addressPod:object){

// Almacén de origen que no se cambia
var addressFrom  = {
    "name": "Shawn Ippotle",
    "company": "Shippo",
    "street1": "215 Clayton St.",
    "city": "San Francisco",
    "state": "CA",
    "zip": "94117",
    "country": "US",
    "phone": "+1 555 341 9393",
    "email": "shippotle@goshippo.com",
};

// Dirección de destido DEL POD
// Tiene que tener ESTE FORMATO

/** 
var addressTo = {
    "name": "Mr Hippo",
    "company": "",
    "street1": "Broadway 1",
    "street2": "",
    "city": "New York",
    "state": "NY",
    "zip": "10007",
    "country": "US",
    "phone": "+1 555 341 9393",
    "email": "mrhippo@goshippo.com",
    "metadata": "Hippos dont lie"
};
*/

// Parcela (¿cambiar?)
var parcel = {
    "length": "5",
    "width": "5",
    "height": "5",
    "distance_unit": "in",
    "weight": "2",
    "mass_unit": "lb"
};

return shippo.shipment.create({
    "address_from": addressFrom,
    "address_to": addressPod,
    "parcels": [parcel],
    async: true
}).then ((shipment: any, err : any)  => {
    if (err != null)
        console.log("Hubo un problema con los gastos de envío " + err);
    console.log(shipment)
    console.log(err)
    return shipment?.rates[0].amount;
});
}