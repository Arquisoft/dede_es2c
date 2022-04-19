import {Order} from '../shared/shareddtypes';

export async function getOrders(): Promise<Order[]>{
    const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000'
    let response = await fetch(apiEndPoint + "/order/list");
    return response.json();
}
  