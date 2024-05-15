export interface EditInterface{
    field:string,
    type:string,
    value?: any,
    captionKey:string,
    autocomplete?:{
        url: string,
        returnField: number | string | boolean | null,
        showFields: Array<{name: string}>
        
    }
}