const EasyPost = require('@easypost/api');

const api = new EasyPost("EZTK2ca0beef55754d318415e2dcbeb90a67VcDzqAlUplmb0vn0tBoxiQ");

const addressFrom  = {
    "street1": '417 MONTGOMERY ST',
    "street2": 'FLOOR 5',
    "city": 'SAN FRANCISCO',
    "state": 'CA',
    "zip": '94104',
    "country": 'US',
    "company": 'EasyPost',
    "phone": '415-123-4567',
    async: true
};

const parcel = {
    "length": 8,
    "width": 5,
    "height": 5,
    "weight": 5,
    async: true
};

module.exports = async function (addressPod:object){

// Dirección de destido DEL POD
// Tiene que tener ESTE FORMATO

/** 
var addressTo = {
    "name": 'Dr. Steve Brule',
    "street1": '179 N Harbor Dr',
    "city": 'Redondo Beach',
    "state": 'CA',
    "zip": '90277',
    "country": 'US',
    "phone": '4155559999',
};
*/

var shipment =  api.Shipment.create({
    "from_address": addressFrom,
    "to_address": addressPod,
    "parcel": parcel,
    async : true,
    status: "200"
});


try {

    return await shipment.save().then(async (s:any, err: any) =>  {
        try{
            console.log("En API 1 OK")
            s.buy(shipment.lowestRate());   
            if (err != null)
                console.log("Ha ocurrido un error al calcular los gastos de envio: " + err);
            
            // Si se busca sólo la cantidad añadir .rate
            console.log("En API 2 OK")
            try {
                var result = shipment.lowestRate()
                
                console.log(shipment.status);
                /* shipment.status = 200;
                console.log(shipment.status); */
                return  result;
            } catch (error){
                console.log(error)
            }
            return shipment.lowestRate(); 
        } catch(error){
            return "Ha surgido un error" + error;
        }
        }).catch((error: any) => {
            console.log(error);
        })
} catch (error) {
    console.log(error);
}

    
}; 