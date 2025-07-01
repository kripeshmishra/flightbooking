export const GetFromLocalStorage = (name: string, isParsed?: boolean) => {
    try {
        let pwdLocal = localStorage.getItem(name);
        if (pwdLocal != null && pwdLocal != undefined) {
            if (isParsed)
                return JSON.parse(pwdLocal);
            else
                return pwdLocal;
        }
        return null;
    } catch { return null }
}

export const phoneValidation = {
    pattern: {
        value: /^\d{10}$/,
        message: "Invalid phone number format",
    },
    maxLength: {
        value: 10,
        message: "Phone number must be 10 digits long",
    },
};

export const validateOnlyNumbers = (value: any) => {
    if (typeof value !== 'string' || value.trim() === '') {
        return true;
    }
    return /^\d+$/.test(value) || 'Only numbers are allowed';
};



export const getCabinClass = (cabinCode: any) => {
    let cabin = "Economy";
    switch (cabinCode?.toUpperCase()) {
        case "M":
            cabin = "Economy";
            break;
        case "C":
            cabin = "Business";
            break;
        case "W":
            cabin = "Premium Economy";
            break;
        case "F":
            cabin = "First";
            break;
    }

    return cabin;
};
