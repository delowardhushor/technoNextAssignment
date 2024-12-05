import { RootState } from "../redux/store";


export function  ConvertSectoDay(n : number){
    var day = parseInt( n / (24 * 3600));

    n = n % (24 * 3600);
    var hour = parseInt(n / 3600);

    n %= 3600;
    var minutes = n / 60;

    n %= 60;
    var seconds = n;

    return {
      day:AddTralingZero(Math.ceil(day)), 
      minutes:AddTralingZero(Math.ceil(minutes)), 
      hour:AddTralingZero(Math.ceil(hour)), 
      seconds:AddTralingZero(Math.ceil(seconds))
    }

}

export function AddTralingZero (text : number){
    if(text.toString().length == 1){
      return "0"+text.toString()
    }else{
      return text
    }
}

export const CheckInCart = (state: RootState, productId: number) => state.cart.items.some((item) => item.id === productId);

