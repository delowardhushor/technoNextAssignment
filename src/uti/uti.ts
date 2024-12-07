import { RootState, store } from "../redux/store";
import { PermissionsAndroid, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addToCart, removeFromCart } from "../redux/cartSlice";


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

export const CheckInCart = (state: RootState, productId: number) => state.cart.items.find((item) => item.id === productId);


export async function RequestLocationPermission(){
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Access Required',
        message: 'This app needs to access your location',
        buttonPositive:'OK'
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return true;
}


export const SaveViewedProducts = async (products: any[]) => {
  try {
    await AsyncStorage.setItem('pro_history', JSON.stringify(products));
  } catch (error) {
    console.error('Failed to save viewed products', error);
  }
};

export const GetViewedProducts = async (): Promise<any[]> => {
  try {
    const data = await AsyncStorage.getItem("pro_history");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to retrieve viewed products', error);
    return [];
  }
};

export async function AddProductToHistory(product: any){

  const currentHistory = await GetViewedProducts();

  const updatedHistory = [product, ...currentHistory.filter(p => p.id !== product.id)];

  await SaveViewedProducts(updatedHistory);
  
};

export function HandleCart (productData: any) {

  const storeData = store.getState()

  const InCart = CheckInCart(storeData, productData?.id)

  InCart ?
    store.dispatch(removeFromCart(productData?.id))
  :
    store.dispatch(
          addToCart({
              id: productData.id,
              title: productData.title,
              image: productData.image,
              price: productData.price,
              quantity: 1,
          })
      )
}
