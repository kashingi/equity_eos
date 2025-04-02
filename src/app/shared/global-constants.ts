export class GolobalConstants{
    //Message
    public static genericError: string = "Something went wrong. Please try again latter";

    public static unauthorized: string = "You are not authorized person to access this page";

    public static productExistsError: string = "Product already exists";

    public static productAdded: string = "Product added successfully";

    //Regex
    public static nameRegex:string = "[a-zA-Z0-9 ]*";

    public static emailRegex:string = "[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}";

    public static contactNumberRegex:string = "^[e0-9]{10,10}$";

    public static passwordRegex: string = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[\\W_]).{8,}$";

    //Variable
    public static error:string = "error";
}