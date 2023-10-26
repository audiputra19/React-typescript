import { HisI, TransactionI } from "../../InterfaceApi";
import productTypes from "./Type"

export const saveTransactionData = (dataTransaction: TransactionI) => {
    return async (dispatch: any) => {
        try {
            dispatch({
                type: productTypes.SAVE_TRANSACTION,
                payload: dataTransaction
            })
        } catch (err) {
            console.log(err);
        }
    }
}

export const plusTransactionData = (dataTransaction: number) => {
    return async (dispatch:any) => {
        try {
            dispatch({
                type: productTypes.PLUS_TRANSACTION,
                payload: dataTransaction
            })
        } catch (err) {
            console.log(err);
        }
    }
}

export const minTransactionData = (dataTransaction: number) => {
    return async (dispatch: any) => {
        try {
            dispatch({
                type: productTypes.MIN_TRANSACTION,
                payload: dataTransaction
            })
        } catch (err) {
            console.log(err);
        }
    }
}

export const delTransactionData = (dataTransaction: number) => {
    return async (dispatch: any) => {
        try {
            dispatch({
                type: productTypes.DEL_TRANSACTION,
                payload: dataTransaction
            })
        } catch (err) {
            console.log(err);
        }
    }
}

export const hisTransactionData = (dataTransaction: HisI) => {
    return async (dispatch: any) => {
        try {
            dispatch({
                type: productTypes.HISTORY_TRANSACTION,
                payload: dataTransaction
            })
        } catch (err) {
            console.log(err);
        }
    }
}