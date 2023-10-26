import { HisI, TransactionI } from "../../InterfaceApi";
import productTypes from "./Type";

interface ProductState {
    transactions: TransactionI[];
    hisTransactions: HisI[];
}

const INITIAL_STATE: ProductState = {
    transactions: [],
    hisTransactions: []
}

const productReducer = (state = INITIAL_STATE, action:any) => {
    switch(action.type){
        case productTypes.SAVE_TRANSACTION:
            let prevProduct = [...state.transactions];
            let newTransaction = [];
            const isAvailableProduct = state.transactions.find(item => item.id === action.payload.id);
            if(isAvailableProduct){
                prevProduct = state.transactions.filter(item => item.id !== action.payload.id);
                isAvailableProduct.qty = isAvailableProduct.qty + action.payload.qty;
                newTransaction = [...prevProduct, isAvailableProduct];
            } else {
                newTransaction = [...prevProduct, action.payload];
            }
            return {
                ...state,
                transactions: newTransaction,
            }
        case productTypes.PLUS_TRANSACTION:
            let prevQty = [...state.transactions];
            let newQty: TransactionI[] = [];
            const qtyPlus = state.transactions.find(item => item.id === action.payload);
            if(qtyPlus){
                prevQty = state.transactions.filter(item => item.id !== action.payload);
                qtyPlus.qty = qtyPlus.qty + 1;
                if(qtyPlus.qty === 0){
                    newQty = [...prevQty];
                } else {
                    newQty = [...prevQty, qtyPlus];
                }
            } 
            return {
                ...state,
                transactions: newQty,
            }

        case productTypes.MIN_TRANSACTION:
            let prevQtyMin = [...state.transactions];
            let newQtyMin: any[] = [];
            const qtyMin = state.transactions.find(item => item.id === action.payload);
            if(qtyMin){
                prevQtyMin   = state.transactions.filter(item => item.id !== action.payload);
                qtyMin.qty = qtyMin.qty - 1;
                if(qtyMin.qty === 0){
                    newQtyMin = [...prevQtyMin];
                } else {
                    newQtyMin = [...prevQtyMin, qtyMin];
                }
            } 
            return {
                ...state,
                transactions: newQtyMin,
            } 
                
        case productTypes.DEL_TRANSACTION:
            let prevProdDel = [...state.transactions];
            let newProdDel = [];
            
            prevProdDel = state.transactions.filter(item => item.id !== action.payload);
            return {
                ...state,
                transactions: newProdDel = [...prevProdDel]
            }

        case productTypes.HISTORY_TRANSACTION:
            return {
                ...state,
                hisTransactions: [...state.hisTransactions, action.payload as HisI],
                transactions: []
            }

        default:
            return state; 


    }
}

export default productReducer;